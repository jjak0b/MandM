const path = require("path");
const fs = require("fs");

const allStories = []
	.concat(
		[
		path.join( "stories", "Chi ha ucciso Da Vinci", "story.json" ),
		path.join( "stories", "Chi ha ucciso Da Vinci", "dependencies.json" )
	])
	.concat(
		fs.readdirSync(path.join( "stories", "Chi ha ucciso Da Vinci", "locales" ))
			.map( (name) => path.join( "stories", "Chi ha ucciso Da Vinci", "locales", name ) )
	)
	.concat([
		path.join( "stories", "Mille per un paese", "story.json" ),
		path.join( "stories", "Mille per un paese", "dependencies.json" )
	])
	.concat(
		fs.readdirSync(path.join( "stories", "Mille per un paese", "locales" ))
			.map( (name) => path.join( "stories", "Mille per un paese", "locales", name ) )
	)
	.concat([
		path.join( "stories", "Una giornata con Wall-E", "story.json" ),
		path.join( "stories", "Una giornata con Wall-E", "dependencies.json" )
	])
	.concat(
		fs.readdirSync(path.join( "stories", "Una giornata con Wall-E", "locales" ))
			.map( (name) => path.join( "stories", "Una giornata con Wall-E", "locales", name ) )
	);

module.exports = allStories;