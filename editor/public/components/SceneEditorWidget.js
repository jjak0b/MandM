import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "./SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorMediaPlayer.js";
import { component as gridComponent } from "./SceneEditorWidgets/GridWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/UserWidgetMediaPlayer.js";
import { FormUtils} from "/shared//js/FormUtils.js";
import { component as styleEditorComponent } from "./SceneEditorWidgets/StyleEditorWidget.js";
import { component as attributeEditorComponent } from "./SceneEditorWidgets/AttributeEditorWidget.js";
import { component as datepickerComponent } from "/shared/components/UserWidgetDatepicker.js";
import { component as datepickerEditorComponent } from "./SceneEditorWidgets/UserWidgetEditors/UserWidgetEditorDatepicker.js";

export const component = {
	template: template,
	props: {
		scene: Object,
		locale: String,
		nextAssetId: Number
	},
	components : {
		"user-widget-editor-datepicker": datepickerEditorComponent,
		"user-widget-editor-media-player": mediaFormComponent,
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
				"user-widget-datepicker" : {
					editor: "user-widget-editor-datepicker",
					label: "UserWidgets.Datepicker.label-widget-name",
					options: datepickerComponent
				},
				"user-widget-media-player": {
					editor: "user-widget-editor-media-player",
					label: "UserWidgets.MediaPlayer.label-widget-name",
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
	beforeMount(){
		this.scene.style = {};
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
				this.$set( this.currentCellCache, "component", {} );
			}

			this.$set( this.currentCellCache.component, "name",  name );
			if( this.widgetsTable[ name ] )
				this.$set( this.currentCellCache.component, "options", this.widgetsTable[ name ].options );
			this.$set( this.currentCellCache.component, "props", {} );
			this.$set( this.currentCellCache.component, "value", {} ); // even if value should be a prop, will be treated as separate prop
			if( !this.currentCellCache.component.style ) {
				this.$set( this.currentCellCache.component, "style", {} );
			}


			console.log("[SceneEditor]", "Set component data", this.currentCellCache.component );
		}
	}
};