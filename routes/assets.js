const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const StatusCodes = require("http-status-codes").StatusCodes;
const multer = require('multer');

const storyHandler = require("./stories").handler;

class AssetsHandler {
	constructor() {
		this.assetsDirname = "assets";
		this.pathAssets = path.join( __basedir, this.assetsDirname );
		this.pathAssetsCategories = {
			videos: path.join( this.pathAssets, 'videos' ),
			audios: path.join( this.pathAssets, 'audios' ),
			images: path.join( this.pathAssets, 'images' ),
			captions: path.join( this.pathAssets, 'captions' )
		};

		this.cacheAssets = {
			videos: [],
			audios: [],
			captions: [],
			images: []
		};

		this.updateAssetsList();
	}

	getCategories() {
		return Object.keys( this.pathAssetsCategories );
	}

	getPath() {
		return this.pathAssets;
	}

	getPathCategory( category ) {
		if( category )
			return this.pathAssetsCategories[ category ];
		return null;
	}

	getPathAsset( category, filename ) {
		return path.join( this.getPathCategory( category ), filename );
	}

	getCategoryList( category ) {
		if( category in this.cacheAssets ) {
			return this.cacheAssets[ category ];
		}
		return null;
	}

	updateAssetsList() {

		if ( !fs.existsSync( this.getPath() ) ){
			fs.mkdirSync( this.getPath() );
		}

		let promises = [];

		this.getCategories().forEach( (category) => {
			if ( !fs.existsSync( this.getPathCategory( category ) ) ) {
				fs.mkdirSync( this.getPathCategory( category ) );
			}
			else{
				promises.push(
					getDirFileNames( this.getPathCategory( category ) )
						.then( (files) => this.cacheAssets[ category ] = files )
						.catch( (error) => console.error("Error Reading \"%s\" -> \"%s\"", category, this.getPathCategory( category ), error ) )
				);
			}
		});

		Promise.all( promises )
			.finally( () => {
				console.log( "[AssetHandler]", "Found: ", this.cacheAssets );
			});

	}

	addAsset( category, filename, fileFormData ) {
		let self = this;
		return new Promise( function ( resolve, reject ) {
			fs.writeFile(
				self.getPathAsset( category, filename ),
				fileFormData.buffer,
				function (err) {
					if (err) {
						reject( err );
					}
					else {
						if ( !self.cacheAssets[ category ].includes( filename ) ) {
							self.cacheAssets[ category ].push( filename );
							console.log("Assets added: ", filename );
						}
						else {
							console.log("Assets replaced: ", filename );
						}
						resolve( filename );
					}
				}
			);
		});
	}

	canDelete( category, filename, excludes ) {
		let storiesToCheck = storyHandler.getList();
		if( excludes ) {
			storiesToCheck = storiesToCheck.filter( (name) => !excludes.includes( name ) );
		}

		let isDependent = null;
		let pathRequested = handler.getPathAsset( category, filename );
		return new Promise( function (resolve, reject) {
			getStoriesThatUse( pathRequested, storiesToCheck )
				.then( (storyNames) => {
					resolve( [ !( storyNames && storyNames.length > 0 ), storyNames ] );
				})
				.catch( ( err ) => {
					console.error( "Error", "[Asset.canDelete]", "Unable to check stories assets", filename, "error:", err );
					reject( err );
				});
		});
	}
}

const handler = new AssetsHandler();

function getDirFileNames( path ) {
	return new Promise( function (resolve, reject) {
		fs.readdir(path, (err, files) => {
			if( err ) {
				reject( err );
			}
			else{
				resolve( files );
			}
		});
	});
}

// GET /assets/:category/  filelist
router.get('/:category/', ( req, res ) => {
	let data = null;
	let list = null;
	if( req.params.category && req.params.category in handler.cacheAssets ) {
		list = handler.getCategoryList( req.params.category );
		if( list && req.query.search ) {
			let filterRegExp = new RegExp(req.query.search, "i" );
			data = list.filter( (name) => name.match( filterRegExp ) );
		}
		else{
			data = list;
		}
	}

	if( data ) {
		res.json( data );
	}
	else{
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
});

// GET /assets/ all file names and structures
router.get('/', ( req, res ) => {
	let data = {};
	handler.getCategories().forEach( (category) => {
		let list = handler.getCategoryList( category );
		if( list ) data[ category ] = list;
	});
	res.json( data );
});

// GET /assets/* file
router.get('/*', express.static( handler.getPath() ) );

// PUT /assets/:category/:filename
router.options('/:category/:filename', (req, res) => {
	let category = req.params.category;
	let filename = req.params.filename;

	let allow = ["PUT"];
	let promise = null;
	if( filename && category && handler.getCategories().includes( category ) ) {
		allow.push( "GET", "HEAD" );

		promise = handler.canDelete( category, filename, [] )
			.then( (result) => {

				let canDelete = result[0];
				let storiesThatUseAsset = result[1];
				if( canDelete ) {
					allow.push( "DELETE" );
				}
			})
			.catch( ( err ) => {
				console.error( "Error", "[OPTIONS Asset]", "Unable to check stories assets", filename, "error:", err );
			})
			.finally( () => {
				res.header( "Allow", allow.join() );
				res.end();
			});
	}
	else{
		res.header( "Allow", allow.join() );
		res.end();
	}
});

// PUT /assets/:category/:filename
router.put('/:category/:filename', multer().single('upload'),(req, res) => {
	let category = req.params.category;
	let filename = req.params.filename;

	if( filename && category && handler.getCategories().includes( category ) ) {
		handler.addAsset( category, filename, req.file )
			.then( (name) => {
				res.sendStatus( StatusCodes.OK )
			})
			.catch( (err) => {
				console.error("[Assets]", "Unable to serve PUT of", req.params, req.body, "cause", err );
				res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
			});
	}
	else{
		res.sendStatus( StatusCodes.NOT_ACCEPTABLE );
	}
});

// DELETE /assets/:category/:filename
router.delete( "/:category/:filename", (req, res) => {
	let category = req.params.category;
	let filename = req.params.filename;
	if( (category && category in handler.getCategories() )
		&& ( filename && handler.getCategoryList(category).includes( filename ) )
	){

		handler.canDelete( category, filename, req.body.excludes )
			.then( (result) => {
				let canDelete = result[0];
				let storiesThatUseAsset = result[1];
				if( !canDelete ) {
					res.json( storiesThatUseAsset );
					res.sendStatus( StatusCodes.FORBIDDEN );
				}
				else {
					fs.unlink(pathRequested, (err) => {
						if (err){
							console.error( "Error", "[DELETE Asset]", "Unable to delete asset, \"%s\"; Cause:", pathRequested, err );
							res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
						}
						else{
							res.end();
						}
					});
				}
			})
			.catch( ( err ) => {
				console.error( "Error", "[DELETE Asset]", "Unable to check stories assets, error:", err );
				res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
			});

	}
	else{
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
});

function getStoriesThatUse( pathResource, storyNames ) {

	let promises = new Array( storyNames.length );

	storyNames.forEach( ( name, i ) => promises[ i ] = storyHandler.getStoryAssetsList( name ) );

	return new Promise( function (resolve, reject) {
		let storiesThatUseResource = [];
		Promise.all( promises ).
			then( (assetLists) => {
				storyNames.forEach( (name, i ) => {
					for ( let category in assetLists[ i ] ) {
						// check only for media assets
						if( Array.isArray( assetLists[ i ][ category ] ) ) {
							if ( assetLists[i][category].url && assetLists[i][category].url.includes(pathResource))
								storiesThatUseResource.push(name);
						}
					}
				});
				resolve( storiesThatUseResource );
			})
			.catch( reject );
	});
}

module.exports = {
	router: router,
	handler: handler
};

