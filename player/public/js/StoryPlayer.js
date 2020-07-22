import {WidgetCamera} from "./WidgetCamera.js";
import {WidgetMissions} from "./WidgetMissions.js";
import Story from "/shared/js/Story.js";

export default class StoryPlayer {
	constructor(
	) {
		this.story = null;
		this.eventLister = document.createTextNode(null);
		this._initCallbacks();
	}

	loadStory( data ) {
		// TODO
		this.story = new Story( data );
		WidgetMissions.missions = this.story.missions;
	}

	_initCallbacks() {
		let self = this;
		WidgetCamera.onScanDecode = function ( resultDecode ) {
			console.log("On scan decode:", resultDecode);
			var dataScanned = null;
			/* Sometimes scanner detect false positive "" so will ignore them */
			if( resultDecode && resultDecode != "") {
				try {
					dataScanned = JSON.parse( resultDecode );
				}
				catch( e ) {
					WidgetCamera.onScanError( "[StoryPlayer] received a not valid JSON: " + resultDecode );
				}

				if( dataScanned && data.actionType ) {
					/* call registered callbacks for this event type */
					self.eventLister.dispatchEvent( new CustomEvent(
						dataScanned.actionType,
						{ data: dataScanned }
					));
				}
			}
			else {
				WidgetCamera.onScanError( "[StoryPlayer] received a not valid JSON: " + resultDecode );
			}
		};
		WidgetCamera.onScanError = function (error) {
			if( !(error instanceof DOMException) ) // se aperto con protocollo file, gli errori sono spammati
				console.error( "On scan error: ", error );
		};
		this.eventLister.addEventListener( 'addMission', function (e) {
			if( e.detail && e.detail.data )
				self.addMission( e.detail.data );
		}, false);
	}

	/***
	 * Add the mission to the story and shows the new mission on WidgetMission
	 * @param mission
	 */
	addMission( /* Object */ mission ) {
		if( this.story ) {
			this.story.addMission( mission );
		}
	}
}