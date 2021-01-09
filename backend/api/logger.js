const express = require('express');
const {StatusCodes} = require( "http-status-codes" );
const path = require('path');
const util = require('util')

const router = express.Router();


router.post("/", PUT_SESSION);
router.get("/", GET_SESSION);

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
			}
		}
		res.json(players);
	})
}

module.exports = router;