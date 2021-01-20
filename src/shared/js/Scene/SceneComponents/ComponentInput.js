import InputSceneComponent from "../InputSceneComponent.js";

export default class ComponentInput extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);
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