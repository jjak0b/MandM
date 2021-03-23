
const path = require( "path");
const fs = require("fs");
const http = require( "http");
const { ExpressService } = require('express-service');
const mkdirp = require("mkdirp");
const Buffer = require("buffer").Buffer
const Url = require("url-parse");

// patch browser env
process.hrtime = require('browser-process-hrtime');
process.stdout = require('browser-stdout')();
if( !process.config ) {
	process.config = {
		variables: {}
	};
}

if( typeof fs.Stats === "undefined"  ) {
	fs.Stats = require("level-filesystem/stat")({}).constructor;
}
if( typeof fs.ReadStream === "undefined" ) {
	fs.ReadStream = {}
}

// for write/read permission
process.umask(0o0000);

const urls = []
	.concat( require("./demo/static-assets") )
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


var server = new ExpressService();

self.addEventListener('install', function (event) {
	cacheUrls( urls )
		.then( () => {
			const app = require("./app");
			server.mount( app );
			server.listen(8080);
		})
})

function cacheUrls( urls ) {
	let promises = [];
	for (const url of urls) {
		promises.push( statAndFetchAndStore( url ) );
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

function statAndFetchAndStore( url ) {
	let parsedUrl = new Url( url );
	let decodedPathname = decodeURIComponent( parsedUrl.pathname );
	let dirPath = path.dirname( decodedPathname );
	return new Promise( function( resolve, reject) {
		mkdirp(dirPath, {mode: 0o0775, recursive: true } )
			.then( (parentDirectory) => {
				fs.stat( decodedPathname, function (error, stats) {
					if( error ) {
						if( error.code == "ENOENT" ) {
							resolve( fetchAndStore( url, decodedPathname ) );
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
			let encoding = response.headers.get("charset")
			return response.arrayBuffer()
				.then( (buffer) => new Promise( function (resolve, reject) {
					console.log( "Storing", pathname );

					fs.writeFile(
						pathname,
						Buffer.from( buffer, encoding ),
						{ mode: 0o0775, flag: "wx", encoding: encoding },
						(error) => {
						if (error) {
							reject( error );
						}
						else {
							resolve( buffer )
						}
					});
				}));
		})


}