import I18nCategorized from "../../I18nCategorized.js";

export default class ActivityData extends I18nCategorized {

	constructor(unparsed) {
		super(unparsed);
		if( unparsed ) {
			if( unparsed.noteInfo ) {
				this.noteInfo = unparsed.noteInfo;
				this.title = unparsed ? unparsed.title : null;
				this.description = unparsed ? unparsed.description : null;
				this.active = unparsed ? unparsed.active : true;
			}
		}
	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );

		duplicate.noteInfo = JSON.parse( JSON.stringify( this.noteInfo ) );
		duplicate.active = this.active;

		if (this.title) {
			duplicate.title = duplicate.i18nCategory + '.title';
			locales.push( [
				this.title,
				duplicate.title
			]);
		}
		if (this.description) {
			duplicate.description = duplicate.i18nCategory + '.description';
			locales.push( [
				this.description,
				duplicate.description
			]);
		}

		return Object.setPrototypeOf( duplicate, ActivityData.prototype );
	}
}