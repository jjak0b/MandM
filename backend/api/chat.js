/*
 * Simple chat, each user own a single chat which is a list of messages
 * A user can see all messages of all users which sent a message to the user
 */

const express = require('express');
const router = express.Router();
const StatusCodes = require("http-status-codes").StatusCodes;

router.use( initChat );

router.get( '/', API_GET_chatID );
// list of messages of a receiver
router.get('/messages/', API_GET_messages );
router.get('/:receiverID/messages/', API_GET_messages );
// add a message to the message list of a receiver
router.put('/messages/', API_addMessage );
router.put('/:receiverID/messages/', API_addMessage );

router.get( '/contacts/', API_GET_contacts );
router.get( '/:receiverID/contacts/', API_GET_contacts );
router.post( '/contacts/', API_addContacts );
router.post( '/:receiverID/contacts/', API_addContacts );

router.get( '/:receiverID/status/', API_GET_status );
router.get( '/status/', API_GET_status );
router.post( '/:receiverID/status/', API_POST_status );
router.post( '/status/', API_POST_status );

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
		session.chat = {
			messages: [],
			contacts: [],
			status: {
				online: false,
				invite: false
			}
		};
	}
}

function API_GET_chatID(req, res) {
	res.json( [ req.session.id ] );
}

function API_GET_contacts( req, res ) {
	let receiverID = req.params.receiverID;
	let selfChat = req.session.chat;

	if( receiverID ) {
		req.sessionStore.get( receiverID, (error, session) => {
			if( error ) {
				res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR);
			}
			else if( !session) {
				res.sendStatus( StatusCodes.NOT_FOUND );
			}
			else {
				res.json( session.chat.contacts || [] );
			}
		});
	}
	else {
		res.json( selfChat.contacts );
	}
}

function registerContacts( chat, newContacts ) {
	for (const newContact of newContacts) {
		let alreadyRegistered = chat.contacts.filter( contact => contact.id === newContact.id );
		if( alreadyRegistered.length > 0 ) {
			alreadyRegistered.name = newContact.name;
		}
		else {
			chat.contacts.push({
				id: newContact.id,
				name: newContact.name
			});
		}
	}
}

function API_addContacts( req, res ) {
	let receiverID = req.params.receiverID;
	let selfChat = req.session.chat;
	let newContacts = req.body;

	if( receiverID && receiverID != req.session.id ) {
		req.sessionStore.get( receiverID, (error, session) => {
			if( error ) {
				req.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
			}
			else {
				initChatOnSession( session ); // init session if needed

				if( newContacts.length > 0 ) {

					registerContacts( session.chat, newContacts );

					req.sessionStore.set( receiverID, session, (error) => {
						if( error ) {
							console.error( "[api/chat]", "Error saving session", session.id, "cause:", error );
							res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
						}
						else {
							res.json( session.chat.contacts );
						}
					});
				}
				else {
					res.json( session.chat.contacts );
				}
			}
		});
	}
	// otherwise add it to self messages
	else {
		if( newContacts.length > 0 ) {
			registerContacts( selfChat, newContacts );
		}
		res.json( selfChat.contacts );
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
				res.json( session.chat.messages || [] );
			}
		});
	}
	// otherwise get self messages
	else {
		res.json( selfChat.messages );
	}
}

function API_addMessage( req, res ) {

	let receiverID = req.params.receiverID;

	let message = req.body;
	let selfID = req.session.id;
	let selfChat = req.session.chat;

	let loggedMessage = {
		author: selfID,
		body: message.body,
		type: message.type,
		timestamp: message.timestamp
	};

	// if a receiver is set, then add the message to the receiver messages
	if( receiverID && receiverID != req.session.id ) {
		req.sessionStore.get( receiverID, (error, session) => {
			if( error ) {
				req.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
			}
			else {
				initChatOnSession( session ); // init session if needed
				session.chat.messages.push( loggedMessage );

				req.sessionStore.set( receiverID, session, (error) => {
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
		selfChat.messages.push( loggedMessage );
		res.sendStatus( StatusCodes.CREATED );
	}
}

function API_GET_status(req, res) {
	let receiverID = req.params.receiverID;
	let selfChat = req.session.chat;

	if( receiverID ) {
		req.sessionStore.get( receiverID, (error, session) => {
			if( error ) {
				req.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
			}
			else if( session ) {
				initChatOnSession( session );
				let status = session.chat.status;
				res.json( status );
			}
			else {
				let fakeSession = {};
				initChatOnSession( fakeSession );
				res.json( fakeSession.chat.status );
			}
		});
	}
	else {
		res.json( selfChat.status );
	}
}

function mergeStatus( targetStatus, sourceStatus) {
	if( "online" in sourceStatus ) {
		targetStatus.online = sourceStatus.online;
	}

	if( "invite" in sourceStatus ) {
		targetStatus.invite = sourceStatus.invite;
	}
}

function API_POST_status(req, res) {
	let receiverID = req.params.receiverID;
	let selfChat = req.session.chat;
	let status = req.body;

	if( receiverID && receiverID != req.session.id ) {
		req.sessionStore.get( receiverID, (error, session) => {
			if( error ) {
				req.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
			}

			if( session ) {
				initChatOnSession( session );
				mergeStatus( session.chat.status, status);
				req.sessionStore.set( receiverID, session, (error) => {
					if( error ) {
						console.error( "[api/chat]", "Error saving session", session.id, "cause:", error );
						res.sendStatus( StatusCodes.INTERNAL_SERVER_ERROR );
					}
					else {
						res.sendStatus( StatusCodes.OK );
					}
				});
			}
			else {
				let fakeSession = {};
				initChatOnSession( fakeSession );
				res.json( fakeSession.chat.status );
			}
		});
	}
	else {
		mergeStatus( selfChat.status, status );
		
		res.sendStatus( StatusCodes.OK );
	}
}

module.exports = router;