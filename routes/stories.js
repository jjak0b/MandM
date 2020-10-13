const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const StatusCodes = require("http-status-codes").StatusCodes;
const Locales = require( '../shared/js/locales');
var storiesSaved = [];

class StoryHandler {
	constructor() {
		this.encoding = "utf8";
		this.storyDirname = "stories"
		this.storyFilename = "story.json"
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

	getPathStory( name ) {
		return path.join( this.getPath(), name);
	}

	getPath() {
		return this.pathStories;
	}

	getList() {
		return this.cacheList;
	}

	addJSON( name, data ) {
		let storyFilename = path.join( this.getPathStory( name ), this.getStoryFileName() );
		let self = this;
		return new Promise( function ( resolve, reject ) {
			fs.writeFile(
				storyFilename,
				JSON.stringify(data),
				self.encoding,
				function (err) {
					if (err) {
						reject( err );
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
		})
	}

	getJSON( name ) {
		let self = this;
		let storyFilename = path.join( this.getPathStory( name ), this.getStoryFileName() );
		return new Promise( function (resolve, reject) {
			fs.readFile(
				storyFilename,
				self.encoding,
				function (err, data) {
					if (err) {
						reject( err );
					}
					else {
						try {
							resolve( JSON.parse( data ) );
						}
						catch( e ) {
							reject( e )
						}
					}
				}
			);
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
			self.getJSON( name )
				.then( (data) => {
					resolve( data && data.dependencies ? data.dependencies : [] );
				})
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
				.catch( (err)=> {
					res.sendStatus( StatusCodes.CONFLICT );
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
			res.json( errors );
			res.sendStatus( StatusCodes.CONFLICT );
		})
});

module.exports = {
	handler: handler,
	router: router
};
