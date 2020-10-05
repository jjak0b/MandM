import { template } from "./AssetsManagerWidgetTemplate.js";
import { component as assetManagerBrowser } from "./AssetsManagerWidgets/AssetsManagerBrowserWidget.js";

export const component = {
	template: template,
	components: {
		"assets-manager-browser": assetManagerBrowser
	},
	props: {
		currentStory: Object
	},
	data() {
		return {

		}
	},
	methods: {

	}
};