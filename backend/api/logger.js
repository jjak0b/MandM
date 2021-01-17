const express = require('express');
const {StatusCodes} = require( "http-status-codes" );
const path = require('path');
const util = require('util')

const router = express.Router();
// We can receive big buffers of logs
router.use(express.json({
	limit: "100MB"
}));

router.post("/", PUT_SESSION);
router.post("/:sessionId", EDIT_SESSION);
router.get("/", GET_SESSION);

function EDIT_SESSION( req, res, next ) {

	let sessionId = req.params.sessionId;

	if ( req.query.name ) {
		req.sessionStore.get(sessionId, (error, session) => {
			if (error || !session) {
				req.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			} else {
				session.name = req.query.name;

				req.sessionStore.set(sessionId, session, (error) => {
					if (error) {
						res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
					} else {
						res.sendStatus(StatusCodes.OK);
					}
				});
			}
		})
	}
	else if ( req.query.score && req.body ) {
		req.sessionStore.get(sessionId, (error, session) => {
			if (error || !session) {
				req.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			} else {
				session.stories[req.body.story][req.body.mission][req.body.activity].score = req.body.score;

				req.sessionStore.set(sessionId, session, (error) => {
					if (error) {
						res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
					} else {
						res.sendStatus(StatusCodes.OK);
					}
				});
			}
		})
	}
	else {
		res.sendStatus(StatusCodes.BAD_REQUEST);
	}
}

function PUT_SESSION( req, res, next ) {

	if (req.body && req.query.story) {
		let story = req.query.story;
		for (const log of req.body) {
			let mission = log.missionID;
			let activity = log.activityID;

			if (!req.session.stories) {
				req.session.stories = {};
			}

			if (!(story in req.session.stories)) {
				req.session.stories[story] = {}
			}

			if (!(mission in req.session.stories[story])) {
				req.session.stories[story][mission] = {};
			}

			if (!(activity in req.session.stories[story][mission])) {
				req.session.stories[story][mission][activity] = {};
			}

			if (log.params) {
				if (log.params.start) {
					req.session.stories[story][mission][activity].start = log.timestamp;
				} else if (log.params.end) {
					req.session.stories[story][mission][activity].end = log.timestamp;
				}
				if (log.params.input) {
					req.session.stories[story][mission][activity].input = log.params.input;
				}
				if (log.params.score) {
					req.session.stories[story][mission][activity].score = log.params.score;
				}
			}
		}
		res.sendStatus( StatusCodes.OK );
	}
	else {
		res.sendStatus( StatusCodes.NOT_ACCEPTABLE );
	}
}

function GET_SESSION( req, res, next ) {
	req.sessionStore.all( (err, sessions) => {
		let players = {};
		for (const session in sessions) {
			if ('stories' in sessions[session]) {
				players[session] = sessions[session].stories;
				if ('name' in sessions[session]) {
					players[session].name = sessions[session].name;
				}
			}
		}
		res.json(players);
	})
}

module.exports = router;