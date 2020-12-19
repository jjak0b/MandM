import ActivityData from "./ActivityData.js";
import Time from "../../Types/Time.js"
import {BranchCondition} from "../../Branch/BranchCondition.js";

export default class ActivityDataBranch extends ActivityData {

	static _functions = {
		isDefined: { // presence of value
			arguments: [
				{
					name: "this",
					accepts: [
						String.name,
						Number.name,
						Array.name,
						Date.name,
						Time.name
					]
				}
			],
			implementation: this.isDefined
		},
		equals: { // equality
			arguments: [
				{
					name: "this",
					accepts: [
						String.name,
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "that",
					accepts: [
						String.name,
						Number.name,
						Date.name,
						Time.name
					]
				}
			],
			implementation: this.equals
		},
		isInRange: { // check value in range
			arguments: [
				{
					name: "this",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "min",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "max",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				}
			],
			implementation: this.isInRange
		},
		isAny: { // check value is in a set of values
			arguments: [
				{
					name: "this",
					accepts: [
						String.name,
						Number.name,
						Array.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "elements",
					accepts: [
						Array.name,
					]
				}
			],
			implementation: this.isAny
		},
		isGreaterThan: { // check value in range
			arguments: [
				{
					name: "this",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "that",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
			],
			implementation: this.isGreaterThan
		},
		isLessThan: { // check value in range
			arguments: [
				{
					name: "this",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
				{
					name: "that",
					accepts: [
						Number.name,
						Date.name,
						Time.name
					]
				},
			],
			implementation: this.isLessThan
		},
	}

	static _variables = [
		"userInput",
		"score"
	]

	constructor(unparsed) {
		super(unparsed);

		this.condition = new BranchCondition( unparsed ? unparsed.condition : null );
	}

	static isDefined( self ) {
		return !!self && !!self.value;
	}

	/**
	 *
	 * @param self {TypedValue}
	 * @param that {TypedValue}
	 */
	static equals( self, that ) {
		let isEquals = self.equals( that );
		if( !isEquals && self.type === that.type ) {
			switch (that.type) {
				case String.name:
				case Number.name:
				case Date.name:
					isEquals = self.value === that.value;
					break;
				case Time.name:
					isEquals = new Time( that ).equals( self );
					break;
				case Array.name:
					if( self.value.length === that.value.length ) {
						for (let i = 0; i < that.value.length; i++) {
							isEquals = isEquals && that.value[ i ].equals ? that.value[ i ].equals( self.value[ i ] ) : that.value[ i ] === self.value[ i ];
						}
					}
					else {
						isEquals = false;
					}
					break;
				default:
					isEquals = that.value == self.value;
					break;
			}
		}

		return isEquals;
	}

	/**
	 *
	 * @param self {TypedValue}
	 * @param that0 {TypedValue}
	 * @param that1 {TypedValue}
	 * @returns {boolean}
	 */
	static isInRange( self, that0, that1 ) {
		let isInRng = false;
		if( self.type === that0.type && self.type !== that1.type ) {
			let min, max;
			switch (self.type) {
				case Number.name:
				case Date.name:
					if (that0.value > that1.value) {
						max = that0;
						min = that1;
					}
					else {
						max = that1;
						min = that0;
					}
					isInRng = min.value <= self.value && self.value <= max.value;
					break;
				case Time.name:
					let that0Time = new Time(that0.value);
					let that1Time = new Time(that1.value);
					let selfTime = new Time(self.value);
					if (that0Time.compare(that1Time) > 0) {
						max = that0Time;
						min = that1Time;
					}
					else {
						max = that1Time;
						min = that0Time;
					}

					isInRng = 0 <= selfTime.compare(min) && max.compare(selfTime) >= 0;
					break;
			}
		}
		return isInRng;
	}

	/**
	 *
	 * @param self
	 * @param {TypedValue[]}
	 */
	static isAny( self, typedArray ) {
		return typedArray.some( (typedValue) => this.equals( self, typedValue ) );
	}

	static isGreaterThan(self, that) {
		let isGt = false;
		if( self.type === that.type ) {
			let parsedSelf = this.parseTypedValue( self );
			let parsedThat = this.parseTypedValue( that );
			try {
				if( parsedSelf.compare ) {
					isGt = parsedSelf.compare( that ) > 0;
				}
				else {
					isGt = parsedSelf > parsedThat;
				}
			}
			catch (e) {
				console.warn( `[${ActivityDataBranch.name}]`, "Catch unallowed operation", "isGreaterThan", self, that, e );
			}
		}
		return isGt;
	}
	static isLessThan(self, that) {
		let isLt = false;
		if( self.type === that.type ) {
			let parsedSelf = this.parseTypedValue( self );
			let parsedThat = this.parseTypedValue( that );
			try {
				if( parsedSelf.compare ) {
					isLt = parsedSelf.compare( that ) < 0;
				}
				else {
					isLt = parsedSelf < parsedThat;
				}
			}
			catch (e) {
				console.warn( `[${ActivityDataBranch.name}]`, "Catch unallowed operation", "isGreaterThan", self, that, e );
			}
		}
		return isLt;
	}
	/**
	 *
	 * @param value {TypedValue}
	 */
	static parseTypedValue( typedValue ) {
		if( typedValue.type === Time.name ) {
			return new Time( typedValue.value );
		}
		else if ( typedValue.type === Date.name ) {
			return new Date( typedValue.value );
		}
		else {
			return typedValue.value;
		}
	}

	/**
	 *
	 * @param envVariable {[]}
	 * @returns {boolean|null|undefined}
	 */
	check( envVariable ) {
		if( this.condition.function in ActivityDataBranch._functions ) {
			let funcData = ActivityDataBranch._functions[ this.condition.function ];
			if( funcData.implementation ) {
				return this.condition.run( funcData.implementation, envVariable );
			}
		}
		else {
			console.error(`[${this.constructor.name}]`, `Detected Unsupported function named "${this.condition.function}"`, this );
		}
		return null;
	}
}