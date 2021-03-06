import InputSceneComponent from "../InputSceneComponent.js";
import {I18nUtils} from "../../I18nUtils.js";
import {TypedValue} from "../../Types/TypedValue.js";

export default class ComponentList extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);
		this.props.type = 'type' in unparsed.props ? unparsed.props.type : null;
		this.props.options = unparsed.props && unparsed.props.options ? unparsed.props.options : [];
		for (const option of this.props.options) {
			option.value = new TypedValue( option.value );
		}
	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );

		duplicate.props.type = this.props.type;

		if (this.props.options) {
			duplicate.props.options = new Array( this.props.options.length );
			for (let index = 0; index < this.props.options.length; index++){
				duplicate.props.options[ index ] = {
					value: new TypedValue( JSON.parse( JSON.stringify( this.props.options[ index ].value ) ) ),
					title: duplicate.i18nCategory + '.element.' + I18nUtils.getUniqueID()
				};
				locales.push([
					this.props.options[ index ].title,
					duplicate.props.options[ index ].title
				]);
			}
		}
		return Object.setPrototypeOf( duplicate, ComponentList.prototype );
	}
}