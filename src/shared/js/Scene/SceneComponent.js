import I18nCategorized from "../I18nCategorized.js";


export default class SceneComponent extends I18nCategorized{
	constructor(unparsedComponent) {
		super(unparsedComponent);
		this.name = unparsedComponent.name;
		this.props = unparsedComponent.props || {
			id: undefined,
			class: []
		};
		this.value = unparsedComponent.value || {};
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
		super.dispose( params );
	}
}