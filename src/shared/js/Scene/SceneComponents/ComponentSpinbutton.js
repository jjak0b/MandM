import InputSceneComponent from "../InputSceneComponent.js";
import {TypedValue} from "../../Types/TypedValue.js";

export default class ComponentSpinbutton extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.value = new TypedValue({} );
		this.props.data = 'data' in unparsed.props ? unparsed.props.data : {};
		this.props.data.wrap = 'data' in unparsed.props && 'wrap' in unparsed.props.data ? unparsed.props.data.wrap : null;
		this.props.data.step = 'data' in unparsed.props && 'step' in unparsed.props.data ? unparsed.props.data.step : null;
		this.props.data.min = 'data' in unparsed.props && 'min' in unparsed.props.data ? unparsed.props.data.min : null;
		this.props.data.max = 'data' in unparsed.props && 'max' in unparsed.props.data ? unparsed.props.data.max : null;
	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );

		duplicate.value = new TypedValue({} );
		duplicate.props.data = this.props.data;

		// used for label
		locales.push(
				[
					this.i18nCategory,
					duplicate.i18nCategory
				]
		);

		return Object.setPrototypeOf( duplicate, ComponentSpinbutton.prototype );
	}
}