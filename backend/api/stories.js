const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const StatusCodes = require("http-status-codes").StatusCodes;

const handler = require( "../js/StoryHandler").instance;

handler.updateNameList();

router.param('name', function (req, res, next, value ) {
	res.locals.storyName = value;
	next();
});

router.route("/:name" )
	.get( API_GET_story )
	.put( API_PUT_story )
	.delete( API_DELETE_story );

router.use(
	"/:name/locales",
	// first set base path for locales
	(req, res, next) => {
		if( res.locals.storyName ) {
			if( handler.getList().includes( res.locals.storyName ) ) {
				res.locals.locales = {
					path: handler.getPathStory(res.locals.storyName)
				}
				next();
			}
			else {
				res.sendStatus( StatusCodes.NOT_FOUND );
			}
		}
		else {
			res.sendStatus( StatusCodes.BAD_REQUEST );
		}
	},
	// and then use middlewware
	require("../api/locales")()
);


router.get('/', API_GET_storyList );
function API_GET_storyList ( req, res ) {
	res.json( handler.getList() );
}

// router.get('/:name', API_GET_story );
function API_GET_story(req, res) {
	let storyName = res.locals.storyName;
	if( !storyName ) {
		res.sendStatus( StatusCodes.BAD_REQUEST );
	}
	else {
		if( !handler.getList().includes( storyName ) ) {
			res.sendStatus( StatusCodes.NOT_FOUND );
		}
		else {
			handler.getJSON( storyName )
				.then( (data) => {
					if ( req.query.source !== 'editor' && !data.public ) {
						console.error(`[ GET stories/${storyName}]`, "Error getting JSON of story", "cause", "The story is not public" );
						res.sendStatus(StatusCodes.FORBIDDEN);
					}
					else res.json( data );
				})
				.catch( (objError)=> {
					console.error(`[ GET stories/${storyName}]`, "Error getting JSON of story", "cause", objError.error );
					res.sendStatus( objError.statusCode );
				});
		}
	}
}

// router.put("/:name", API_PUT_story );
function API_PUT_story( req, res ) {
	let storyName = res.locals.storyName;
	if( !storyName ) {
		res.sendStatus( StatusCodes.BAD_REQUEST );
		return;
	}

	let storyDir = handler.getPathStory( storyName );

	let status = StatusCodes.CREATED;
	if ( !fs.existsSync( storyDir ) ){
		fs.mkdirSync( storyDir );
	}

	let requests = [];

	if( req.body ) {
		requests.push(
			handler.addJSON( storyName, req.body )
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
}
// router.delete('/:name',API_DELETE_story );
function API_DELETE_story( req, res ) {
	let storyName = res.locals.storyName;
	if( !storyName ) {
		res.sendStatus( StatusCodes.BAD_REQUEST );
	}
	else {

		if( !handler.getList().includes( storyName ) ) {
			res.sendStatus( StatusCodes.NOT_FOUND );
		}
		else {
			handler.deleteJSON( storyName )
			.then( (data) => {
				res.sendStatus( StatusCodes.OK );
			})
			.catch( (err)=> {
				res.sendStatus( StatusCodes.CONFLICT );
			});
		}
	}
}

module.exports = {
	handler: handler,
	router: router
};
