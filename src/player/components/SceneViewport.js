import {template} from "./SceneViewportTemplate.js";
import {component as checkboxComponent} from "../../shared/components/UserWidgetCheckbox.js";
import {component as selectComponent} from "../../shared/components/UserWidgetSelect.js";
import {component as radioComponent} from "../../shared/components/UserWidgetRadio.js";
import {component as textInputComponent} from "../../shared/components/UserWidgetTextInput.js";
import {component as numberInputComponent} from "../../shared/components/UserWidgetNumberInput.js";
import {component as rangeComponent} from "../../shared/components/UserWidgetRange.js";
import {component as spinbuttonComponent} from "../../shared/components/UserWidgetSpinbutton.js";
import {component as datepickerComponent} from "../../shared/components/UserWidgetDatepicker.js";
import {asyncLoad as asyncLoadComponentI18nMediaPlayer} from "../../shared/components/UserWidgetMediaPlayer.js";
import {component as textContentComponent} from "../../shared/components/UserWidgetTextContent.js";
import SceneComponentParser from "../../shared/js/Scene/SceneComponentParser.js";
import ComponentMediaPlayer from "../../shared/js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ComponentText from "../../shared/js/Scene/SceneComponents/ComponentText.js";
import ComponentList from "../../shared/js/Scene/SceneComponents/ComponentList.js";
import Scene from "../../shared/js/Scene/Scene.js";

SceneComponentParser.register( "user-widget-media-player", ComponentMediaPlayer );
SceneComponentParser.register( "user-widget-text-content", ComponentText );
SceneComponentParser.register( "user-widget-text-input", ComponentText );
SceneComponentParser.register( "user-widget-checkbox", ComponentList );
SceneComponentParser.register( "user-widget-radio", ComponentList );
SceneComponentParser.register( "user-widget-select", ComponentList );

export const component = {
	template: template,
	props: {
		value: Scene
	},
	components : {
		"user-widget-checkbox" : checkboxComponent,
		"user-widget-select" : selectComponent,
		"user-widget-radio" : radioComponent,
		"user-widget-text-input" : textInputComponent,
		"user-widget-number-input" : numberInputComponent,
		"user-widget-range" : rangeComponent,
		"user-widget-spinbutton" : spinbuttonComponent,
		"user-widget-datepicker" : datepickerComponent,
		"user-widget-media-player": asyncLoadComponentI18nMediaPlayer,
		"user-widget-text-content" : textContentComponent
	},
}