import I18nCategorized from "../I18nCategorized.js";
import SceneComponentProps from "./SceneComponents/SceneComponentProps.js";


export default class SceneComponent extends I18nCategorized{
	constructor(unparsedComponent) {
		super(unparsedComponent);
		this.name = unparsedComponent.name;
		this.props = new SceneComponentProps( unparsedComponent.props );
		this.value = unparsedComponent.value || null;
		this.getOptionsCallback = null;
	}

	set options( _options ) {
		this.getOptionsCallback = () => _options;
	}
	get options() {
		if( this.getOptionsCallback ){
			return this.getOptionsCallback();
		}
		return null;
	}

	setValue( value ) {
		this.value = value;
	}

	getValue() {
		return this.value;
	}

	setProps( value ) {
		this.props = value;
	}

	getProps() {
		return this.props;
	}

	dispose( params ) {
		this.props.dispose( params );
		super.dispose( params );
	}

	duplicate( i18nCategoryPrefix ) {
		let duplicate = Object.assign(
			super.duplicate( i18nCategoryPrefix +  '.component' ),
			{
				name: new String( this.name ),
				value: this.value ? JSON.parse( JSON.stringify( this.value ) ) : this.value,
				props: this.props.duplicate()
			}
		);
		return new SceneComponent( duplicate );
	}
}