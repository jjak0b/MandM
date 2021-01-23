import InputSceneComponent from "../InputSceneComponent.js";

export default class ComponentInput extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.props.type = 'type' in unparsed ? unparsed.type : null;
		this.props.min = 'min' in unparsed ? unparsed.min : null;
		this.props.max = 'max' in unparsed ? unparsed.max : null;
		this.props.step = 'step' in unparsed ? unparsed.step : null;
		this.props.extremes = 'extremes' in unparsed ? unparsed.extremes : false;
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

		return Object.setPrototypeOf( duplicate, ComponentInput.prototype );
	}
}