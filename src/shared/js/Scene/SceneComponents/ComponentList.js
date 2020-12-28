import SceneComponent from "../SceneComponent.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";
import Mission from "../../Mission.js";
import {TypedValue} from "../../Types/TypedValue.js";

export default class ComponentList extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);
		this.props.options = unparsed.props && unparsed.props.options ? unparsed.props.options : [];
		for (const option of this.props.options) {
			option.value = new TypedValue( option.value );
		}
	}

	duplicate( locales, activityCategory ) {
		let duplicateComponent = new ComponentList(JSON.parse(JSON.stringify(this)));
		let localeLabel;
		if (this.props.options) {
			for (const index in this.props.options) {
				localeLabel = activityCategory + '.component.' + I18nUtils.getUniqueID() + '.element.' + I18nUtils.getUniqueID();
				duplicateComponent.props.options[index].title = localeLabel;
				Mission.duplicateCallback( locales, duplicateComponent.props.options[index].title, this.props.options[index].title );
			}
		}
		return duplicateComponent;
	}
}