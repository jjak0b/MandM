export default class SceneComponentParser {
	static constructors = {}

	constructor() {
	}

	static register(type, _constructor) {
		SceneComponentParser.constructors[ type ] = _constructor;
		console.log( "type", type, "cons", _constructor );
	}

	static parse( unparsedComponent ) {
		let type = unparsedComponent.name;
		if( type && (type in SceneComponentParser.constructors ) ) {
			return new SceneComponentParser.constructors[ type ]( unparsedComponent );
		}
		console.warn( "[SceneComponentParser] Missing constructor for type", type);
		return unparsedComponent;
	}

}