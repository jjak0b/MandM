import ActivityData from "./ActivityData.js";
import Scene from "../../Scene/Scene.js";
import Mission from "../../Mission.js";

export default class ActivityDataSceneable extends ActivityData {
	constructor(unparsed) {
		super(unparsed);
		if( !unparsed.scene || !( unparsed.scene instanceof Scene ) ){
			let sceneDummy = {
				body: {
					id: this.id,
					i18nCategory: `${this.i18nCategory}.component.${ this.id }`,
					name:  "user-widget-grid",
					props: {},
				}
			}
			this.scene = new Scene( unparsed.scene || sceneDummy );
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

		let duplicate = super.duplicate( locales, activityCategory );
		duplicate = Object.assign(
			duplicate,
			{
				scene: this.scene.duplicate( locales, duplicate.i18nCategory )
			}
		);

		return Object.setPrototypeOf( duplicate, ActivityDataSceneable.prototype );
	}
}