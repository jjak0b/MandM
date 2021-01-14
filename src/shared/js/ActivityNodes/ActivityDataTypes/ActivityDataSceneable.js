import ActivityData from "./ActivityData.js";
import Scene from "../../Scene/Scene.js";
import Mission from "../../Mission.js";

export default class ActivityDataSceneable extends ActivityData {
	constructor(unparsed) {
		super(unparsed);
		if( !unparsed.scene || !( unparsed.scene instanceof Scene ) ){
			this.scene = new Scene( unparsed ? unparsed.scene : null );
			this.scene.body.name = "user-widget-grid";
			this.scene.body.id = this.id;
			this.scene.body.i18nCategory = `${this.i18nCategory}.component.${ this.id }`;
		}
		else {
			this.scene = unparsed.scene;
		}
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