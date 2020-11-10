import SceneComponent from "../SceneComponent.js";
import {Asset} from "../../Asset.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";
import Mission from "../../Mission.js";

export default class ComponentText extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);
	}

	duplicate( locales, activityCategory ) {
		let duplicateComponent = new ComponentText(JSON.parse(JSON.stringify(this)));
		let localeLabel = activityCategory + '.component.' + I18nUtils.getUniqueID();
		duplicateComponent.i18nCategory = localeLabel;
		Mission.duplicateCallback( locales, duplicateComponent.i18nCategory, this.i18nCategory );

		return duplicateComponent;
	}
}