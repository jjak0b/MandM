export default class ActivityLoggedEvent {
	/**
	 *
	 * @param timestamp in Date ISO format{string}
	 * @param missionID {string}
	 * @param activityID {string}
	 * @param params {Object}
	 */
	constructor( timestamp, missionID, activityID, params ) {
		this.activityID = activityID;
		this.missionID = missionID;
		this.timestamp = timestamp;
		this.params = params;
	}
}