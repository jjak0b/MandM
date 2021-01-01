const express = require('express');
const path = require('path');
const router = express.Router();


router.get( "/", API_LOGGER );
router.post("/", ACTIVITY_LOGGER);

function ACTIVITY_LOGGER( req, res, next ) {
	let log = req.body.slice(-1)[0];
	if (log && req.query.story) {
		let story = req.query.story;
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
		req.session.save();
	}
}

function API_LOGGER( req, res, next ) {
	if (req.session.views) {
		req.session.views++
		res.setHeader('Content-Type', 'text/html')
		res.write('<p>views: ' + req.session.views + '</p>')
		res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
		res.end()
	} else {
		req.session.views = 1
		res.end('welcome to the session demo. refresh!')
	}
}
module.exports = router;