const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const StatusCodes = require("http-status-codes").StatusCodes;
const dirNameStories = "stories"
const pathFolderStories = path.join( __basedir, dirNameStories );
var storiesSaved = [];

function updateStoryNames() {
	if ( !fs.existsSync(pathFolderStories) ){
		fs.mkdirSync( pathFolderStories.toString() );
	}
	else{
		console.log("Detecting stories ..." );
		fs.readdir( pathFolderStories.toString(), (err, filenames ) => {
			if( err ){
				console.error("Error on reading folder: ", `"${pathFolderStories}"`, err);
			}
			else{
				filenames.forEach( (name) => {
					if( !storiesSaved.includes( name ) ) storiesSaved.push( name );
				});
				console.log("Stories detected: ", storiesSaved );
			}
		});
	}
}

updateStoryNames();

router.get('/', ( req, res ) => {
	res.json( storiesSaved );
});

router.get('/:name', ( req, res ) => {
	if( req.params.name ) {
		let storyDir = path.join( __basedir, dirNameStories, req.params.name);

		if( !storiesSaved.includes( req.params.name ) ) {
			res.sendStatus( StatusCodes.NOT_FOUND );
		}
		else{
			fs.readFile( path.join( storyDir, "story.json" ), 'utf8', function (err, data) {
				if (err){
					res.sendStatus( StatusCodes.CONFLICT );
				}
				else{
					try {
						let jsonObj = JSON.parse( data );
						res.json( jsonObj );
					}
					catch( e ) {
						res.sendStatus( StatusCodes.CONFLICT );
					}
				}
			});
		}
	}
});

router.put("/:name", ( req, res ) => {

	let storyDir = path.join( __basedir, dirNameStories, req.params.name);

	if ( !fs.existsSync( storyDir ) ){
		fs.mkdirSync( storyDir );
	}

	fs.writeFile( path.join( storyDir, "story.json" ), JSON.stringify(req.body), 'utf8', function (err) {
		if (err){
			res.sendStatus( StatusCodes.CONFLICT );
		}
		else{
			storiesSaved.push( req.params.name );
			console.log("Story added: ", req.params.name );
			res.sendStatus( StatusCodes.CREATED );
		}
	});
});

module.exports = router;
