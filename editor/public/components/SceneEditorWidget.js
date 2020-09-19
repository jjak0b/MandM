import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "./SceneEditorWidgets/MediaFormWidget.js";
import { component as gridComponent } from "./SceneEditorWidgets/GridWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/I18nMediaPlayerWidget.js";
import { FormUtils} from "/shared//js/FormUtils.js";
import { component as styleEditorComponent } from "./SceneEditorWidgets/StyleEditorWidget.js";
import { component as attributeEditorComponent } from "./SceneEditorWidgets/AttributeEditorWidget.js";
import { component as datepickerComponent } from "/shared/components/UserWidgetDatepicker.js";
import { component as datepickerEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetDatepickerEditor.js";
import { component as selectComponent } from "/shared/components/UserWidgetSelect.js";
import { component as selectEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetSelectEditor.js";
import { component as checkboxComponent } from "/shared/components/UserWidgetCheckbox.js";
import { component as checkboxEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetCheckboxEditor.js";
import { component as radioComponent } from "/shared/components/UserWidgetRadio.js";
import { component as radioEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetRadioEditor.js";
import { component as textInputComponent } from "/shared/components/UserWidgetTextInput.js";
import { component as textInputEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetTextInputEditor.js";
import { component as numberInputComponent } from "/shared/components/UserWidgetNumberInput.js";
import { component as numberInputEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetNumberInputEditor.js";
import { component as rangeComponent } from "/shared/components/UserWidgetRange.js";
import { component as rangeEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetRangeEditor.js";
import { component as spinbuttonComponent } from "/shared/components/UserWidgetSpinbutton.js";
import { component as spinbuttonEditorComponent } from "./SceneEditorWidgets/UserWidgetFormEditors/UserWidgetSpinbuttonEditor.js";

export const component = {
	template: template,
	props: {
		scene: Object,
		locale: String,
		nextAssetId: Number
	},
	components : {
		"user-widget-select-editor": selectEditorComponent,
		"user-widget-checkbox-editor": checkboxEditorComponent,
		"user-widget-radio-editor": radioEditorComponent,
		"user-widget-textInput-editor": textInputEditorComponent,
		"user-widget-numberInput-editor": numberInputEditorComponent,
		"user-widget-range-editor": rangeEditorComponent,
		"user-widget-spinbutton-editor": spinbuttonEditorComponent,
		"user-widget-datepicker-editor": datepickerEditorComponent,
		"media-form-widget": mediaFormComponent,
		"grid-widget": gridComponent,
		"attribute-editor-widget": attributeEditorComponent,
		"style-editor-widget": styleEditorComponent
	},
	data() {
		return {
			maxRows: 12,
			maxColumns: 12,
			isFormGridEnabled: false,
			showCSSGrid: true,
			widgetsTable: {
				"user-widget-checkbox" : {
					editor: "user-widget-checkbox-editor",
					label: "UserWidgets.Checkbox.label-widget-name",
					options: checkboxComponent
				},
				"user-widget-select" : {
					editor: "user-widget-select-editor",
					label: "UserWidgets.Select.label-widget-name",
					options: selectComponent
				},
				"user-widget-radio" : {
					editor: "user-widget-radio-editor",
					label: "UserWidgets.Radio.label-widget-name",
					options: radioComponent
				},
				"user-widget-textInput" : {
					editor: "user-widget-textInput-editor",
					label: "UserWidgets.TextInput.label-widget-name",
					options: textInputComponent
				},
				"user-widget-numberInput" : {
					editor: "user-widget-numberInput-editor",
					label: "UserWidgets.NumberInput.label-widget-name",
					options: numberInputComponent
				},
				"user-widget-range" : {
					editor: "user-widget-range-editor",
					label: "UserWidgets.Range.label-widget-name",
					options: rangeComponent
				},
				"user-widget-spinbutton" : {
					editor: "user-widget-spinbutton-editor",
					label: "UserWidgets.Spinbutton.label-widget-name",
					options: spinbuttonComponent
				},
				"user-widget-datepicker" : {
					editor: "user-widget-datepicker-editor",
					label: "UserWidgets.Datepicker.label-widget-name",
					options: datepickerComponent
				},
				"i18n-media-player-widget": {
					editor: "media-form-widget",
					label: "I18nMediaPlayerWidget.label-widget-name",
					options:  asyncLoadComponentI18nMediaPlayer
				}
			},
			currentCellCache: null
		}
	},
	watch: {
		"currentCellCache": {
			deep: true,
			handler: function (newVal) {
				// DEBUG
				// console.log( "updated", "currentCellCache", this.currentCellCache );
			}
		}

	},
	computed: {
		canAddRow: function () { let rc = this.getRowsCount(); return rc >= 0 && rc < this.maxRows },
		canAddColumn: function () {  let rc = this.getRowsCount(); let cc = this.getColumnsCount(); return rc > 0 && 0 <= cc && cc < this.maxColumns },
		maxCellSizeAvailable: function() {
			return this.getMaxColumnsForGrid() + (this.currentCellCache ? this.currentCellCache.colSize : 0);
		}
	},
	mounted(){
		this.isFormGridEnabled = this.$refs.grid;
	},
	methods: {
		onAddGridRows( event ){
			// we perform manual submit so check form validity first
			let valid = $( event.target).closest( "form" )[0].checkValidity();
			if( !valid ) return;

			let formData = FormUtils.getFormData( event, true );
			this.$refs.grid.AddRow( formData.get( "position" ) == "after" );
		},
		onAddGridColumn( event ) {
			// we perform manual submit so check form validity first
			let valid = $( event.target).closest( "form" )[0].checkValidity();
			if( !valid ) return;

			let formData = FormUtils.getFormData( event, true );
			let cellData = {
				colSize: Number.parseInt( formData.get( "size" ) ),
				component: null
			}

			this.$refs.grid.AddColumn( formData.get( "position" ) == "after", cellData );
		},
		removeRow() {
			return this.$refs.grid.removeRow();
		},
		removeCell() {
			return this.$refs.grid.removeCell();
		},
		getMaxRowsForGrid(){
			if( this.$refs.grid )
				return this.$refs.grid.getAvailableRowsCount();
			return null;
		},
		getMaxColumnsForGrid() {
			if( this.$refs.grid ){
				let c = this.$refs.grid.getAvailableColumnsCount();
				return c;
			}

			return null;
		},
		getRowsCount() {
			if( this.$refs.grid )
				return this.$refs.grid.getRowsCount();
			return -1;
		},
		getColumnsCount() {
			if( this.$refs.grid )
				return this.$refs.grid.getColumnsCount();
			return -1;
		},
		setCurrentCell( event ) {
			console.log( event );
			// $set( currentCellCache, 'component', $event.target.value )
		},
		setCurrentCellComponent( name ) {
			if( !this.currentCellCache ){
				return;
			}

			if(!this.currentCellCache.component ) {
				let component = {};
				this.$set( this.currentCellCache, "component", { component: component } );
			}

			this.$set( this.currentCellCache.component, "name",  name );
			if( this.widgetsTable[ name ] )
				this.$set( this.currentCellCache.component, "options", this.widgetsTable[ name ].options );
			this.$set( this.currentCellCache.component, "props", {} );
			this.$set( this.currentCellCache.component, "value", {} ); // even if value should be a prop, will be treated as separate prop
			if( !this.currentCellCache.component.style ) {
				this.$set( this.currentCellCache.component, "style", {} )
				this.$set(
					this.currentCellCache.component.style,
					"size",
					{
						x: 100,
						y: 100
					}
				);
				this.$set(
					this.currentCellCache.component.style,
					"angles",
					{
						x: 0,
						y: 0,
						z: 0
					}
				);
				this.$set(
					this.currentCellCache.component.style,
					"position",
					{
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				);
			}
			console.log("[SceneEditor]", "Set component data", this.currentCellCache.component );
		},
		onAddElement(toAdd) {
			if (! ('options' in this.currentCellCache.component.props)) {
				this.$set( this.currentCellCache.component.props, 'options', [] );
			}
			this.currentCellCache.component.props.options.push( toAdd );
		},
		onRemoveElement(index) {
			this.currentCellCache.component.props.options.splice( index, 1 );
		}
	}
};