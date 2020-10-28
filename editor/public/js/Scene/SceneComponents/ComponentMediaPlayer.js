import SceneComponent from "../SceneComponent.js";
import SceneComponentParser from "../SceneComponentParser.js";

export default class ComponentMediaPlayer extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);
	}

	dispose(params) {
		super.dispose(params);
		let value = this.getValue();
		if( value ) {
			// TODO: extend asset as Disposable
			if( value.asset && value.asset.dispose ) {
				value.asset.dispose( params );
			}
			if( value.asset ) {
				switch (value.asset.category) {
					case "images":
						break;
					default:
						Object.keys( value.captions )
							.forEach( (lang) => {
								if( value.captions[ lang ].dispose )
									value.captions[ lang ].dispose()
							});
						break;
				}
				if( value.asset.dispose)
					value.asset.dispose( params );
			}
		}
	}
}

SceneComponentParser.register("user-widget-media-player", ComponentMediaPlayer );