import {template} from "./StylesheetAssetTemplate.js";
import {component as assetManagerBrowser} from "../AssetsManagerWidgets/AssetsManagerBrowserWidget.js";
import {Asset} from "../../../shared/js/Asset.js";

export const component = {
	template: template,
	components: {
		"assets-manager-browser": assetManagerBrowser,
	},
	props: {
		value: Asset
	},
	data() {
		return {
			tempAsset: null
		}
	},
	watch: {
		"value": function (v) {
			console.log(v);
		},
		"tempAsset" : function (asset, prevAsset ) {
			let shouldAddAsset = !!asset;

			if( this.value ) {
				if( !shouldAddAsset || !asset.equals( this.value ) ) {
					this.value.dispose();
					if( !shouldAddAsset )
						this.$emit('input', null );
				}
				else {
					shouldAddAsset = false;
				}
			}

			if( shouldAddAsset ) {
				this.$emit('input', asset );
				this.$root.$emit( "add-dependency", asset );
			}
		},
	},
	methods: {
		clearAsset() {
			this.tempAsset = null;
			if( this.value.asset ) this.value.asset.dispose();
			// this.$set( this.value, "asset", null );
			this.$emit('input', null );
		}
	}
}