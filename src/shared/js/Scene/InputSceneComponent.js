import SceneComponent from "./SceneComponent.js";
import {TypedValue} from "../Types/TypedValue.js";

export default class InputSceneComponent extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.props.name = (!unparsed.props || !unparsed.props.name) ? null : unparsed.props.name;
		this.value = new TypedValue( {} );
	}

	duplicate(i18nCategoryPrefix) {
		let duplicate = super.duplicate(i18nCategoryPrefix);
		duplicate.props.name = this.props.name ? "" + this.props.name : null;
		duplicate.value = new TypedValue( {} );
		return Object.setPrototypeOf( duplicate, InputSceneComponent );
	}
}