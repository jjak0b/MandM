import ActivityLoggedEvent from "../../shared/js/ActivityLoggedEvent.js";

export default class ActivityLogger {

	constructor( endPoint ) {
		this.history = [];
		this.endPoint = endPoint;
	}


	/**
	 * @param missionID {string}
	 * @param activityID {string}
	 * @param params {Object}
	 */
	log( missionID, activityID, params ) {
		this.history.push( new ActivityLoggedEvent(
			new Date().toISOString(),
			missionID,
			activityID,
			params
		));
		this.flush();
	};

	flush() {
		$.ajax({
				method: "POST",
				url: this.endPoint,
				contentType: "application/json",
				data: JSON.stringify( this.history )
		})
			.done( () => {
				this.history.splice(0, this.history.length );
			})
			.fail( (  jqXHR, textStatus, errorThrown) => {
				console.warn(`[${this.constructor.name}]`, "Failed to send recent history to remote", "cause:\n", errorThrown );
			});
	}


}