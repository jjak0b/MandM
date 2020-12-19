export default class Time {

	constructor(unparsed) {
		this.value = [
			unparsed && unparsed.value ? unparsed.value[ 0 ] : null, // hours
			unparsed && unparsed.value ? unparsed.value[ 1 ] : null, // minutes
			unparsed && unparsed.value ? unparsed.value[ 2 ] : null// seconds
		];
		this._parse( unparsed );
	}

	toString() {
		this.value.join(":");
	}

	/**
	 *
	 * @param stringOrUnparsedValue {String|Object}
	 * @private
	 */
	_parse( stringOrUnparsedValue ) {
		/**
		 *
		 * @type {String[] | Number[]}
		 */
		let parts = null;
		if( stringOrUnparsedValue instanceof String ) {
			parts = stringOrUnparsedValue.split( ":");
			for (let i = 0; i < parts.length; i++) {
				parts[i] = Number.parseInt( parts[ i ] );
			}
		}
		else {
			/**
			 * @type Array
			 */
			parts = stringOrUnparsedValue.value
		}

		if( parts.length === 3 ) {
			for (let i = 0; i < parts.length; i++) {
				this.value[ i ] = parts[ i ];
			}
			return this;
		}
		return null;
	}

	equals( that ) {
		let isEq = true;
		for (let i = 0; i < this.value.length; i++) {
			isEq = isEq && this.value[ i ] === that.value[ i ];
		}
		return isEq;
	}

	getElapsedSeconds() {
		return (this.value[ 0 ] * 3600)  +  (this.value[ 1 ] * 60) + this.value[ 2 ];
	}

	/**
	 *
	 * @param that {Time}
	 */
	compare( that ) {
		let selfSeconds = this.getElapsedSeconds();
		let thatSeconds = that.getElapsedSeconds();
		return selfSeconds - thatSeconds;
	}
}