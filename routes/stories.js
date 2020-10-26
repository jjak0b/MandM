const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const StatusCodes = require("http-status-codes").StatusCodes;
const Locales = require( '../shared/js/locales');
var storiesSaved = [];

class StoryHandler {
	constructor() {
		this.debug = true; // used to store formatted JSON
		this.encoding = "utf8";
		this.storyDirname = "stories"
		this.storyFilename = "story.json"
		this.storyDependeciesFilename = "dependencies.json"
		this.cacheList = [];
		this.pathStories = path.join( __basedir, this.storyDirname );
		this.updateNameList();
	}

	updateNameList() {
		let self = this;
		if ( !fs.existsSync( this.pathStories ) ){
			fs.mkdirSync( this.pathStories );
		}
		else {
			console.log("Detecting stories ..." );
			fs.readdir( this.pathStories, (err, filenames ) => {
				if( err ){
					console.error("Error on reading folder: ", `"${self.pathStories}"`, err);
				}
				else{
					filenames.forEach( (name) => {
						if( !self.cacheList.includes( name ) ) self.cacheList.push( name );
					});
					console.log("Stories detected: ", self.cacheList );
				}
			});
		}
	}

	getStoryFileName() {
		return this.storyFilename;
	}

	getDependenciesFileName() {
		return this.storyDependeciesFilename;
	}

	getPathStory( name ) {
		return path.join( this.getPath(), name);
	}

	getPath() {
		return this.pathStories;
	}

	getList() {
		return this.cacheList;
	}

	addDependencies( name, data ) {
		let dependenciesFilename = path.join( this.getPathStory( name ), this.getDependenciesFileName() );
		let self = this;

		return new Promise( function ( resolve, reject ) {
			fs.writeFile(
				dependenciesFilename,
				JSON.stringify(data, null, self.debug ? 4 : 0 ),
				self.encoding,
				function (err) {
					if (err) {
						let statusCode = null;
						switch( err.code ) {
							case 'ENOSPC':
								statusCode = StatusCodes.INSUFFICIENT_STORAGE;
								break;
							default :
								statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
								break;
						}
						reject( { error: err, statusCode: statusCode } );
					}
					else {
						resolve( null );
					}
				});
		});
	}

	getDependencies( name ) {
		let dependenciesFilename = path.join( this.getPathStory( name ), this.getDependenciesFileName() );
		let self = this;
		return new Promise( function (resolve, reject) {
			fs.readFile(
				dependenciesFilename,
				self.encoding,
				function (err, data) {
					if (err) {
						let statusCode = null;
						switch( err.code ) {
							case 'ENOENT':
								statusCode = StatusCodes.NOT_FOUND;
								break;
							default :
								statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
								break;
						}
						reject( { error: err, statusCode: statusCode } );
					}
					else {
						try {
							resolve( JSON.parse( data ) );
						}
						catch( e ) {
							reject( e );
						}
					}
				}
			);
		});
	}

	addJSON( name, data ) {
		let storyFilename = path.join( this.getPathStory( name ), this.getStoryFileName() );
		let self = this;

		let dependencies = data.dependencies;
		data.dependencies = null; // unlink from story structure
		let promiseJSONDependencies = this.addDependencies( name, dependencies );
		let promiseJSON = new Promise( function ( resolve, reject ) {
			fs.writeFile(
				storyFilename,
				JSON.stringify(data, null, self.debug ? 4 : 0 ),
				self.encoding,
				function (err) {
					if (err) {
						let statusCode = null;
						switch( err.code ) {
							case 'ENOSPC':
								statusCode = StatusCodes.INSUFFICIENT_STORAGE;
								break;
							default :
								statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
								break;
						}
						reject( { error: err, statusCode: statusCode } );
					}
					else {
						if ( !self.getList().includes( name ) ) {
							self.getList().push( name )
							console.log("Story added: ", name);
						}
						else {
							console.log("Story replaced: ", name);
						}
						resolve( name );
					}
				});
		});

		return Promise.all( [ promiseJSON, promiseJSONDependencies ] );
	}

	getJSON( name ) {
		let self = this;
		let storyFilename = path.join( this.getPathStory( name ), this.getStoryFileName() );
		let promiseGetDependencies = this.getDependencies( name );
		let promiseGetJSON = new Promise( function (resolve, reject) {
			fs.readFile(
				storyFilename,
				self.encoding,
				function (err, data) {
					if (err) {
						let statusCode = null;
						switch( err.code ) {
							case 'ENOENT':
								statusCode = StatusCodes.NOT_FOUND;
								break;
							default :
								statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
								break;
						}
						reject( { error: err, statusCode: statusCode } );
					}
					else {
						try {
							resolve( JSON.parse( data ) );
						}
						catch( e ) {
							reject( e );
						}
					}
				}
			);
		});

		return new Promise( function (resolve, reject) {
			Promise.all( [ promiseGetJSON, promiseGetDependencies ] )
				.then( (JsonArrayData) => {

					let story = JsonArrayData[0];
					let dependencies = JsonArrayData[1];
					story.dependencies = dependencies;

					resolve( story );
				})
				.catch( reject );
		});
	}

	deleteJSON( name ) {
		let self = this;
		let storyFilename = path.join( this.getPathStory( name ) );
		return new Promise( function (resolve, reject) {
			fs.rmdirSync(storyFilename, {recursive: true});
			self.getList().splice(self.getList().indexOf(name), 1);
			resolve(name);
		});
	}

	getJSONArray() {
		let request = {};
		let list = this.getList();

		list.forEach( (name, i) => {
			request[ name ] = this.getJSON( name )
		});

		return request;
	}

	getStoryAssetsList( name ) {
		let self = this;
		return new Promise( function (resolve, reject) {
			self.getDependencies( name )
				.then( (data) => resolve( data || {} ) )
				.catch( reject )
		});
	}
}

const handler = new StoryHandler();

router.get('/', ( req, res ) => {
	res.json( handler.getList() );
});

router.get('/:name', ( req, res ) => {
	if( req.params.name ) {

		if( !handler.getList().includes( req.params.name ) ) {
			res.sendStatus( StatusCodes.NOT_FOUND );
		}
		else {
			handler.getJSON( req.params.name )
				.then( (data) => {
					res.json( data );
				})
				.catch( (objError)=> {
					console.error(`[ GET stories/${req.params.name}]`, "Error getting JSON of story", "cause", objError.error );
					res.sendStatus( objError.statusCode );
				});
		}
	}
});

router.get('/:name/locales/', ( req, res ) => {
	if( req.params.name ) {
		Locales.setLocalesResponse(res, null, handler.getPathStory( req.params.name ) )
	}
});

router.get('/:name/locales/:locale', ( req, res ) => {
	if( req.params.name ) {
		Locales.setLocalesResponse(res, req.params.locale, handler.getPathStory( req.params.name ) )
	}
});

router.put("/:name", ( req, res ) => {

	let storyDir = handler.getPathStory( req.params.name );

	let status = StatusCodes.CREATED;
	if ( !fs.existsSync( storyDir ) ){
		fs.mkdirSync( storyDir );
	}

	let requests = [];

	if( req.body.dependencies ) {
		if( req.body.dependencies.locales ) {
			Object.keys(req.body.dependencies.locales).forEach( (locale) => {
				requests.push( Locales.setLocales( locale,req.body.dependencies.locales[ locale ], storyDir ) );
			});
			req.body.dependencies.locales = {};
		}
	}

	if( req.body ) {
		requests.push(
			handler.addJSON( req.params.name, req.body )
		)
	}

	Promise.all( requests )
		.then( function (states) {
			res.sendStatus( StatusCodes.CREATED );
		})
		.catch( function (errors) {
			console.error( errors );
			res.status( StatusCodes.CONFLICT ).json( errors );
		})
});

router.delete('/:name', ( req, res ) => {
	if( req.params.name ) {

		if( !handler.getList().includes( req.params.name ) ) {
			res.sendStatus( StatusCodes.NOT_FOUND );
		}
		else {
			handler.deleteJSON( req.params.name )
			.then( (data) => {
				res.sendStatus( StatusCodes.OK );
			})
			.catch( (err)=> {
				res.sendStatus( StatusCodes.CONFLICT );
			});
		}
	}
});

module.exports = {
	handler: handler,
	router: router
};
