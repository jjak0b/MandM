
const path = require( "path");
const fs = require("fs");
const http = require( "http");
const expressService = require('express-service');
const mkdirp = require("mkdirp");

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

const cacheName = require('./package.json').name
console.log( "urls:", urls );

const app = require("./app");
expressService(app, urls, cacheName);

let promises = [];
for (const url of urls) {
	promises.push( fetch(url) );
}

Promise.allSettled( promises )
.then( (promiseStates) => {
	let responses = promiseStates
		.filter( (promiseStatus) => promiseStatus.status === "fulfilled" )
		.map( (promiseStatus) => promiseStatus.value );

	for (
		/**
		 * @type {Response}
		 */
		const response of responses) {

		if( response.ok ) {
		(function(response) {
			let url = new URL(response.url);
			let pathname = decodeURIComponent( url.pathname )
			console.log( "creating", pathname, path.dirname( pathname ))
			Promise.all(
				[
					mkdirp(path.dirname( pathname ), {mode: 0o0775, recursive: true } ),
					response.arrayBuffer(),
				]
			)
				.then(([parentDirectory, buffer]) => {
					fs.writeFile( pathname, buffer, { mode: 0o0775 }, (error) => {
						if (error) {
							console.error("Unable to store", response.url, "into",  pathname, "reason", error);
						}
					});
				})
				.catch((error) => {
					console.error("Error while init storing of", response.url, "into",  pathname, "reason", error);
				})
		})(response);
		}
	}

})