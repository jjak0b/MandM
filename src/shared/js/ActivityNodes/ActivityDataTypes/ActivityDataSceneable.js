import ActivityData from "./ActivityData.js";
import Scene from "../../Scene/Scene.js";
import Mission from "../../Mission.js";

export default class ActivityDataSceneable extends ActivityData {
	constructor(unparsed) {
		super(unparsed);
		this.scene = new Scene( unparsed ? unparsed.scene : null );
		this.title = unparsed ? unparsed.title : null;
		this.description = unparsed ? unparsed.description : null;
	}

	dispose( params ) {
		this.scene.dispose( params );
		super.dispose( params );
	}

	duplicate( locales, activityCategory ) {
		let duplicateData = new ActivityDataSceneable(JSON.parse(JSON.stringify(this)));

		if (duplicateData.title) {
			duplicateData.title = activityCategory + '.title';
			Mission.duplicateCallback(locales, duplicateData.title, this.title);
		}
		if (duplicateData.description) {
			duplicateData.description = activityCategory + '.description';
			Mission.duplicateCallback(locales, duplicateData.description, this.description);
		}

		if ( duplicateData.scene ) {
			duplicateData.scene = this.scene.duplicate( locales, activityCategory );
		}

		return duplicateData
	}
}