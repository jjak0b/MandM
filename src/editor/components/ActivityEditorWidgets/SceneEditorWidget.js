import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorMediaPlayer.js";
import { component as gridWidget } from "../../../shared/components/GridWidget.js";
import { component as attributeEditorComponent } from "../SceneEditorWidgets/AttributeEditorWidget.js";
import { component as timepickerEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorTimepicker.js";
import { component as datepickerEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorDatepicker.js";
import { component as buttonEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorButton.js";
import { component as listEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorList.js";
import { component as inputEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorInput.js";
import { component as spinbuttonEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorSpinbutton.js";
import { component as textContentEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorTextContent.js";
import { component as photoEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorPhoto.js";
import { component as qrDecoderEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorQrDecoder.js";
import { component as gridEditorComponent } from "../SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorGrid.js";
import { component as userWidgetViewport} from "../../../shared/components/UserWidgetViewport.js";

import {I18nUtils} from "../../../shared/js/I18nUtils.js";
import SceneComponentParser from "../../../shared/js/Scene/SceneComponentParser.js";
import SceneCell from "../../../shared/js/Scene/SceneComponents/Grid/SceneCell.js";
import Scene from "../../../shared/js/Scene/Scene.js";
import ActivityNode from "../../../shared/js/ActivityNodes/ActivityNode.js";
import ComponentMediaPlayer from "../../../shared/js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ContextMediaPlayerArea from "../../../shared/js/Scene/SceneComponents/MediaPlayer/ContextMediaPlayerArea.js";
import ComponentGrid from "../../../shared/js/Scene/SceneComponents/ComponentGrid.js";
import ComponentText from "../../../shared/js/Scene/SceneComponents/ComponentText.js";
import ComponentList from "../../../shared/js/Scene/SceneComponents/ComponentList.js";
import ComponentInput from "../../../shared/js/Scene/SceneComponents/ComponentInput.js";
import ComponentButton from "../../../shared/js/Scene/SceneComponents/ComponentButton.js";
import ComponentSpinbutton from "../../../shared/js/Scene/SceneComponents/ComponentSpinbutton.js";
import ComponentDate from "../../../shared/js/Scene/SceneComponents/ComponentDate.js";
import ComponentTime from "../../../shared/js/Scene/SceneComponents/ComponentTime.js";
import ComponentQRDecoder from "../../../shared/js/Scene/SceneComponents/ComponentQRDecoder.js";

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
		"user-widget-editor-button": buttonEditorComponent,
		"user-widget-editor-list": listEditorComponent,
		"user-widget-editor-text-input": inputEditorComponent,
		"user-widget-editor-number-input": inputEditorComponent,
		"user-widget-editor-range": inputEditorComponent,
		"user-widget-editor-spinbutton": spinbuttonEditorComponent,
		"user-widget-editor-datepicker": datepickerEditorComponent,
		"user-widget-editor-timepicker": timepickerEditorComponent,
		"user-widget-editor-media-player": mediaFormComponent,
		"user-widget-editor-photo": photoEditorComponent,
		"user-widget-editor-qr-decode": qrDecoderEditorComponent,
		"user-widget-editor-grid": gridEditorComponent,
		"grid-widget": gridWidget,
		"attribute-editor-widget": attributeEditorComponent
	},
	data() {
		return {
			// deprecated / not used
			copiedItem: null,
			newId: 0,
			maxRows: 12,
			maxColumns: 12,
			cursor: null,
			maxCellSizeAvailable: 0,
			//end deprecated
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
				"user-widget-button" : {
					editor: "user-widget-editor-button",
					label: "UserWidgets.label-button-widget-name",
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
				"user-widget-timepicker" : {
					editor: "user-widget-editor-timepicker",
					label: "UserWidgets.label-timepicker-widget-name",
				},
				"user-widget-media-player": {
					editor: "user-widget-editor-media-player",
					label: "UserWidgets.label-media-player-widget-name",
				},
				"user-widget-text-content" : {
					editor: "user-widget-editor-text-content",
					label: "UserWidgets.TextContent.label-text-content",
				},
				"user-widget-photo" : {
					editor: "user-widget-editor-photo",
					label: "UserWidgets.label-photo-widget-name",
				},
				"user-widget-qr-decoder" : {
					editor: "user-widget-editor-qr-decode",
					label: "UserWidgets.label-qr-decode-widget-name",
				},
				"user-widget-grid" : {
					editor: "user-widget-editor-grid",
					label: "UserWidgets.label-grid-widget-name",
				},
			},
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
			gridPreventFocus: false,
			lastRemovedWidgetNames: [],
			lastAddedWidgetName: null
		}
	},
	watch: {
		// Change current working cell when current layer change
		"currentLayerIndex": function (gridIndex) {
			let gridRefName = "grid-" + this.currentLayerIndex;
			if( gridRefName in this.$refs ) {
				this.currentGridElement = this.$refs[ gridRefName ][ 0 ];
			}
			else {
				this.currentGridElement = undefined;
			}

			let cursor = this.currentLayerGrid.cursor;
			if( cursor && cursor[ 0 ] >= 0 && cursor[ 1 ] >= 0 ) {
				let selectedCell = this.currentLayerGrid.component.props.gridData[ cursor[ 0 ] ][ cursor[ 1 ] ];
				this.currentCellCache = selectedCell;
				console.log( "[SceneEditor]", "Change working cell @", cursor, "in layer", gridIndex );
			}
			// select first cell if possible
			else if( this.currentLayerGrid.component.props.gridData.length > 0 && this.currentLayerGrid.component.props.gridData[ 0 ].length > 0 ) {
				cursor.splice( 0, 2, 0, 0 );
				console.log( "[SceneEditor]", "Changing working cell @", cursor, "in layer", gridIndex );
			}
			else {
				this.currentCellCache = null;
				console.log( "[SceneEditor]", "Unset working cell in layer", gridIndex );
			}
		}
	},
	computed: {
		currentLayerGrid: function() {
			if( this.currentLayerIndex < 0 ) return undefined;
			return this.gridLayers[ this.currentLayerIndex ];
		}
	},
	created() {
		this.onModalSubmit = this.onSubmitModalCellComponent;
	},
	mounted(){
		// put default grid as first layer
		this.gridLayers.push({
			component: this.scene.body,
			cursor: [-1, -1]
		});
	},
	methods: {
		onCellSelectedInsideGrid( gridIndex, cursor ) {
			if( gridIndex < 0 || gridIndex >= this.gridLayers.length ){
				this.currentCellCache = null;
			}
			// this.currentLayerGrid
			let gridLayerComponent = this.gridLayers[ gridIndex ].component;

			if( cursor && cursor[ 0 ] >= 0 && cursor[ 1 ] >= 0
				&& cursor[ 0 ] < gridLayerComponent.props.gridData.length && cursor[ 1 ] < gridLayerComponent.props.gridData[ cursor[ 0 ] ].length ) {
				console.log( "[SceneEditor]", "Selected cell @", cursor, "in layer", gridIndex );

				let selectedCell = gridLayerComponent.props.gridData[ cursor[ 0 ] ][ cursor[ 1 ] ];

				this.currentCellCache = selectedCell;


				if( selectedCell.component ){

					// Add Layer if is a grid
					if( selectedCell.component instanceof ComponentGrid ) {
						if( this.gridLayers.length-1 <= gridIndex ) {
							this.gridLayers.push({
								component: selectedCell.component,
								cursor: [-1, -1]
							});
						}
						// else we already have the layer
					}
					// Toggle layers
					else {
						let gridLayer;
						while( this.gridLayers.length -1 > gridIndex ) {
							gridLayer = this.gridLayers.pop();
						}
					}
				}
			}
			else {
				console.log( "[SceneEditor]", "Unselected cell in layer", gridIndex );
				this.currentCellCache = null;
				let gridLayer;
				while( this.gridLayers.length -1 > gridIndex ) {
					gridLayer = this.gridLayers.pop();
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


				// if we change current cell and it's a grid then remove its layer
				if( this.newCell.component instanceof ComponentGrid ) {

					let gridLayer;
					while( this.gridLayers.length -1 > this.currentLayerIndex ) {
						gridLayer = this.gridLayers.pop();
					}
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
		getGridCellClass( gridLayer ) {
			let classes = [];
			if (gridLayer && gridLayer.component.props.cellClass) {
				classes = classes.concat( gridLayer.component.props.cellClass );
			}

			if( this.showCSSGrid ) {
				classes.push( 'rounded-0', 'border' );
			}

			return classes;
		},
		getGridCursorCellClass( gridLayer ) {
			let classes = [];

			if( gridLayer && gridLayer.component.props.cursorCellClass ){
				classes = classes.concat( gridLayer.component.props.cursorCellClass );
			}

			if( this.showCSSGrid ) {
				classes.push( "border-primary" );
			}

			return classes;
		},
		getGridSelectedCellClass( gridLayer ) {
			let classes = [];

			if( gridLayer && gridLayer.component.props.selectedCellClass ){
				classes = classes.concat( gridLayer.component.props.selectedCellClass );
			}

			// always show selected border
			if( !this.showCSSGrid ) {
				classes.push( 'rounded-0', 'border' );
			}
			classes.push( 'shadow-lg', "border-success" );

			return classes;
		}
	}
};

/**
 * @PreCondition bind this function to vm instance before calling
 */
export function registerDisposeCallbacks() {
	ComponentMediaPlayer.setDisposeCallback(
		ComponentMediaPlayer.name,
		(that, params) => {

			if( that.props.context && that.props.context.asset && that.props.context.asset.category == "images" ) {
				if( that.props.context.areas.captions ) {

					for (const captionKey in that.props.context.captions) {
						this.$i18n.removeMessageAll( that.props.context.captions[ captionKey ] );
					}
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

	ComponentText.setDisposeCallback(
		ComponentText.name,
		(that, params) => {
			if( that.i18nCategory )
				this.$i18n.removeMessageAll( that.i18nCategory );
		}
	);

	ComponentInput.setDisposeCallback(
		ComponentInput.name,
		(that, params) => {
			if( that.i18nCategory )
				this.$i18n.removeMessageAll( that.i18nCategory );
		}
	);

	ComponentDate.setDisposeCallback(
			ComponentDate.name,
			(that, params) => {
				if( that.i18nCategory )
					this.$i18n.removeMessageAll( that.i18nCategory );
			}
	);

	ComponentTime.setDisposeCallback(
			ComponentTime.name,
			(that, params) => {
				if( that.i18nCategory )
					this.$i18n.removeMessageAll( that.i18nCategory );
			}
	);

	ComponentButton.setDisposeCallback(
			ComponentButton.name,
			(that, params) => {
				if( that.i18nCategory )
					this.$i18n.removeMessageAll( that.i18nCategory );
			}
	);

	ComponentSpinbutton.setDisposeCallback(
			ComponentSpinbutton.name,
			(that, params) => {
				if( that.i18nCategory )
					this.$i18n.removeMessageAll( that.i18nCategory );
			}
	);

	ComponentList.setDisposeCallback(
		ComponentList.name,
		(that, params) => {
			if( that.props.options ) {
				for (const option of that.props.options) {
					if( option.title ) {
						this.$i18n.removeMessageAll( option.title );
					}
				}
			}
		}
	);

	ComponentQRDecoder.setDisposeCallback(
		ComponentQRDecoder.name,
		(that, params) => {
			if( that.props.label ) {
				this.$i18n.removeMessageAll( that.props.label );
			}
			if( that.props.errorMessage ) {
				if( that.props.errorMessage.title ) {
					this.$i18n.removeMessageAll( that.props.errorMessage.title );
				}
				if( that.props.errorMessage.body ) {
					this.$i18n.removeMessageAll( that.props.errorMessage.body );
				}
			}
		}
	);
}