import {template} from "./StyleURIWidgetTemplate.js";
import {Asset} from "../../../shared/js/Asset.js";
import {component as assetManagerBrowser} from "../AssetsManagerWidgets/AssetsManagerBrowserWidget.js";
import StylePropertyURI from "../../../shared/js/StyleData/StyleProperties/StylePropertyURI.js";

export const component = {
	template: template,
	props: {
		value: StylePropertyURI,
		defaultValues: {
			type: Array,
			default: []
		}
	},
	components: {
		"assets-manager-browser": assetManagerBrowser
	},
	data() {
		return {
			acceptedDefaultValues: [
				"none",
				"inherit",
				"unset"
			],
			localValue: null,
			selectedAsset: null,
			valueInput: null
		}
	},
	watch: {
		"value": function (newVal ) {
			this.updateContext( newVal );
		}
	},
	created() {
		if( this.defaultValues ) {
			this.defaultValues.forEach( (value, index) => {
				if( !this.acceptedDefaultValues.includes( value ) ) {
					this.acceptedDefaultValues.push( value )
				}
			});
		}
		this.updateContext( this.value );
	},
	methods: {
		updateContext( newVal ) {
			if ( newVal instanceof Asset) {
				this.valueInput = newVal.toString();
				this.selectedAsset = newVal;
			}
			else {
				this.valueInput = newVal;
				this.selectedAsset = null;
			}
		},
		onInputAsset( value ) {
			if( this.value instanceof Asset ) {
				this.value.dispose();
			}
			this.$root.$emit("add-dependency", value );
			this.$emit( 'input', new StylePropertyURI( value ) );
		},
		onInputText( value ) {
			if( this.value instanceof Asset ) {
				this.value.dispose();
				this.$emit( 'input', null );
			}
			else {
				this.$emit( 'input', value );
			}
		}
	}
}