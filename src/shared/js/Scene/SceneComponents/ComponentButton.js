import InputSceneComponent from "../InputSceneComponent.js";
import {TypedValue} from "../../Types/TypedValue.js";

export default class ComponentButton extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.value = new TypedValue( unparsed.value || {} );
		this.props.type = 'type' in unparsed.props ? unparsed.props.type : 'button';
		this.props.size = 'size' in unparsed.props ? unparsed.props.size : null;
		this.props.variant = 'variant' in unparsed.props ? unparsed.props.variant : null;
		this.props.shape = 'shape' in unparsed.props ? unparsed.props.shape : null;
		this.props.disabled = 'disabled' in unparsed.props ? unparsed.props.disabled : false;

	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );

		// used for label
		locales.push(
				[
					this.i18nCategory,
					duplicate.i18nCategory
				]
		);

		return Object.setPrototypeOf( duplicate, ComponentButton.prototype );
	}
}