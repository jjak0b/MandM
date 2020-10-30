import ActivityNode from "./ActivityNodes/ActivityNode.js";

export default class NodeParser {
	static nodeConstructors = {}

	constructor() {
	}

	static register(type, _constructor) {
		NodeParser.nodeConstructors[ type ] = _constructor;
	}

	static parse( unparsedNode ) {
		let type = unparsedNode.type;
		if( type && (type in NodeParser.nodeConstructors ) ) {
			return new NodeParser.nodeConstructors[ type ]( unparsedNode );
		}
		console.warn( "[NodeParser] Missing constructor for type", type, unparsedNode );
		return unparsedNode;
	}

}