const path = require( 'path' );
const fs = require( 'fs' );
const rimraf = require("rimraf");
const Promise = require( 'promise');
const StatusCodes = require("http-status-codes").StatusCodes;

class StoryHandler {
	constructor() {
		this.debug = true; // used to store formatted JSON
		this.encoding = "utf8";
		this.storyDirname = "stories"
		this.storyFilename = "story.json"
		this.storyDependeciesFilename = "dependencies.json"
		this.cacheList = [];
		this.pathStories = path.join( __basedir, this.storyDirname );
		/**
		 *
		 * @type {Map<String, Object>}
		 */
		this.status = new Map();
	}

	updateNameList() {
		return new Promise( (resolve, reject ) => {

		let self = this;

		fs.mkdir(this.pathStories, { mode: 0o0775 }, (error) => {
			if( error && error.code && error.code !== "EEXIST") {
				reject( error );
			}
			else {
			console.log("Detecting stories ..." );
			fs.readdir( this.pathStories, (err, filenames ) => {
				if( err ){
					console.error("Error on reading folder: ", `"${self.pathStories}"`, err);
					reject( err );
				}
				else{
					filenames.forEach( (name) => {
						if( !self.cacheList.includes( name ) ) self.cacheList.push( name );
					});
					console.log("Stories detected: ", self.cacheList );
					resolve( self.cacheList );
				}
			});
			}
		});
		});
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
				{
					encoding: self.encoding,
					mode: 0o0775
				},
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

		return new Promise( (resolve, reject) => {
			fs.mkdir( this.getPathStory( name ), { mode: 0o0775 }, (error) => {
				if (error && error.code && error.code !== "EEXIST") {
					reject( error );
				}
				else {
					resolve();
				}
			});
		})
		.then( () => {

		let dependencies = data.dependencies;
		data.dependencies = null; // unlink from story structure
		let promiseJSONDependencies = this.addDependencies( name, dependencies );
		let promiseJSON = new Promise( function ( resolve, reject ) {
			fs.writeFile(
				storyFilename,
				JSON.stringify(data, null, self.debug ? 4 : 0 ),
				{
					encoding: self.encoding,
					mode: 0o0775
				},
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

		});
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
			rimraf(storyFilename, {disableGlob: true}, (error) => {
				if(error) {
					reject(error);
				}
				else {
					self.getList().splice(self.getList().indexOf(name), 1);
					resolve(name);
				}
			});
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

	/**
	 *
	 * @param name
	 * @return {Object}
	 */
	getStoryStatus( name ) {
		if( !this.getList().includes( name ) ) {
			return null;
		}
		let status = this.status.get( name );
		if( !status ) {
			status = {
				startTime: null,
				isActive: false
			}
			this.status.set( name, status );
		}
		return status;
	}
}

const instance = new StoryHandler();

module.exports = {
	StoryHandler,
	instance
}