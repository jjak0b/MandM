import { template } from "./InputValidatorWidgetTemplate.js";
export const InputValidityStates = {
	Error: -1,
	Ok: 0,
	Warning: 1
};
export const component = {
	template: template,
	props: {
		label: String,
		isValidCallback: Function,
		warningMessage: String,
		errorMessage: String
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
	methods:{
		onInput(event){
			let AreConstraintsValid = event.target.checkValidity();
			let validityState = 0;
			let eventToCheck = {
				value : event.target.value,
				message: null,
				label: null,
				symbol: null
			}

			let callback = this.isValidCallback;
			this.statusValue = callback ? callback( eventToCheck ) : null;
			this.updateView( eventToCheck );
			// warning is a valid value but user is informed of this state
			if( AreConstraintsValid && this.statusValue ){
				this.$emit( "valid", event );
			}
			else {
				this.$emit( "invalid", event );
			}
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