import SceneComponent from "../SceneComponent.js";
import {Asset} from "../../../../shared/js/Asset.js";

export default class ComponentMediaPlayer extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);
		if(unparsed.value.asset && !(unparsed.value.asset instanceof Asset) ) {
			unparsed.value.asset = new Asset( unparsed.value.asset );
			switch (unparsed.value.asset.category) {
				case "images":
					break;
				default:
					Object.keys( unparsed.value.captions )
						.forEach( (lang) => unparsed.value.captions[ lang ] = new Asset( unparsed.value.captions[ lang ] ) );
					break;
			}
		}
	}

	dispose(params) {
		let value = this.getValue();
		if( value ) {
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
		super.dispose(params);
	}
}