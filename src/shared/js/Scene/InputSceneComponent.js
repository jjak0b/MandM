import SceneComponent from "./SceneComponent.js";

export default class InputSceneComponent extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.props.name = (!unparsed.props || !unparsed.props.name) ? null : unparsed.props.name;
	}

	duplicate(i18nCategoryPrefix) {
		let duplicate = super.duplicate(i18nCategoryPrefix);
		duplicate.props.name = this.props.name ? "" + this.props.name : null;
		return Object.setPrototypeOf( duplicate, InputSceneComponent );
	}
}