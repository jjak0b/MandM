import Disposable from "../../Disposable.js";
import I18nCategorized from "../../I18nCategorized.js";
import Mission from "../../Mission.js";
import ActivityDataSceneable from "./ActivityDataSceneable.js";

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
		let duplicateData = new ActivityDataSceneable(JSON.parse(JSON.stringify(this)));

		if (duplicateData.title) {
			duplicateData.title = activityCategory + '.title';
			Mission.duplicateCallback(locales, duplicateData.title, this.title);
		}
		if (duplicateData.description) {
			duplicateData.description = activityCategory + '.description';
			Mission.duplicateCallback(locales, duplicateData.description, this.description);
		}

		return duplicateData
	}
}