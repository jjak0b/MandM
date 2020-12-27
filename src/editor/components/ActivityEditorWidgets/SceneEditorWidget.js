import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorMediaPlayer.js";
import { component as gridComponent } from "../SceneEditorWidgets/GridWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "../../../shared/components/UserWidgetMediaPlayer.js";
import { FormUtils} from "../../../shared/js/FormUtils.js";
import { component as attributeEditorComponent } from "../SceneEditorWidgets/AttributeEditorWidget.js";
import { component as datepickerComponent } from "../../../shared/components/UserWidgetDatepicker.js";
import { component as datepickerEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorDatepicker.js";
import { component as listComponent } from "../../../shared/components/UserWidgetList.js";
import { component as listEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorList.js";
import { component as textInputComponent } from "../../../shared/components/UserWidgetTextInput.js";
import { component as textInputEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorTextInput.js";
import { component as numberInputComponent } from "../../../shared/components/UserWidgetNumberInput.js";
import { component as numberInputEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorNumberInput.js";
import { component as rangeComponent } from "../../../shared/components/UserWidgetRange.js";
import { component as rangeEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorRange.js";
import { component as spinbuttonComponent } from "../../../shared/components/UserWidgetSpinbutton.js";
import { component as spinbuttonEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorSpinbutton.js";
import { component as textContentComponent } from "../../../shared/components/UserWidgetTextContent.js";
import { component as textContentEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorTextContent.js";
import {I18nUtils} from "../../../shared/js/I18nUtils.js";
import SceneComponentParser from "../../../shared/js/Scene/SceneComponentParser.js";
import SceneCell from "../../../shared/js/Scene/SceneCell.js";
import Scene from "../../../shared/js/Scene/Scene.js";
import ActivityNode from "../../../shared/js/ActivityNodes/ActivityNode.js";
import ComponentMediaPlayer from "../../../shared/js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ComponentText from "../../../shared/js/Scene/SceneComponents/ComponentText.js";
import ComponentList from "../../../shared/js/Scene/SceneComponents/ComponentList.js";

SceneComponentParser.register( "user-widget-media-player", ComponentMediaPlayer );
SceneComponentParser.register( "user-widget-text-content", ComponentText );
SceneComponentParser.register( "user-widget-text-input", ComponentText );
SceneComponentParser.register( "user-widget-checkbox", ComponentList );
SceneComponentParser.register( "user-widget-radio", ComponentList );
SceneComponentParser.register( "user-widget-select", ComponentList );


export const component = {
	template: template,
	props: {
		activity: ActivityNode,
		scene: Scene,
		locale: String,
		localesList: Array
	},
	components : {
		"user-widget-editor-text-content": textContentEditorComponent,
		"user-widget-editor-list": listEditorComponent,
		"user-widget-editor-text-input": textInputEditorComponent,
		"user-widget-editor-number-input": numberInputEditorComponent,
		"user-widget-editor-range": rangeEditorComponent,
		"user-widget-editor-spinbutton": spinbuttonEditorComponent,
		"user-widget-editor-datepicker": datepickerEditorComponent,
		"user-widget-editor-media-player": mediaFormComponent,
		"grid-widget": gridComponent,
		"attribute-editor-widget": attributeEditorComponent
	},
	data() {
		return {
			copiedItem: null,
			newId: 0,
			maxRows: 12,
			maxColumns: 12,
			isFormGridEnabled: false,
			showCSSGrid: true,
			widgetsTable: {
				"user-widget-checkbox" : {
					editor: "user-widget-editor-list",
					label: "UserWidgets.label-checkbox-widget-name",
					options: listComponent
				},
				"user-widget-select" : {
					editor: "user-widget-editor-list",
					label: "UserWidgets.label-select-widget-name",
					options: listComponent
				},
				"user-widget-radio" : {
					editor: "user-widget-editor-list",
					label: "UserWidgets.label-radio-widget-name",
					options: listComponent
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
		ComponentMediaPlayer.setDisposeCallback(
			ComponentMediaPlayer.name,
			(that, params) => {
				if( that.value && that.value.asset && that.value.asset.category == "images" ) {
					if( that.value.areas.captions ) {
						this.$i18n.removeMessageAll( that.value.captions[ 0 ] );
					}
					if( that.value.areas ) {
						that.value.areas.forEach( (area) => this.$i18n.removeMessageAll( area.alt ) );
					}
				}
			}
		);
		this.init( this.scene );
	},
	mounted(){
		this.isFormGridEnabled = this.$refs.grid;
	},
	methods: {
		init( newScene ) {
			if( newScene && newScene.grid) {
				for (let i = 0; i < newScene.grid.length; i++) {
					let columns = newScene.grid[ i ];
					for (let j = 0; j < columns.length; j++) {
						if( columns[ j ].component ) {
							this.initCellComponent( columns[ j ], columns[ j ].component.name );
						}
					}
				}
			}
		},
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
			let cell = new SceneCell( cellData );

			this.$refs.grid.AddColumn( formData.get( "position" ) == "after", cell );
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

			if( name in this.widgetsTable ) {
				if( !cell.component ) {
					// parse the object
					let id =  I18nUtils.getUniqueID();
					this.$set(
						cell,
						"component",
						SceneComponentParser.parse(
							{
								id: id ,
								i18nCategory: `${this.activity.data.i18nCategory}.component.${id}`,
								name: name,
								value: {},
								props: {},
							}
						)
					);
					console.log("[SceneEditor]", "Set component data", cell.component );
				}
				cell.component.options = this.widgetsTable[ name ].options || null;
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
			console.log("[SceneEditor]", "removing cell", cell );
			if( cell && cell.component) {
				if( cell.component.dispose ){
					cell.component.dispose();
				}
				this.$delete( cell, "component" );
			}
		}
	}
};