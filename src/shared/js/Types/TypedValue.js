export class TypedValue {
	constructor( unparsed  = { type: null, value : null} ) {
		this.type = unparsed ? unparsed.type : null;
		this.value = unparsed ? unparsed.value : null;
	}

	equals( typedValue ) {
		if( typedValue instanceof TypedValue ) {
			return this.type === typedValue.type && this.value === typedValue.value;
		}
		return false;
	}

	toString() {
		return "" + this.value;
	}

	isType( type ) {
		if (type && this.type)
			return type === this.type;
		return false;
	}
}