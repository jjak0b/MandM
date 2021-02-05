import Disposable from "../../../Disposable.js";
import {Asset} from "../../../Asset.js";
import ContextMediaPlayerArea from "./ContextMediaPlayerArea.js";

export default class ContextMediaPlayer extends Disposable {
	constructor(unparsed, i18nCategory) {
		super(unparsed);

		let context = unparsed;
		this.asset = context.asset ? new Asset( context.asset ) : null;
		this.captions = context.captions || {};
		if( this.asset ) {
			switch (this.asset.category) {
				case "images":
					if( !(0 in this.captions)) {
						this.captions[ 0 ] = i18nCategory + ".image.caption";
					}
					if( !(1 in this.captions)) {
						this.captions[ 1 ] = i18nCategory + ".image.alt";
					}
					break;
				default:
					Object.keys(this.captions)
						.forEach((lang) => this.captions[lang] = new Asset(context.captions[lang]));
					break;
			}
		}

		this.areas = unparsed.areas ? unparsed.areas.map( area => new ContextMediaPlayerArea(area) ) : [];
	}

	duplicate( locales, i18nCategoryPrefix ) {
		let captions = {};
		if( this.asset ) {
			switch (this.asset.category) {
				case "images":
					captions[0] = i18nCategoryPrefix + ".image.caption";
					captions[1] = i18nCategoryPrefix + ".image.alt";
					for (const captionsKey in this.captions) {
						locales.push([
							this.captions[captionsKey],
							captions[captionsKey]
						]);
					}
					break;
				default:
					Object.keys(this.captions)
						.forEach((lang) => {
							captions[lang] = this.captions[lang].duplicate();
						});
					break;
			}
		}
		let duplicate = {
			asset: this.asset ? this.asset.duplicate() : null,
			captions: captions,
			areas: this.areas ? this.areas.map( (area) => area.duplicate( locales, i18nCategoryPrefix ) ) : []
		};

		return Object.setPrototypeOf( duplicate, ContextMediaPlayer.prototype );
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