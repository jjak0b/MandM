import {template} from "./UserWidgetViewportTemplate.js";
import SceneComponent from "../js/Scene/SceneComponent.js";
import {component as buttonComponent} from "./UserWidgetButton.js";
import {component as listComponent} from "./UserWidgetList.js";
import {component as inputComponent} from "./UserWidgetInput.js";
import {component as spinbuttonComponent} from "./UserWidgetSpinbutton.js";
import {component as datepickerComponent} from "./UserWidgetDatepicker.js";
import {asyncLoad as asyncLoadComponentI18nMediaPlayer} from "./UserWidgetMediaPlayer.js";
import {component as textContentComponent} from "./UserWidgetTextContent.js";
import {component as photoComponent} from "./UserWidgetPhoto.js";
import {component as qrDecoderComponent} from "./UserWidgetQrDecoder.js";
import {component as gridComponent } from "./UserWidgetGrid.js";
import SceneComponentParser from "../js/Scene/SceneComponentParser.js";
import ComponentMediaPlayer from "../js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ComponentText from "../js/Scene/SceneComponents/ComponentText.js";
import ComponentList from "../js/Scene/SceneComponents/ComponentList.js";
import ComponentGrid from "../js/Scene/SceneComponents/ComponentGrid.js";
import ComponentInput from "../js/Scene/SceneComponents/ComponentInput.js";
import ComponentButton from "../js/Scene/SceneComponents/ComponentButton.js";
import ComponentPhoto from "../js/Scene/SceneComponents/ComponentPhoto.js"
import ComponentQRDecoder from "../js/Scene/SceneComponents/ComponentQRDecoder.js";



SceneComponentParser.register( "user-widget-media-player", ComponentMediaPlayer );
SceneComponentParser.register( "user-widget-text-content", ComponentText );
SceneComponentParser.register( "user-widget-button", ComponentButton );
SceneComponentParser.register( "user-widget-text-input", ComponentInput );
SceneComponentParser.register( "user-widget-number-input", ComponentInput );
SceneComponentParser.register( "user-widget-range", ComponentInput );
SceneComponentParser.register( "user-widget-checkbox", ComponentList );
SceneComponentParser.register( "user-widget-radio", ComponentList );
SceneComponentParser.register( "user-widget-select", ComponentList );
SceneComponentParser.register( "user-widget-photo", ComponentPhoto );
SceneComponentParser.register( "user-widget-qr-decoder", ComponentQRDecoder );
SceneComponentParser.register( "user-widget-grid", ComponentGrid );

// circular dependency avoided with "user-widget-grid" using async component loading
export function component( resolve, reject ) {
	resolve({
		// inheritAttrs: false,
		template: template,
		components: {
			"user-widget-checkbox": listComponent,
			"user-widget-select": listComponent,
			"user-widget-radio": listComponent,
			"user-widget-button": buttonComponent,
			"user-widget-text-input": inputComponent,
			"user-widget-number-input": inputComponent,
			"user-widget-range": inputComponent,
			"user-widget-spinbutton": spinbuttonComponent,
			"user-widget-datepicker": datepickerComponent,
			"user-widget-media-player": asyncLoadComponentI18nMediaPlayer,
			"user-widget-text-content": textContentComponent,
			"user-widget-photo": photoComponent,
			"user-widget-qr-decoder": qrDecoderComponent,
			"user-widget-grid": gridComponent
		},
		props: {
			value: SceneComponent,
			tabindex: [Number,String],
			locale: String
		},
	})
}