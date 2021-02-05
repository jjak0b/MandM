import InputSceneComponent from "../InputSceneComponent.js";
import {TypedValue} from "../../Types/TypedValue.js";

export default class ComponentInput extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);


		this.props.type = 'type' in unparsed.props ? unparsed.props.type : null;
		this.props.min = 'min' in unparsed.props ? unparsed.props.min : null;
		this.props.max = 'max' in unparsed.props ? unparsed.props.max : null;
		this.props.step = 'step' in unparsed.props ? unparsed.props.step : null;
		this.props.extremes = 'extremes' in unparsed.props ? unparsed.props.extremes : null;
	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );

		duplicate.value = new TypedValue({} );
		duplicate.props.type = this.props.type;
		duplicate.props.min = this.props.min;
		duplicate.props.max = this.props.max;
		duplicate.props.step = this.props.step;
		duplicate.props.extremes = this.props.extremes;

		// used for label
		locales.push(
			[
				this.i18nCategory,
				duplicate.i18nCategory
			]
		);

		return Object.setPrototypeOf( duplicate, ComponentInput.prototype );
	}
}