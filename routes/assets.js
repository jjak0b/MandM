const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const StatusCodes = require("http-status-codes").StatusCodes;

var storyHandler = require("./stories").handler;

const assetsDir = path.join( __basedir, 'assets' );
const assetsVideosDir = path.join( assetsDir, 'videos' );
const assetsAudioDir = path.join( assetsDir, 'audio' );
const assetsImagesDir = path.join( assetsDir, 'images' );
const assetsCaptionsDir = path.join( assetsDir, 'captions' );

var cacheAssets = {
	videos: [],
	audio: [],
	captions: [],
	images: []
}

initAssets();

function initAssets() {

	if ( !fs.existsSync( assetsDir ) ){
		fs.mkdirSync( assetsDir );
	}

	let paths = {
		videos: assetsVideosDir,
		audio: assetsAudioDir,
		captions: assetsCaptionsDir,
		images: assetsImagesDir,
	};
	let promises = [];

	Object.keys( paths ).forEach( (category) => {
		if ( !fs.existsSync( paths[category] ) ) {
			fs.mkdirSync( assetsVideosDir );
		}
		else{
			promises.push(
				getDirFileNames( paths[category] )
					.then( (files) => cacheAssets[ category ] = files )
					.catch( (error) => console.error("Error Reading \"%s\" -> \"%s\"", category, paths[category], error ) )
			);
		}
	});

	Promise.all( promises )
		.finally( () => {
			console.log( "[initAssets]", "Found: ", cacheAssets );
		});

}

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
	if( req.params.category && req.params.category in cacheAssets ) {
		res.json( cacheAssets[req.params.category] );
	}
	else{
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
});

// GET /assets/ all file names and structures
router.get('/', ( req, res ) => {
	res.json( cacheAssets );
});

// GET /assets/* file
router.get('/*', express.static( assetsDir ) );

// PUT /assets/:category/:filename
router.put('/:category/:filename', (req, res) => {
	if( ( req.params.category && req.params.category in cacheAssets )
		&& ( req.params.filename && cacheAssets[ req.params.category ].includes( req.params.filename ) )
	){
		fs.writeFile(path.join(assetsDir, req.params.category, req.params.filename ), req.body, 'utf8', function (err) {
			if (err) {
				reject( err );
			}
			else {
				if (!storiesSaved.includes(req.params.name)) {
					storiesSaved.push(req.params.name);
					console.log("Story added: ", req.params.name);
				}
				else {
					console.log("Story replaced: ", req.params.name);
				}
				resolve( req.params.name );
			}
		});
	}
	else{
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
});

// DELETE /assets/:category/:filename
router.delete( "/:category/:filename", (req, res) => {
	if( ( req.params.category && req.params.category in cacheAssets )
		&& ( req.params.filename && cacheAssets[ req.params.category ].includes( req.params.filename ) )
	){
		let storiesToCheck = cacheStories;
		let isDependent = null;
		let pathRequested = path.join( assetsDir, req.params.category, req.params.filename);
		let stories = getStoriesThatUse( pathRequested, storiesToCheck )
			.then( (array) => {
				array.forEach( (data) => {

				})
			});
		if( stories && stories.length > 0 ) {
			res.json( stories );
			res.sendStatus( StatusCodes.FORBIDDEN );
		}
		else {
			fs.unlink(pathRequested, (err) => {
				if (err) throw err;
			});
		}
	}
	else{
		res.sendStatus( StatusCodes.NOT_FOUND );
	}
});

function getStoriesThatUse( pathResource, storiesNames ) {
	let assocArray = storyHandler.getJSONArray();
	let names = Object.keys( assocArray );
	let array = [];
	names.forEach( (name) => array.push( assocArray[ name ] ) );

	return Promise.all( array );
}

module.exports = router;
