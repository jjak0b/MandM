import SceneComponent from "../SceneComponent.js";

export default class ComponentText extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);
	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );

		locales.push(
			[
				this.i18nCategory,
				duplicate.i18nCategory
			]
		);

		return Object.setPrototypeOf( duplicate, ComponentText.prototype );
	}
}