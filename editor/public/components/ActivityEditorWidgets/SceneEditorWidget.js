import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorMediaPlayer.js";
import { component as gridComponent } from "../SceneEditorWidgets/GridWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/UserWidgetMediaPlayer.js";
import { FormUtils} from "/shared//js/FormUtils.js";
import { component as styleEditorComponent } from "../SceneEditorWidgets/StyleEditorWidget.js";
import { component as attributeEditorComponent } from "../SceneEditorWidgets/AttributeEditorWidget.js";
import { component as datepickerComponent } from "/shared/components/UserWidgetDatepicker.js";
import { component as datepickerEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorDatepicker.js";
import { component as selectComponent } from "/shared/components/UserWidgetSelect.js";
import { component as selectEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorSelect.js";
import { component as checkboxComponent } from "/shared/components/UserWidgetCheckbox.js";
import { component as checkboxEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorCheckbox.js";
import { component as radioComponent } from "/shared/components/UserWidgetRadio.js";
import { component as radioEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorRadio.js";
import { component as textInputComponent } from "/shared/components/UserWidgetTextInput.js";
import { component as textInputEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorTextInput.js";
import { component as numberInputComponent } from "/shared/components/UserWidgetNumberInput.js";
import { component as numberInputEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorNumberInput.js";
import { component as rangeComponent } from "/shared/components/UserWidgetRange.js";
import { component as rangeEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorRange.js";
import { component as spinbuttonComponent } from "/shared/components/UserWidgetSpinbutton.js";
import { component as spinbuttonEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorSpinbutton.js";
import { component as textContentComponent } from "/shared/components/UserWidgetTextContent.js";
import { component as textContentEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorTextContent.js";
import UserWidgetItem from "/shared/js/UserWidgetItem.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		activity: Object,
		scene: Object,
		locale: String,
		nextAssetId: Number
	},
	components : {
		"user-widget-editor-text-content": textContentEditorComponent,
		"user-widget-editor-select": selectEditorComponent,
		"user-widget-editor-checkbox": checkboxEditorComponent,
		"user-widget-editor-radio": radioEditorComponent,
		"user-widget-editor-text-input": textInputEditorComponent,
		"user-widget-editor-number-input": numberInputEditorComponent,
		"user-widget-editor-range": rangeEditorComponent,
		"user-widget-editor-spinbutton": spinbuttonEditorComponent,
		"user-widget-editor-datepicker": datepickerEditorComponent,
		"user-widget-editor-media-player": mediaFormComponent,
		"grid-widget": gridComponent,
		"attribute-editor-widget": attributeEditorComponent,
		"style-editor-widget": styleEditorComponent
	},
	data() {
		return {
			newId: 0,
			maxRows: 12,
			maxColumns: 12,
			isFormGridEnabled: false,
			showCSSGrid: true,
			widgetsTable: {
				"user-widget-checkbox" : {
					editor: "user-widget-editor-checkbox",
					label: "UserWidgets.label-checkbox-widget-name",
					options: checkboxComponent
				},
				"user-widget-select" : {
					editor: "user-widget-editor-select",
					label: "UserWidgets.label-select-widget-name",
					options: selectComponent
				},
				"user-widget-radio" : {
					editor: "user-widget-editor-radio",
					label: "UserWidgets.label-radio-widget-name",
					options: radioComponent
				},
				"user-widget-text-input" : {
					editor: "user-widget-editor-text-input",
					label: "UserWidgets.label-text-input-widget-name",
					options: textInputComponent
				},
				"user-widget-number-input" : {
					editor: "user-widget-editor-number-input",
					label: "UserWidgets.label-number-input-widget-name",
					options: numberInputComponent
				},
				"user-widget-range" : {
					editor: "user-widget-editor-range",
					label: "UserWidgets.label-range-widget-name",
					options: rangeComponent
				},
				"user-widget-spinbutton" : {
					editor: "user-widget-editor-spinbutton",
					label: "UserWidgets.label-spinbutton-widget-name",
					options: spinbuttonComponent
				},
				"user-widget-datepicker" : {
					editor: "user-widget-editor-datepicker",
					label: "UserWidgets.label-datepicker-widget-name",
					options: datepickerComponent
				},
				"user-widget-media-player": {
					editor: "user-widget-editor-media-player",
					label: "UserWidgets.label-media-player-widget-name",
					options:  asyncLoadComponentI18nMediaPlayer
				},
				"user-widget-text-content" : {
					editor: "user-widget-editor-text-content",
					label: "UserWidgets.TextContent.label-text-content",
					options: textContentComponent
				},
			},
			cursor: null,
			currentCellCache: null
		}
	},
	watch: {
		"cursor": function ( coords ) {
			if( coords
				&& coords[0] < this.scene.grid.length
				&& coords[1] < this.scene.grid[ coords[0] ].length ) {
				console.log( "new coords", coords );
				this.currentCellCache = this.scene.grid[ coords[ 0 ] ] [ coords[ 1 ] ];
			}
			else {
				this.currentCellCache = null;
			}
		},
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
	created() {
		this.init( this.scene );
	},
	mounted(){
		this.isFormGridEnabled = this.$refs.grid;
	},
	methods: {
		init( newScene ) {
			if( newScene ) {
				if( newScene.grid ) {
					// if there is at least 1 column
					if( newScene.grid.length > 0 && newScene.grid[ 0 ].length > 0 ) {
						// check if the first is unparsed and if so then all must be parsed
						console.log("[SceneEditor]", "checking if all cell's component must be parsed");
						let testCell = newScene.grid[ 0 ][ 0 ];
						if( testCell.component && !( testCell.component instanceof UserWidgetItem) ){
							console.log("[SceneEditor]","parsing grid");
							for (let i = 0; i < newScene.grid.length; i++) {
								let columns = newScene.grid[ i ];
								for (let j = 0; j < columns.length; j++) {
									if( columns[ j ].component ) {
										this.initCellComponent( columns[ j ], columns[ j ].component.name );
									}
								}
							}
						}
					}
				}
				else {
					this.$set( newScene, "grid", [] );
				}
				newScene.style = {};
			}
		},
		onAddGridRows( event ){
			this.$emit('inc-asset-id');
			// we perform manual submit so check form validity first
			let valid = $( event.target).closest( "form" )[0].checkValidity();
			if( !valid ) return;

			let formData = FormUtils.getFormData( event, true );
			this.$refs.grid.AddRow( formData.get( "position" ) == "after" );
		},
		onAddGridColumn( event ) {
			this.$emit('inc-asset-id');
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
			if( this.cursor ) {
				let columns = this.scene.grid[ this.cursor[ 0 ] ];
				for (let i = 0; i < columns.length; i++) {
					this.removeCellComponent( columns[ i ] );
				}
			}
			return this.$refs.grid.removeRow();
		},
		removeCell() {
			this.removeCellComponent( this.currentCellCache );
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
		initCellComponent( cell, name ) {
			let self = this;
			if( !cell || !name ){
				return;
			}

			if( cell.component ) {
				// parse the object into UserWidgetItem
				if( !(cell.component instanceof UserWidgetItem )
					&& ( name in this.widgetsTable )
				) {
					this.$set(
						cell,
						"component",
						new UserWidgetItem(
							cell.component,
							this.widgetsTable[ name ] ? () => this.widgetsTable[ name ].options : null
						)
					);
					console.log("[SceneEditor]", "Parsed component data", cell.component );
				}
			}
			else {
				let componentData = new UserWidgetItem(
					name,
					this.widgetsTable[ name ] ? () => self.widgetsTable[ name ].options : null,
					null,
					{},
					{},
					{}
				);

				let id = I18nUtils.getUniqueID();
				let category = `${this.activity.data.i18nCategory}.component.${id}`;

				this.$set( cell, "component", componentData );
				this.$set( cell.component, "id", id );

				cell.component.i18nCategory = category;

				console.log("[SceneEditor]", "Set component data", cell.component );
			}
		},
		setCurrentCellComponent( name ) {
			if( this.currentCellCache ) {
				this.removeCellComponent( this.currentCellCache );

				// reinit on new component name
				this.initCellComponent( this.currentCellCache, name );
			}
		},
		removeCellComponent( cell ) {
			console.log("[SceneEditor]", "removing cell", (() => cell)() );
			if( cell ) {
				if( cell.component ) {
					if( cell.component.dispose ){
						console.log("[SceneEditor]", "dispose method detected for component" );
						cell.component.dispose();
					}
					this.$delete( cell, "component" );
				}
			}
		},
		onAddElement(toAdd) {
			if (! ('options' in this.currentCellCache.component.props)) {
				this.$set( this.currentCellCache.component.props, 'options', [] );
			}
			this.currentCellCache.component.props.options.push( toAdd );
		},
		onRemoveElement(index) {
			this.currentCellCache.component.props.options.splice( index, 1 );
		},
		onInputLocalHTML(localHTML) {
			if (! ('localHTML' in this.currentCellCache.component.props)) {
				this.$set( this.currentCellCache.component.props, 'localHTML', "" );
			}
			this.$set( this.currentCellCache.component.props, 'localHTML', localHTML );
		}
	}
};