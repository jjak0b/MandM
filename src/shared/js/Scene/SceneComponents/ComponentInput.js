import InputSceneComponent from "../InputSceneComponent.js";

export default class ComponentInput extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.type = 'type' in unparsed ? unparsed.type : null;
		this.min = 'min' in unparsed ? unparsed.min : null;
		this.max = 'max' in unparsed ? unparsed.max : null;
		this.step = 'step' in unparsed ? unparsed.step : null;
		this.extremes = 'extremes' in unparsed ? unparsed.extremes : false;
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