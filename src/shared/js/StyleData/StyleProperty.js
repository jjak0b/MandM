import Disposable from "../Disposable.js";

export default class StyleProperty extends Disposable {

	constructor(unparsed) {
		super(unparsed);
		this.name = unparsed.name;
		this.values = unparsed.values || [];
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
}