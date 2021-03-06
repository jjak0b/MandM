import Disposable from "../Disposable.js";
import {Asset} from "../Asset.js";
import StylePropertyURI from "./StyleProperties/StylePropertyURI.js";


export default class StyleProperty extends Disposable {

	constructor(unparsed) {
		super(unparsed);
		this.name = unparsed.name;
		this.values = unparsed.values || [];
		for (let i = 0; i < this.values.length; i++) {
			if( this.values[i] && typeof this.values[i] !== "string" ) {
				this.values[i] = new StylePropertyURI( this.values[i] );
			}
		}
		this.config = unparsed.config;
	}

	toString() {
		let string = this.name + ": ";

		let propertyData = this.config;

		let separator = " ";
		let wrapper = null;
		if( propertyData ) {
			separator = propertyData.separator || separator;
			wrapper = propertyData.wrapper || wrapper;
		}

		let values = this.values.filter( ( val ) => val ); // get only truthy, not undefined or null values

		if( values.length > 0 ) {
			if( wrapper ) {
				for( let i = 0; i < values.length; i++ ) {
					values[i] = wrapper + values[i] + wrapper;
				}
			}
			string += values.join( separator );
		}

		return string;
	}

	dispose(params) {
		for (let i = 0; i < this.values.length; i++) {
			if( this.values[ i ] && this.values[ i ] instanceof Asset ) {
				this.values[ i ].dispose(params);
			}
		}
		super.dispose(params);
	}
}