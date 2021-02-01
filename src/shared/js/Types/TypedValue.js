import Time from "./Time.js";

export class TypedValue {
	constructor( unparsed  = { type: null, value : null} ) {
		this.type = unparsed ? unparsed.type : null;
		this.value = unparsed ? unparsed.value : null;

		if( this.isType( Array.name ) ) {
			if( this.value ) {
				for (let i = 0; i < this.value.length; i++) {
					this.value[ i ] = new TypedValue( this.value[ i ] );
				}
			}
		}
		else if( this.isType( Number.name ) ) {
			this.value = "string" === typeof this.value ? parseFloat( this.value ) : this.value;
		}
	}

	equals( typedValue ) {
		if( typedValue instanceof TypedValue ) {
			return this.type === typedValue.type && this.value === typedValue.value;
		}
		return false;
	}

	toString() {
		return this.value ? this.value.toString() : "";
	}

	isType( type ) {
		if (type && this.type)
			return type === this.type;
		return false;
	}

	toNumber() {
		if( this.type && (this.value != undefined && this.value != null ) ) {
			if (this.isType(Number.name)) {
				return this.value;
			}
			else if (this.isType(Time.name)) {
				return new Time(this.value).toNumber();
			}
			else if (this.isType(Date.name)) {
				return new Date(this.value).getTime();
			}
		}
		return null;
	}
}