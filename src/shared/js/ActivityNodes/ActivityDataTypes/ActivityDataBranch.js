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
			implementation: ActivityDataBranch.isDefined
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
			implementation: ActivityDataBranch.equals
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
			implementation: ActivityDataBranch.isInRange
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
			implementation: ActivityDataBranch.isAny
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
			implementation: ActivityDataBranch.isGreaterThan
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
			implementation: ActivityDataBranch.isLessThan
		},
	}

	// default system env variable names
	static _variables = [
		"score"
	]

	constructor(unparsed) {
		super(unparsed);

		this.condition = new BranchCondition( unparsed ? unparsed.condition : null );
	}

	duplicate(locales, activityCategory) {
		let duplicate = super.duplicate(locales, activityCategory);
		duplicate.condition = new BranchCondition( this.condition ? JSON.parse( JSON.stringify( this.condition ) ) : null );
		return Object.setPrototypeOf( duplicate, ActivityDataBranch.prototype );
	}

	static isDefined( self ) {
		return self && self.type && (self.value != undefined && self.value != null);
	}

	/**
	 *
	 * @param self {TypedValue}
	 * @param that {TypedValue}
	 */
	static equals( self, that ) {
		let isEquals = self && that && self.equals( that );
		if( !isEquals && self && that && self.type === that.type ) {
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
		if( ActivityDataBranch.isDefined( self ) && ActivityDataBranch.isDefined( that0 ) && ActivityDataBranch.isDefined( that1 ) ) {
			let min, max;

			let selfValue = self.toNumber();
			let that0Value = that0.toNumber();
			let that1Value = that1.toNumber();

			if( selfValue != null && that0Value != null && that1Value != null ) {
				if (that0Value > that1Value) {
					max = that0Value;
					min = that1Value;
				}
				else {
					max = that1Value;
					min = that0Value;
				}

				return min <= selfValue && selfValue <= max;
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
		return ActivityDataBranch.isDefined( self )
			&& ActivityDataBranch.isDefined( typedArray )
			&& typedArray.isType( Array.name )
			&& typedArray.value.some( (typedValue) => ActivityDataBranch.equals( self, typedValue ) );
	}

	static isGreaterThan(self, that) {
		let isGt = false;
		if( ActivityDataBranch.isDefined( self ) && ActivityDataBranch.isDefined( that ) ) {
			let parsedSelf = self.toNumber();
			let parsedThat = that.toNumber();
			if( parsedSelf != null && parsedThat != null ) {
				isGt = parsedSelf > parsedThat;
			}
		}
		return isGt;
	}
	static isLessThan(self, that) {
		let isLt = false;
		if( ActivityDataBranch.isDefined( self ) && ActivityDataBranch.isDefined( that ) ) {
			let parsedSelf = self.toNumber();
			let parsedThat = that.toNumber();
			if( parsedSelf != null && parsedThat != null ) {
				isLt = parsedSelf < parsedThat;
			}
		}
		return isLt;
	}

	/**
	 *
	 * @param envVariable {Object}
	 * @returns {boolean|null|undefined}
	 */
	check( envVariable ) {
		if( this.condition.function in ActivityDataBranch._functions ) {
			console.log( `[${this.constructor.name}]`, "running condition function", this.condition.function, "in", this.condition );
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