const express = require('express');
const path = require('path');
const router = express.Router();
const session = require('express-session');

const SessionQueue = require( "../js/SessionQueues");
const sessionQueue = new SessionQueue( (req, res) => {
	return req.params.sessionId // logger
		|| req.params.receiverID // chat
		|| req.sessionID; // any other
});

const sessionDuration = {
	hours: 12,
	minutes: 0,
	seconds: 0
}

router.use( setupSession() );

router.use(
	handlePlayerSession,
	initPlayerSession, // init only if needed
	// here any handler for player
	sessionQueue.getQueueMiddleWare()
);

router.use('/locales',
	// first provide to middleware the path it needs
	require("../api/locales" )( path.join(global.__basedir, "src", "player" ) )
);

router.use( "/log", require("../api/logger") );
router.use( "/chat", require("../api/chat") );

router.use('/', express.static(path.join(global.__basedir, "src", "player" ) ) );

function setupSession() {

	// setup session configuration
	return session({
		secret: 'player',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: sessionDuration.hours * 3600000 + sessionDuration.minutes * 3600 + sessionDuration.seconds * 1000
		},
		store: new session.MemoryStore()
	})
}

function handlePlayerSession( req, res, next ) {
	let storyName = req.query.story;

	if (req.session.storyName ) {
		if( req.session.storyName !== storyName ) {
			console.log( "[routes/player]", "Creating new session for already initialized session but for another story");
			// create new session
			req.session.regenerate((err) => {
				if( !err ) {
					// init a new one
					next();
				}
				else {
					console.error( "[routes/player]", "Error cleaning session for already initialized session to init a new one for another story", err );
					next();
				}
			});
		}
		else {
			// same story continue
			next();
		}
	}
	else if ( req.session.stopped === true ) {
			console.log( "[routes/player]", "Resetting session because the story was stopped");
			// create new session
			req.session.stopped = false;
			req.session.regenerate((err) => {
				if( !err ) {
					// init a new one
					next();
				}
				else {
					console.error( "[routes/player]", "Failed to reset the session", err );
					next();
				}
			});
	}
	else {
		// first init
		next();
	}
}

function initPlayerSession(req, res, next) {
	let storyName = req.query.story;
	if( !req.session.initialized ){
		console.log( "[routes/player]", "Init new session for player of session", req.sessionID );
		req.session.storyName = storyName;
		req.session.views = 1;

		req.session.initialized = true;
		req.session.stopped = false;
	}
	else {
		req.session.views += 1;
	}
	next();

	// res.write("Hello " + req.session.storyName + "\n" );
	// res.write( "view" +  req.session.views );
	// res.write( "init" + req.session.initialized );
	// res.end();
}

module.exports = router;