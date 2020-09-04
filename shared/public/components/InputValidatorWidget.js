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
	mounted(){
		let fakeEvent = {
			target: this.$refs.input
		}
		this.onInput( fakeEvent );
	},
	methods:{
		onInput(event){
			this.value = event.target.value;
			let AreConstraintsValid = true;
			if( event.target.reportValidity ){
				AreConstraintsValid = event.target.reportValidity();
			}

			let eventToCheck = {
				value : event.target.value,
				message: null,
				label: null,
				symbol: null
			}

			let callback = this.isValidCallback;
			this.statusValue = callback ? callback( eventToCheck ) : null;
			// warning is a valid value but user is informed of this state
			if( AreConstraintsValid && this.statusValue >= 0 ){
				this.$emit( "valid", event.target.value );
			}
			else if( this.$refs.input) {
				this.$emit( "invalid", event.target.value );
			}
			this.updateView( eventToCheck );
		},
		updateView( data ) {
			switch ( this.statusValue ) {
				case InputValidityStates.Ok:
					this.statusLabel = data.label || "shared.label-ok";
					this.statusSymbol = data.symbol || "&check;"
					this.labelClass = [ "text-success" ];
					this.messageClass = [ "alert", "alert-success" ];
					break;
				case InputValidityStates.Warning:
					this.statusLabel = data.label || "shared.label-warning";
					this.statusSymbol = data.symbol || "&excl;"
					this.labelClass = [ "text-warning" ];
					this.messageClass = [ "alert","alert-warning" ];
					break;
				case InputValidityStates.Error:
					this.statusLabel = data.label || "shared.label-error";
					this.statusSymbol = data.symbol || "&#9747;"
					this.labelClass = [ "text-danger" ];
					this.messageClass = [ "alert","alert-danger" ];
					break;
				default:
					this.statusLabel = data.label;
					this.statusSymbol = data.symbol;
					this.labelClass = null;
					this.messageClass = null;

			}
			this.statusMessageContent = data.message;
		}
	}

}