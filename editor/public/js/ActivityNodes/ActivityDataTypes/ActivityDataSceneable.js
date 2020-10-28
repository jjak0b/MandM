import ActivityData from "./ActivityData.js";
import Scene from "../../Scene/Scene.js";

export default class ActivityDataSceneable extends ActivityData {
	constructor(unparsed) {
		super(unparsed);

		this.scene = new Scene(unparsed.scene);
		this.title = unparsed.title;
		this.description = unparsed.description;
	}

	dispose( params ) {
		this.scene.dispose( params );
		super.dispose( params );
	}
}