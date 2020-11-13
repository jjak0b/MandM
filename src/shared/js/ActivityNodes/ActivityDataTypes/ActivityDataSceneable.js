import ActivityData from "./ActivityData.js";
import Scene from "../../Scene/Scene.js";
import Mission from "../../Mission.js";

export default class ActivityDataSceneable extends ActivityData {
	constructor(unparsed) {
		super(unparsed);
		this.scene = new Scene( unparsed ? unparsed.scene : null );
	}

	dispose( params ) {
		this.scene.dispose( params );
		super.dispose( params );
	}

	duplicate( locales, activityCategory ) {
		let duplicateData = super.duplicate( locales, activityCategory );

		if ( duplicateData.scene ) {
			duplicateData.scene = this.scene.duplicate( locales, activityCategory );
		}

		return duplicateData
	}
}