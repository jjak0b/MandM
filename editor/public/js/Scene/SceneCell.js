import Disposable from "../Disposable.js";
import SceneComponentParser from "./SceneComponentParser.js";

export default class SceneCell extends Disposable {
	constructor(unparsed) {
		super(unparsed);
		this.colSize = unparsed.colSize;
		this.component = SceneComponentParser.parse( unparsed.component );
	}

	dispose( params ) {
		this.component.dispose( params );
		super.dispose( params );
	}
}