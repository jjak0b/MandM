import { template } from "./StyleLengthWidgetTemplate.js";

export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		value: {
			type: String,
			default: "initial"
		},
		defaultValues: {
			type: Array,
			default: []
		}
	},
	data() {
		let data = {
			units: {
				relatives: [
					"%",
					"vw",
					"vh",
					"vmin",
					"vmax",
					"em",
					"ex",
					"ch",
					"rem"
				],
				absolutes: [
					"pc",
					"pt",
					"px",
					"mm",
					"cm",
					"in"
				]
			},
			acceptedDefaultValues:[
				"initial",
				"inherit",
				"unset"
			],
			unitValue: null,
			unitName: null,
			isValueNumber: false,
			regExp: {}
		}
		return data;
	},
	watch: {
		value: function (newVal, oldVal) {
			if( newVal ){
				if( this.regExp["valid"].test( newVal ) ) {
					let value = newVal.match( this.regExp["defaultValues"]);
					let unit = null;
					if( !value ){
						value = newVal.match( this.regExp["numericValue"]);
						if( value ){
							unit = newVal.match( this.regExp["relatives"] );
							if( !unit ) {
								unit = newVal.match( this.regExp["absolutes"]);
							}
						}
					}
					if( value ) this.unitValue = value[0];
					if( unit ) this.unitName = unit[0];
				}
				else {
					console.warn( "[StyleLength]", "invalid value received", newVal );
				}
			}
		},
		unitValue: function (newVal) {
			this.notifyValue();
		},
		unitName: function (newVal) {
			this.notifyValue();
		}
	},
	beforeMount() {
		let strRegexRelatives = this.units.relatives.join("|");
		this.regExp["relatives"] = new RegExp( strRegexRelatives, "i" );

		let strRegexAbsolutes = this.units.absolutes.join("|")
		this.regExp["absolutes"] = new RegExp( strRegexAbsolutes, "i" );

		if( this.defaultValues ) {
			this.defaultValues.forEach( (value, index) => {
				if( !this.acceptedDefaultValues.includes( value ) ) {
					this.acceptedDefaultValues.push( value )
				}
			});
		}
		let strRegexValues = this.acceptedDefaultValues.join("|")
		this.regExp["defaultValues"] = new RegExp( strRegexValues, "i" );

		this.regExp["numericValue"] = new RegExp( `[0-9]*`, "i" );

		let valid = `([0-9]* (${strRegexRelatives}|${strRegexAbsolutes}))|(${strRegexValues})`;
		this.regExp["valid"] = new RegExp( valid, "i" );

	},
	methods: {
		notifyValue() {
			let value = this.unitValue;
			let parsedNumber = Number.parseFloat( value );
			if( isNaN( parsedNumber ) ) {
				this.isValueNumber = false;
				if( this.acceptedDefaultValues.includes( value ) ) {
					this.$emit( "input", value );
				}
			}
			else{
				this.isValueNumber = true;
				if( this.unitName ) {
					this.$emit( "input", value + " " + this.unitName );
				}
			}
		}
	}
}