import ActivityData from "./ActivityData.js";
import Scene from "../../Scene/Scene.js";

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
}