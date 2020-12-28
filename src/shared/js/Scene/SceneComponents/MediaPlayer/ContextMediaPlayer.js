import Disposable from "../../../Disposable.js";
import {Asset} from "../../../Asset.js";
import ContextMediaPlayerArea from "./ContextMediaPlayerArea.js";

export default class ContextMediaPlayer extends Disposable {
	constructor(unparsed) {
		super(unparsed);

		let context = unparsed;
		this.asset = context.asset ? new Asset( context.asset ) : null;
		this.captions = context.captions || {};
		if( this.asset ) {
			switch (this.asset.category) {
				case "images":
					break;
				default:
					Object.keys(this.captions)
						.forEach((lang) => this.captions[lang] = new Asset(context.captions[lang]));
					break;
			}
		}

		this.areas = unparsed.areas ? unparsed.areas.map( area => new ContextMediaPlayerArea(area) ) : [];
	}

	dispose(params) {

		if( this.asset ) {
			switch (this.asset.category) {
				case "images":
					break;
				default:
					Object.keys( this.captions )
						.forEach( (lang) => {
							if( this.captions[ lang ].dispose )
								this.captions[ lang ].dispose()
						});
					break;
			}
			if( this.asset.dispose)
				this.asset.dispose( params );
		}

		if( this.areas ) this.areas.forEach( (area) => area.dispose(params) );

		super.dispose(params);
	}
}