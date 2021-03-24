process.env.DEBUG = "express-service,express-service:*,body-parser:json,express-session"
// patch browser env
process.hrtime = require('browser-process-hrtime');
process.stdout = require('browser-stdout')();
if( !process.config ) {
	process.config = {
		variables: {}
	};
}

const path = require( "path");
const fs = require("fs");
const { ExpressService } = require('express-service');
const mkdirp = require("mkdirp");
const Url = require("url-parse");
const charset = require( "charset")


if( typeof fs.Stats === "undefined"  ) {
	fs.Stats = require("level-filesystem/stat")({}).constructor;
}
if( typeof fs.ReadStream === "undefined" ) {
	fs.ReadStream = {}
}

// for write/read permission
process.umask(0o0000);

class MyApp extends ExpressService {
	constructor() {
		super();

		// if sw is already installed just mount app now
		if( self.registration.active ) {
			mountApp( this );
		}
	}

	onInstall(event) {
		super.onInstall(event);

		const urlsTOStore = []
			.concat( require("./demo/static-stories") )
			.concat(
				fs.readdirSync( path.join( "src", "shared", "locales" ) )
					.map( (name) => path.join( "src", "shared", "locales" , name ) )
			)
			.concat(
				fs.readdirSync( path.join( "src", "editor", "locales" ) )
					.map( (name) => path.join( "src", "editor", "locales" , name ) )
			)
			.concat(
				fs.readdirSync( path.join( "src", "evaluator", "locales" ) )
					.map( (name) => path.join( "src", "evaluator", "locales" , name ) )
			)
			.concat(
				fs.readdirSync( path.join( "src", "player", "locales" ) )
					.map( (name) => path.join( "src", "player", "locales" , name ) )
			)

		const urlToProxy = []
			.concat( require("./demo/static-assets") );

		event.waitUntil(
			Promise.all([
				cacheUrls( urlsTOStore, fetchAndStore ),
				// tricky way to add to fs, on get api will proxy to remote
				cacheUrls( urlToProxy, storeDummy )
			])
		)
	}

	onActivate(event) {
		super.onActivate(event);
		mountApp( this );
	}
}

new MyApp();


function mountApp( server ) {
	const app = require("./app");
	server.mount( app );
	server.listen(80);
}

function cacheUrls( urls, storeFunc ) {
	let promises = [];
	for (const url of urls) {
		promises.push( statAndAndStore( url, storeFunc ) );
	}
	return Promise.allSettled( promises )
		.then( (promiseStates) => {
			for (let i = 0; i < promiseStates.length; i++) {
				let promiseState = promiseStates[i];
				if( promiseState.status === "rejected" ) {
					console.error( "Unable to fetch and store", urls[ i ], "for reason", promiseState.reason );
				}
			}
		})
}

function statAndAndStore( url, storeFunc ) {
	let parsedUrl = new Url( url );
	let decodedPathname = decodeURIComponent( parsedUrl.pathname );
	let dirPath = path.dirname( decodedPathname );
	return new Promise( function( resolve, reject) {
		mkdirp(dirPath, {mode: 0o0775, recursive: true } )
			.then( (parentDirectory) => {
				fs.stat( decodedPathname, function (error, stats) {
					if( error ) {
						if( error.code == "ENOENT" ) {
							resolve( storeFunc( url, decodedPathname ) );
						}
						else {
							reject( error );
						}
					}
					else {
						resolve( Promise.resolve() );
					}
				});
			})
			.catch( reject );
	});
}

function fetchAndStore( url, pathname ) {
	return fetch( url )
		.then( (response) => {
			let encoding = charset( Object.fromEntries( response.headers.entries() ) );
			return response.arrayBuffer()
				.then( (buffer) => new Promise( function (resolve, reject) {
					console.log( "Storing", pathname, "with encode", encoding );

					fs.writeFile(
						pathname,
						buffer,
						{ mode: 0o0775, flag: "wx", encoding: encoding },
						(error) => {
						if (error) {
							console.error( "Failed to store", pathname, error );
							reject( error );
						}
						else {
							console.log( "Stored", pathname );
							resolve( buffer )
						}
					});
				}));
		})
}

function storeDummy( url, pathname ) {
	console.log( "Storing dummy", pathname );
	return new Promise(function (resolve, reject) {
		let buffer = "dummy";
		fs.writeFile(
			pathname,
			buffer,
			{ mode: 0o0775, flag: "wx", encoding: "utf-8" },
			(error) => {
				if (error) {
					reject( error );
				}
				else {
					resolve( buffer );
				}
			});
	})
}