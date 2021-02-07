const express = require('express');
const {StatusCodes} = require( "http-status-codes" );
const path = require('path');
const util = require('util')

const router = express.Router();

router.post("/", PUT_SESSION);
router.post("/:sessionId", EDIT_SESSION);
router.post("/:sessionId/reset", RESET_STORY);
router.get("/", GET_SESSION);
router.get("/totalscore", GET_TOTAL_SCORE);

function RESET_STORY( req, res, next ) {

	let story = req.query.story;
	function _editSession(session, sessionId ) {
		if( story ) {
			if (('stories' in session) && session.stories[story]) {
				session.stopped = true;
			}
			return true;
		}
		else {
			return false;
		}
	}

	// requested session to edit is same of requester
	if( req.params.sessionId && req.params.sessionId === req.sessionID ) {
		// edit request's session
		let hasBeenHandled = _editSession(req.session, req.sessionID );
		if( !hasBeenHandled ) {
			res.sendStatus(StatusCodes.BAD_REQUEST);
		}
		else {
			res.sendStatus(StatusCodes.OK);
		}
	}
	else if( req.params.sessionId ) {
		// edit requested session
		req.sessionStore.get(req.params.sessionId, (error, session) => {
			if (error || !session) {
				res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			}
			else {
				let hasBeenHandled = _editSession(session, req.params.sessionId );

				if( !hasBeenHandled ) {
					res.sendStatus(StatusCodes.BAD_REQUEST);
					return;
				}

				req.sessionStore.set(req.params.sessionId, session, (error) => {
					if (error) {
						res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
					}
					else {
						res.sendStatus(StatusCodes.OK);
					}
				});
			}
		});
	}
	else {
		res.sendStatus(StatusCodes.BAD_REQUEST);
	}
}

function GET_TOTAL_SCORE( req, res, next ) {
	if (  req.query.story ) {

		if ( !('stories' in req.session) ) {
			req.session.stories = {};
		}

		if ( !(req.query.story in req.session.stories) ) {
			req.session.stories[req.query.story] = {};
		}

		if ( !('totalScore' in req.session.stories[req.query.story]) ) {
			req.session.stories[req.query.story].totalScore = 0;
		}

		res.json({totalScore: req.session.stories[req.query.story].totalScore});

	}
	else {
		res.sendStatus(StatusCodes.BAD_REQUEST);
	}
}

function EDIT_SESSION( req, res, next ) {
	function _editSession(session, sessionId ) {
		let handled = false;
		if ( req.query.name ) {
			session.name = req.query.name;
			handled = true;
		}

		if ( req.query.score && req.body ) {
			session.stories[req.body.story][req.body.mission][req.body.activity].score = req.body.score;
			updateTotalScore(session);
			handled = true;
		}

		if ( req.query.valuated && req.body ) {
			delete session.stories[req.body.story][req.body.mission][req.body.activity].valueToEvaluate;
			handled = true;
		}

		return handled;
	}

	// requested session to edit is same of requester
	if( req.sessionID && req.params.sessionId && req.params.sessionId === req.sessionID ) {
		console.log( " edit request's session");
		// edit request's session
		let hasBeenHandled = _editSession(req.session, req.sessionID );
		if( !hasBeenHandled ) {
			res.sendStatus(StatusCodes.BAD_REQUEST);
		}
		else {
			res.sendStatus(StatusCodes.OK);
		}
	}
	else if( req.params.sessionId ) {
		// edit requested session
		req.sessionStore.get(req.params.sessionId, (error, session) => {
			let sessionId = req.params.sessionId;
			if (error || !session) {
				res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			}
			else {
				let hasBeenHandled = _editSession(session, sessionId );

				if( !hasBeenHandled ) {
					res.sendStatus(StatusCodes.BAD_REQUEST);
					return;
				}

				req.sessionStore.set(sessionId, session, (error) => {
					if (error) {
						res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
					}
					else {
						res.sendStatus(StatusCodes.OK);
					}
				});
			}
		});
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
				req.session.stories[story][mission][activity] = {
					score: 0
				};

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
					updateTotalScore(req.session);
				}
				if (log.params.valueToEvaluate) {
					req.session.stories[story][mission][activity].valueToEvaluate = log.params.valueToEvaluate;
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
				if ('totalScore' in sessions[session]) {
					players[session].totalScore = sessions[session].totalScore;
				}
			}
		}
		res.json(players);
	})
}

function updateTotalScore( session ) {

	if ( !('totalScore' in session) ) {
		session.totalScore = {};
	}
	for (const story in session.stories) {
		session.stories[story].totalScore = 0;
		for (const mission in session.stories[story]) {
			for (const activity in session.stories[story][mission]) {
				if ( session.stories[story][mission][activity].score ) {
					session.stories[story].totalScore = parseInt(session.stories[story].totalScore)
							+ parseInt(session.stories[story][mission][activity].score);
				}
			}
		}
	}
	return session;
}

module.exports = router;