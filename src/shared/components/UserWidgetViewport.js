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
import {component as photoComponent} from "./UserWidgetPhoto.js";
import {component as gridComponent } from "./UserWidgetGrid.js";
import SceneComponentParser from "../js/Scene/SceneComponentParser.js";
import ComponentMediaPlayer from "../js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ComponentText from "../js/Scene/SceneComponents/ComponentText.js";
import ComponentList from "../js/Scene/SceneComponents/ComponentList.js";
import ComponentGrid from "../js/Scene/SceneComponents/ComponentGrid.js";
import ComponentPhoto from "../js/Scene/SceneComponents/ComponentPhoto.js"


SceneComponentParser.register( "user-widget-media-player", ComponentMediaPlayer );
SceneComponentParser.register( "user-widget-text-content", ComponentText );
SceneComponentParser.register( "user-widget-text-input", ComponentText );
SceneComponentParser.register( "user-widget-checkbox", ComponentList );
SceneComponentParser.register( "user-widget-radio", ComponentList );
SceneComponentParser.register( "user-widget-select", ComponentList );
SceneComponentParser.register( "user-widget-photo", ComponentPhoto );
SceneComponentParser.register( "user-widget-grid", ComponentGrid );

// circular dependency avoided with "user-widget-grid" using async component loading
export function component( resolve, reject ) {
	resolve({
		template: template,
		components: {
			"user-widget-checkbox": listComponent,
			"user-widget-select": listComponent,
			"user-widget-radio": listComponent,
			"user-widget-text-input": textInputComponent,
			"user-widget-number-input": numberInputComponent,
			"user-widget-range": rangeComponent,
			"user-widget-spinbutton": spinbuttonComponent,
			"user-widget-datepicker": datepickerComponent,
			"user-widget-media-player": asyncLoadComponentI18nMediaPlayer,
			"user-widget-text-content": textContentComponent,
			"user-widget-photo": photoComponent,
			"user-widget-grid": gridComponent
		},
		props: {
			value: SceneComponent,
			tabindex: [Number,String],
			locale: String
		},
	})
}