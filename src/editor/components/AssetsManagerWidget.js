import { template } from "./AssetsManagerWidgetTemplate.js";
import { component as assetManagerBrowser } from "./AssetsManagerWidgets/AssetsManagerBrowserWidget.js";
import { component as assetManagerLocale } from "./AssetsManagerWidgets/AssetsManagerLocaleWidget.js";
import { component as assetManagerRemote } from "./AssetsManagerWidgets/AssetsManagerRemoteWidget.js";

export const component = {
	template: template,
	components: {
		"assets-manager-locale": assetManagerLocale,
		"assets-manager-remote": assetManagerRemote
	},
	props: {
		currentStory: Object
	}
};