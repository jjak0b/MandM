import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorMediaPlayer.js";
import { component as gridComponent } from "../../../shared/components/GridWidget.js";
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
import ContextMediaPlayerArea from "../../../shared/js/Scene/SceneComponents/MediaPlayer/ContextMediaPlayerArea.js";

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
			currentCellCache: null,
			currentGridElement: null,

			newCell: new SceneCell( { colSize: 1, component: null } ),
			newCellComponentName: null,
			newCellSize: 1,
			onModalSubmit: null,
			modalState: null,
			maxCellSizeAvailable: 0,
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
	created() {
		this.onModalSubmit = this.onSubmitModalCellComponent;

		ComponentMediaPlayer.setDisposeCallback(
			ComponentMediaPlayer.name,
			(that, params) => {

				if( that.props.context && that.props.context.asset && that.props.context.asset.category == "images" ) {
					if( that.props.context.areas.captions ) {

						this.$i18n.removeMessageAll( that.props.context.captions[ 0 ] );
					}
				}
			}
		);
		ContextMediaPlayerArea.setDisposeCallback(
			ContextMediaPlayerArea.name,
			(that, params) => {
				this.$i18n.removeMessageAll( that.alt )
			}
		);
		this.init( this.scene );
	},
	mounted(){
		this.currentGridElement = this.$refs.grid;
		this.isFormGridEnabled = this.$refs.grid;
	},
	methods: {
		getCellComponentClass( isFocused, isSelected ) {
			let classes = [];
			if( this.showCSSGrid || isSelected ) {
				classes.push( 'rounded-0 border' );
				if( isSelected ) {
					classes.push( 'border-primary' );
				}
				else if( isFocused ){
					classes.push( 'border-success' );
				}
				else{
					classes.push( 'border-danger' );
				}
			}
			return classes;
		},
		canAddRow: function () {
			let rc = this.getRowsCount();
			console.log( "row count-", rc);
			return rc >= 0 && rc < this.maxRows
		},
		canAddColumn: function () {
			let rc = this.getRowsCount(); let cc = this.getColumnsCount();
			console.log( "row count_", rc);
			console.log( "column count", cc);
			return rc > 0 && 0 <= cc && cc < this.maxColumns
		},
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
		onAddGridRows( event, position ){
			this.maxCellSizeAvailable = this.maxColumns;
			this.onModalSubmit = (e) => {
				let valid = this.onSubmitModalCellComponent(e);
				if( valid ) {
					this.currentGridElement.AddRow( position === "after", this.newCell );
				}
			}
		},
		onAddGridColumn( event, position ) {
			let avail = this.getAvailableColumnsCount();
			this.maxCellSizeAvailable = Math.max( 0, Math.min( avail, this.maxColumns ) )
			this.onModalSubmit = (e) => {
				let valid = this.onSubmitModalCellComponent(e);
				if( valid ) {
					this.currentGridElement.AddColumn(position === "after", this.newCell);
				}
			}
		},
		onChangeSelectedCellComponent() {
			// use current cell as reference
			this.newCell = this.currentCellCache;
			this.newCellSize = this.currentCellCache.colSize;
			this.newCellComponentName = this.currentCellCache.component.name;
			this.maxCellSizeAvailable = Math.max( 0, Math.min( this.getAvailableColumnsCount() + this.newCell.colSize, this.maxColumns ) )

			this.onModalSubmit = this.onSubmitModalCellComponent;
		},
		removeRow() {
			if( this.cursor ) {
				let columns = this.scene.grid[ this.cursor[ 0 ] ];
				for (let i = 0; i < columns.length; i++) {
					this.removeCellComponent( columns[ i ] );
				}
			}
			return this.currentGridElement.removeRow();
		},
		removeCell() {
			this.removeCellComponent( this.currentCellCache );
			return this.currentGridElement.removeCell();
		},
		getMaxRowsForGrid(){
			if( this.currentGridElement )
				return this.currentGridElement.getAvailableRowsCount();
			return null;
		},
		getAvailableColumnsCount() {
			if( this.currentGridElement ){
				let c = this.currentGridElement.getAvailableColumnsCount();

				if( c >= 0 )
					return c;
			}
			return this.maxColumns;
		},
		getRowsCount() {
			if( this.currentGridElement )
				return this.currentGridElement.getRowsCount();
			return -1;
		},
		getColumnsCount() {
			if( this.currentGridElement )
				return this.currentGridElement.getColumnsCount();
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
		},
		onOkModalCellComponent(bvModalEvt) {
			bvModalEvt.preventDefault();
			if( this.onModalSubmit )
				this.onModalSubmit( bvModalEvt );
		},
		onSubmitModalCellComponent() {
			const formValidity = this.$refs[ "form-set-cell-component" ].checkValidity()
			this.modalState = formValidity;
			if ( !formValidity ) {
				return;
			}

			this.newCell.colSize = this.newCellSize;
			// re-init component only if not defined or only if different than original
			if( !this.newCell.component || ( this.newCell.component && this.newCell.component.name != this.newCellComponentName ) ) {
				// reinit on new component name
				this.removeCellComponent(this.newCell);
				this.initCellComponent(this.newCell, this.newCellComponentName);
			}

			this.$nextTick(() => {
				this.$bvModal.hide('sceneEditor-modal-set-cell-component')
			});

			return formValidity;
		},
		resetModalCellComponent() {
			this.newCell = new SceneCell( { colSize: 1, component: null } );
			this.newCellComponentName = null;
			this.modalState = null;
			this.newCellSize = 1;
		}
	}
};