const path = require("path");
const fs = require("fs");

const audios = fs.readdirSync( path.join( "assets", "audios") );
const videos = fs.readdirSync( path.join( "assets", "videos") );
const captions = fs.readdirSync( path.join( "assets", "captions") );
const images = fs.readdirSync( path.join( "assets", "images") );
const stylesheets = fs.readdirSync( path.join( "assets", "stylesheets") );
const allAssets = []
	.concat(stylesheets.map( (name) => path.join( "assets", "stylesheets", name ) ) )
	.concat(images.map( (name) => path.join( "assets", "images", name ) ) )
	.concat(captions.map( (name) => path.join( "assets", "captions", name ) ) )
	.concat(videos.map( (name) => path.join( "assets", "videos", name ) ) )
	.concat(audios.map( (name) => path.join( "assets", "audios", name ) ) )
module.exports = allAssets;
