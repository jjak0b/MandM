import {template} from "./AssetsManagerRemoteEditFormTemplate.js";
import {component as assetManagerBrowser} from "./AssetsManagerBrowserWidget.js";

export const component = {
	template: template,
	components: {
		"assets-manager-browser": assetManagerBrowser
	},
	props: {

	},
	data() {
		return {
			validity: {
				state: null,
				feedback: {
					valid: null,
					invalid: null
				}
			},
			selectedAsset: null,
			options: null,
			assets: []
		}
	},
	watch: {
		selectedAsset: function (asset) {
			this.options = null;
			let self = this;
			$.ajax(asset.getURL(), {method: "options"})
				.done(function (data, textStatus, request) {
					self.options = request.getResponseHeader('Allow').split(',');
					console.log(self.options);
				})
				.fail(function () {

				});
		}
	}
};