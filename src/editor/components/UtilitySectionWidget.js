import {template} from "./UtilitySectionWidgetTemplate.js";
import {component as qrCodeGeneratorWidget} from "./UtilitySectionWidgets/QrCodeGeneratorWidget.js";

export const component = {
	template,
	props: {
		value: Object,
	},
	components: {
		"qr-code-generator-widget": qrCodeGeneratorWidget
	}
}