import SceneComponent from "../SceneComponent.js";
import {Asset} from "../../Asset.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";
import Mission from "../../Mission.js";

export default class ComponentList extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);
	}

	duplicate( locales, activityCategory ) {
		let duplicateComponent = new ComponentList(JSON.parse(JSON.stringify(this)));
		let localeLabel;
		if (this.props.options) {
			for (const index in this.props.options) {
				localeLabel = activityCategory + '.component.' + I18nUtils.getUniqueID() + '.element.' + I18nUtils.getUniqueID();
				duplicateComponent.props.options[index] = localeLabel;
				Mission.duplicateCallback( locales, duplicateComponent.props.options[index], this.props.options[index] );
			}
		}
		return duplicateComponent;
	}
}