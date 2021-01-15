import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorMediaPlayer.js";
import { component as gridWidget } from "../../../shared/components/GridWidget.js";

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
import { component as gridEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorGrid.js";


import {I18nUtils} from "../../../shared/js/I18nUtils.js";
import SceneComponentParser from "../../../shared/js/Scene/SceneComponentParser.js";
import SceneCell from "../../../shared/js/Scene/SceneComponents/Grid/SceneCell.js";
import Scene from "../../../shared/js/Scene/Scene.js";
import ActivityNode from "../../../shared/js/ActivityNodes/ActivityNode.js";
import ComponentMediaPlayer from "../../../shared/js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ContextMediaPlayerArea from "../../../shared/js/Scene/SceneComponents/MediaPlayer/ContextMediaPlayerArea.js";
import ComponentGrid from "../../../shared/js/Scene/SceneComponents/ComponentGrid.js";
import { component as userWidgetViewport} from "../../../shared/components/UserWidgetViewport.js";

export const component = {
	template: template,
	props: {
		activity: ActivityNode,
		scene: Scene,
		locale: String,
		localesList: Array
	},
	components : {
		"user-widget-viewport": userWidgetViewport,
		"user-widget-editor-text-content": textContentEditorComponent,
		"user-widget-editor-list": listEditorComponent,
		"user-widget-editor-text-input": textInputEditorComponent,
		"user-widget-editor-number-input": numberInputEditorComponent,
		"user-widget-editor-range": rangeEditorComponent,
		"user-widget-editor-spinbutton": spinbuttonEditorComponent,
		"user-widget-editor-datepicker": datepickerEditorComponent,
		"user-widget-editor-media-player": mediaFormComponent,
		"user-widget-editor-grid": gridEditorComponent,
		"grid-widget": gridWidget,
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
				},
				"user-widget-select" : {
					editor: "user-widget-editor-list",
					label: "UserWidgets.label-select-widget-name",
				},
				"user-widget-radio" : {
					editor: "user-widget-editor-list",
					label: "UserWidgets.label-radio-widget-name",
				},
				"user-widget-text-input" : {
					editor: "user-widget-editor-text-input",
					label: "UserWidgets.label-text-input-widget-name",
				},
				"user-widget-number-input" : {
					editor: "user-widget-editor-number-input",
					label: "UserWidgets.label-number-input-widget-name",
				},
				"user-widget-range" : {
					editor: "user-widget-editor-range",
					label: "UserWidgets.label-range-widget-name",
				},
				"user-widget-spinbutton" : {
					editor: "user-widget-editor-spinbutton",
					label: "UserWidgets.label-spinbutton-widget-name",
				},
				"user-widget-datepicker" : {
					editor: "user-widget-editor-datepicker",
					label: "UserWidgets.label-datepicker-widget-name",
				},
				"user-widget-media-player": {
					editor: "user-widget-editor-media-player",
					label: "UserWidgets.label-media-player-widget-name",
				},
				"user-widget-text-content" : {
					editor: "user-widget-editor-text-content",
					label: "UserWidgets.TextContent.label-text-content",
				},
				"user-widget-grid" : {
					editor: "user-widget-editor-grid",
					label: "UserWidgets.grid.label-grid",
				},
			},
			cursor: null,
			currentCellCache: null,
			currentLayerIndex: -1,
			currentGridElement: null,
			/**
			 * @type {{
			 * 	component: ComponentGrid
			 * 	cursor: Array
			 * }[]}
			 */
			gridLayers: [],
			newCell: new SceneCell( { colSize: 1, component: null } ),
			newCellComponentName: null,
			newCellSize: 1,
			onModalSubmit: null,
			maxCellSizeAvailable: 0,
			gridPreventFocus: false,
			lastRemovedWidgetNames: [],
			lastAddedWidgetName: null
		}
	},
	watch: {
		"currentLayerIndex": function () {
			let gridRefName = "grid-" + this.currentLayerIndex;
			if( gridRefName in this.$refs ) {
				this.currentGridElement = this.$refs[ gridRefName ][ 0 ];
			}
			else {
				this.currentGridElement = undefined;
			}
			this.currentCellCache = null;
			let cursor = this.currentLayerGrid.cursor;
			if( cursor && cursor[ 0 ] >= 0 && cursor[ 1 ] >= 0 ) {
				let selectedCell = this.currentLayerGrid.component.props.gridData[ cursor[ 0 ] ][ cursor[ 1 ] ];
				this.currentCellCache = selectedCell;
			}
		},
	},
	computed: {
		currentLayerGrid: function() {
			if( this.currentLayerIndex < 0 ) return undefined;
			return this.gridLayers[ this.currentLayerIndex ];
		},
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
	},
	mounted(){
		// put default grid as first layer
		this.gridLayers.push({
			component: this.scene.body,
			cursor: [-1, -1]
		});
		// this.isFormGridEnabled = true;
	},
	methods: {
		onCellSelectedInsideGrid( gridIndex, cursor ) {
			if( gridIndex < 0 || gridIndex >= this.gridLayers.length ) return;
			// this.currentLayerGrid
			let gridLayerComponent = this.gridLayers[ gridIndex ].component;

			if( cursor && cursor[ 0 ] >= 0 && cursor[ 1 ] >= 0 ) {
				let selectedCell = gridLayerComponent.props.gridData[ cursor[ 0 ] ][ cursor[ 1 ] ];

				this.currentCellCache = selectedCell;


				if( selectedCell.component ){

					if( selectedCell.component instanceof ComponentGrid ) {
						if( this.gridLayers.length-1 <= gridIndex ) {
							this.gridLayers.push({
								component: selectedCell.component,
								cursor: [-1, -1]
							});
						}
						// else we already have the layer
					}
					else {
						while( this.gridLayers.length -1 > gridIndex ) {
							let gridLayer = this.gridLayers.pop();
						}
					}
				}
			}
		},
		canAddRow: function () {
			return !!this.currentLayerGrid;
		},
		canAddColumn: function () {
			// have rows
			if( this.currentCellCache && this.currentLayerGrid ) {
				if( this.currentLayerGrid.component.props.gridData ) {
					return this.currentLayerGrid.component.props.gridData.length > 0;
				}
			}
			return false;
		},
		onAddGridRows( event, position ){
			this.onModalSubmit = (e) => {
				let valid = this.onSubmitModalCellComponent(e);
				if( valid ) {

					this.gridPreventFocus = true;
						this.$set(
							this.currentLayerGrid,
							"cursor",
							this.currentGridElement.AddRow( position === "after", this.newCell )
						);
					this.gridPreventFocus = false

					// so we are sure that after added, we can only save that component
					this.onModalSubmit = this.onSubmitModalCellComponent;
				}
			}
		},
		onAddGridColumn( event, position ) {
			this.onModalSubmit = (e) => {
				let valid = this.onSubmitModalCellComponent(e);
				if( valid ) {
					this.gridPreventFocus = true;
					this.$set(
						this.currentLayerGrid,
						"cursor",
						this.currentGridElement.AddColumn(position === "after", this.newCell )
					);
					this.gridPreventFocus = false
					// so we are sure that after added, we can only save that component
					this.onModalSubmit = this.onSubmitModalCellComponent;
				}
			}
		},
		onChangeSelectedCellComponent() {
			// use current cell as reference
			this.newCell = this.currentCellCache;
			this.newCellSize = this.currentCellCache.colSize;
			this.newCellComponentName = this.currentCellCache.component.name;

			this.onModalSubmit = this.onSubmitModalCellComponent;
		},
		removeRow() {
			this.gridPreventFocus = true;
			this.$nextTick( () => {
				let columns = this.currentGridElement.removeRow();

				if( columns ) {
					// clear old state
					this.lastAddedWidgetName = null;
					this.lastRemovedWidgetNames.splice(0, this.lastRemovedWidgetNames.length );

					for (let i = 0; i < columns.length; i++) {
						this.removeCellComponent( columns[ i ] );
					}
				}
				this.$nextTick( () => this.gridPreventFocus = false );
			});
		},
		removeCell() {
			// clear old state
			this.lastRemovedWidgetNames.splice(0, this.lastRemovedWidgetNames.length );
			this.lastAddedWidgetName = null;

			this.gridPreventFocus = true;
			this.$nextTick( () => {
				let columns = this.currentGridElement.removeCell();
				for (let i = 0; i < columns.length; i++) {
					this.removeCellComponent( columns[ i ] );
				}
				this.$nextTick( () => this.gridPreventFocus = false );
			});
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
								props: {},
							}
						)
					);
					console.log("[SceneEditor]", "Set component data", cell.component );
				}
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
				this.lastRemovedWidgetNames.push( cell.component.name );
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
			if ( !formValidity ) {
				return;
			}

			this.newCell.colSize = this.newCellSize;
			// re-init component only if not defined or only if different than original
			if( !this.newCell.component || ( this.newCell.component && this.newCell.component.name != this.newCellComponentName ) ) {

				let newName = this.newCellComponentName;
				if( newName ) {
					// clear old state
					this.lastRemovedWidgetNames.splice(0, this.lastRemovedWidgetNames.length );
					this.lastAddedWidgetName = null;
					this.$nextTick( () => this.lastAddedWidgetName = newName );
				}

				// reinit on new component name
				this.removeCellComponent(this.newCell);

				this.initCellComponent(this.newCell, this.newCellComponentName);


			}

			// was required if use modal instead ofsidebar
			// this.$nextTick(() => {
				// this.$bvModal.hide('sceneEditor-modal-set-cell-component')
			// });

			return formValidity;
		},
		resetModalCellComponent() {
			this.newCell = new SceneCell( { colSize: 1, component: null } );
			this.newCellComponentName = null;
			this.newCellSize = 1;
		},
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
	}
};