import InputSceneComponent from "../InputSceneComponent.js";

export default class ComponentInput extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.props.type = 'type' in unparsed ? unparsed.props.type : null;
		this.props.min = 'min' in unparsed ? unparsed.props.min : null;
		this.props.max = 'max' in unparsed ? unparsed.props.max : null;
		this.props.step = 'step' in unparsed ? unparsed.props.step : null;
		this.props.extremes = 'extremes' in unparsed ? unparsed.props.extremes : false;
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