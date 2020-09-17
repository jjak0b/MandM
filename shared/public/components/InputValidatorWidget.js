import { template } from "./InputValidatorWidgetTemplate.js";
export const InputValidityStates = {
	Error: -1,
	Ok: 0,
	Warning: 1
};
export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		value: String,
		isValidCallback: Function
	},
	data() {
		return {
			ValidityStates: InputValidityStates,
			statusValue: null,
			statusLabel: "",
			statusSymbol: "",
			statusMessageContent: null,
			labelClass: null,
			messageClass: null
		};
	},
	computed: {
		inputListeners: function () {
			let self = this;
			// `Object.assign` merges objects together to form a new object
			return Object.assign({},
				// We add all the listeners from the parent
				this.$listeners,
				// Then we can add custom listeners or override the
				// behavior of some listeners.
				{
					// This ensures that the component works with v-model
					input: function (event) {
						self.$emit('input', event.target.value);
					}
				}
			)
		},
		hasDescription: function () {
			return this.statusMessageContent || this.statusValue != null;
		}
	},
	watch: {
		"value": function (newVal) {
			let fakeEvent = {
				target: this.$refs.input
			}
			this.onInput( fakeEvent );
		}
	},
	methods:{
		onInput(event){
			this.value = event.target.value;
			let AreConstraintsValid = true;
			if( event.target ){
				event.target.setCustomValidity(""); // unset custom validity
				if( event.target.reportValidity ){
					AreConstraintsValid = event.target.reportValidity();
				}
			}

			let eventToCheck = {
				target: event.target,
				value : event.target.value,
				i18nMessage: null,
				i18nLabel: null,
				symbol: null
			}

			let callback = this.isValidCallback;
			// check first constraints with browser and then check callback
			let isValid = AreConstraintsValid;
			if( isValid ){
				this.statusValue = callback ? callback( eventToCheck ) : null;
				// warning is a valid value but user is informed of this state
				// null and so 0 is a valid state
				isValid = this.statusValue >= InputValidityStates.Ok;
			}
			else{
				this.statusValue = InputValidityStates.Error;
			}

			if( isValid ){
				this.$emit( "valid", event.target.value );
			}
			// the value is not valid
			else {
				// only callback returned invalid state
				if( AreConstraintsValid && this.statusValue < 0 ) {
					// so check if custom message is set
					if( eventToCheck.i18nMessage ){
						event.target.setCustomValidity( eventToCheck.i18nMessage );
					}
					// else we must force notify browser is invalid with a generic error message
					else {
						event.target.setCustomValidity( this.$i18n.t( "shared.label-invalid" ) );
					}
				}
				this.$emit( "invalid", event.target.value );
			}
			this.updateView( eventToCheck );
		},
		updateView( data ) {
			switch ( this.statusValue ) {
				case InputValidityStates.Ok:
					this.statusLabel = data.i18nLabel || "shared.label-ok";
					this.statusSymbol = data.symbol || "&check;"
					this.labelClass = [ "text-success" ];
					this.messageClass = [ "alert", "alert-success" ];
					break;
				case InputValidityStates.Warning:
					this.statusLabel = data.i18nLabel || "shared.label-warning";
					this.statusSymbol = data.symbol || "&excl;"
					this.labelClass = [ "text-warning" ];
					this.messageClass = [ "alert","alert-warning" ];
					break;
				case InputValidityStates.Error:
					this.statusLabel = data.i18nLabel || "shared.label-invalid";
					this.statusSymbol = data.symbol || "&#9747;"
					this.labelClass = [ "text-danger" ];
					this.messageClass = [ "alert","alert-danger" ];
					break;
				default:
					this.statusLabel = data.i18nLabel;
					this.statusSymbol = data.symbol;
					this.labelClass = null;
					this.messageClass = [ "alert", "alert-info" ];

			}
			this.statusMessageContent = data.i18nMessage;
		}
	}

}