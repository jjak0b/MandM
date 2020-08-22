import { template } from "./SceneEditorWidgetTemplate.js"
import { component as mediaFormComponent } from "./SceneEditorWidgets/MediaFormWidget.js";
import { component as gridComponent } from "./SceneEditorWidgets/GridWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/I18nMediaPlayerWidget.js";
import { FormUtils} from "/shared//js/FormUtils.js";
import { component as styleEditorComponent } from "./SceneEditorWidgets/StyleEditorWidget.js";

export const component = {
	template: template,
	props: {
		locale: String,
		nextAssetId: Number
	},
	components : {
		"media-form-widget": mediaFormComponent,
		"grid-widget": gridComponent,
		"style-editor-widget": styleEditorComponent
	},
	data() {
		return {
			maxRows: 12,
			maxColumns: 12,
			isFormGridEnabled: false,
			showCSSGrid: true,
			widgetsTable: {
				"i18n-media-player-widget": {
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

			this.$set( this.currentCellCache.component, "value", {} );

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
		}
	}
};