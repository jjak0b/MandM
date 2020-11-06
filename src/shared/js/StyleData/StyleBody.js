import Disposable from "../Disposable.js";
import StyleProperty from "./StyleProperty.js";

export default class StyleBody extends Disposable {
	constructor( unparsed ) {
		super( unparsed );

		this.properties = unparsed.properties || [];
		for (let i = 0; i < this.properties.length; i++) {
			this.properties[ i ] = new StyleProperty( unparsed.properties[ i ] );
		}
	}

	toString() {
		let body = "";
		this.properties.forEach( ( property, index ) => body += `\t${property};\n` );
		return body;
	}

	dispose(params) {
		for (let i = 0; i < this.properties.length; i++) {
			this.properties[ i ].dispose( params );
		}
		super.dispose(params);
	}
}