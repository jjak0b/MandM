import InputSceneComponent from "../InputSceneComponent.js";
import {TypedValue} from "../../Types/TypedValue.js";

export default class ComponentTime extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);


		this.props.data = 'data' in unparsed.props ? unparsed.props.data : {};
		this.props.data.showSeconds = 'data' in unparsed.props && 'showSeconds' in unparsed.props.data ? unparsed.props.data.showSeconds : null;
		this.props.data.nowButton = 'data' in unparsed.props && 'nowButton' in unparsed.props.data ? unparsed.props.data.nowButton : null;
		this.props.data.resetButton = 'data' in unparsed.props && 'resetButton' in unparsed.props.data ? unparsed.props.data.resetButton : null;

	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );

		duplicate.value = this.value;
		duplicate.props.data = this.props.data;

		// used for label
		locales.push(
				[
					this.i18nCategory,
					duplicate.i18nCategory
				]
		);

		return Object.setPrototypeOf( duplicate, ComponentTime.prototype );
	}

}