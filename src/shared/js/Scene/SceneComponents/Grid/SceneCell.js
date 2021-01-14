import Disposable from "../../../Disposable.js";
import SceneComponentParser from "../../SceneComponentParser.js";

export default class SceneCell extends Disposable {
	constructor(unparsed) {
		super(unparsed);
		this.colSize = unparsed ? unparsed.colSize : 1;
		if( unparsed && unparsed.component )
			this.component = SceneComponentParser.parse( unparsed.component );
	}

	dispose( params ) {
		if( this.component && this.component.dispose )
			this.component.dispose( params );
		super.dispose( params );
	}

	duplicate( locales, activityCategory ) {
		let duplicateCell = new SceneCell({
			colSize: this.colSize
		});
		if( this.component && this.component.duplicate )
			duplicateCell.component = this.component.duplicate( locales, activityCategory );


		return duplicateCell;
	}
}