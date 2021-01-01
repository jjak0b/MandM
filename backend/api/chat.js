/*
 * Simple chat, each user own a single chat which is a list of messages
 * A user can see all messages of all users which sent a message to the user
 */

const express = require('express');
const router = express.Router();
const StatusCodes = require("http-status-codes").StatusCodes;

router.use( initChat );
// list of messages of a receiver
router.get('/messages/', API_GET_messages );
router.get('/messages/:receiverID', API_GET_messages );
// add a message to the message list of a receiver
router.put('/messages/', API_addMessage );
router.put('/messages/:receiverID', API_addMessage );

function initChat(req, res, next) {
	if( req.session ) {
		initChatOnSession( req.session );
		next();
	}
	else {
		// use only if session has been set
		res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
	}
}

function initChatOnSession( session ) {
	if( !session.chat ) {
		session.chat = [];
	}
}
function API_GET_messages( req, res ) {
	let receiverID = req.params.receiverID;
	let selfChat = req.session.chat;

	// if a receiver is set, then get all its messages
	if( receiverID ) {
		req.sessionStore.get( receiverID, (error, session) => {
			if( error ) {
				res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR);
			}
			else if( !session) {
				res.sendStatus( StatusCodes.NOT_FOUND );
			}
			else {
				res.json( session.chat || [] );
			}
		});
	}
	// otherwise get self messages
	else {
		res.json( selfChat );
	}
}

function API_addMessage( req, res ) {

	let receiverID = req.params.receiverID;

	let message = req.body;
	let selfID = req.session.id;
	let selfChat = req.session.chat;

	let loggedMessage = {
		sender: selfID,
		content: message.content,
		type: message.type,
		timestamp: message.timestamp
	};

	// if a receiver is set, then add the message to the receiver messages
	if( receiverID ) {
		req.sessionStore.get( receiverID, (error, session) => {
			if( error ) {
				req.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
			}
			else {
				initChatOnSession( session ); // init session if needed
				session.chat.push( loggedMessage );
				session.save( (error) => {
					if( error ) {
						console.error( "[api/chat]", "Error saving session", session.id, "cause:", error );
						res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
					}
					else {
						res.sendStatus( StatusCodes.CREATED );
					}
				})
			}
		});
	}
	// otherwise add it to self messages
	else {
		selfChat.push( loggedMessage );
		res.sendStatus( StatusCodes.CREATED );
	}
}

module.exports = router;