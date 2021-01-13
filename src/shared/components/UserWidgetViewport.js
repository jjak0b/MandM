import {template} from "./UserWidgetViewportTemplate.js";
import SceneComponent from "../js/Scene/SceneComponent.js";
import {component as listComponent} from "./UserWidgetList.js";
import {component as textInputComponent} from "./UserWidgetTextInput.js";
import {component as numberInputComponent} from "./UserWidgetNumberInput.js";
import {component as rangeComponent} from "./UserWidgetRange.js";
import {component as spinbuttonComponent} from "./UserWidgetSpinbutton.js";
import {component as datepickerComponent} from "./UserWidgetDatepicker.js";
import {asyncLoad as asyncLoadComponentI18nMediaPlayer} from "./UserWidgetMediaPlayer.js";
import {component as textContentComponent} from "./UserWidgetTextContent.js";
import SceneComponentParser from "../js/Scene/SceneComponentParser.js";
import ComponentMediaPlayer from "../js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ComponentText from "../js/Scene/SceneComponents/ComponentText.js";
import ComponentList from "../js/Scene/SceneComponents/ComponentList.js";


SceneComponentParser.register( "user-widget-media-player", ComponentMediaPlayer );
SceneComponentParser.register( "user-widget-text-content", ComponentText );
SceneComponentParser.register( "user-widget-text-input", ComponentText );
SceneComponentParser.register( "user-widget-checkbox", ComponentList );
SceneComponentParser.register( "user-widget-radio", ComponentList );
SceneComponentParser.register( "user-widget-select", ComponentList );

export const component = {
	inheritAttrs: false,
	template: template,
	components : {
		"user-widget-checkbox" : listComponent,
		"user-widget-select" : listComponent,
		"user-widget-radio" : listComponent,
		"user-widget-text-input" : textInputComponent,
		"user-widget-number-input" : numberInputComponent,
		"user-widget-range" : rangeComponent,
		"user-widget-spinbutton" : spinbuttonComponent,
		"user-widget-datepicker" : datepickerComponent,
		"user-widget-media-player": asyncLoadComponentI18nMediaPlayer,
		"user-widget-text-content" : textContentComponent
	},
	props: {
		value: SceneComponent,
		locale: String
	},
}