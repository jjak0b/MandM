import {Asset} from "../../Asset.js";

export default class StylePropertyURI extends Asset {
	constructor( unparsed ) {
		super(unparsed, null, null );
	}

	toString() {
		return `url("${this.getURL()}")`;
	}
}

StylePropertyURI.registerSubClass( StylePropertyURI.name, Asset.name );
