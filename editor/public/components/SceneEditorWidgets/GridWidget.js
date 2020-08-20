import {template} from "./GridWidgetTemplate.js";
import {component as rowComponent } from "./GridRowWidget.js";
import {KeyboardUtils} from "/shared//js/KeyboardUtils.js";

export const component = {
	template: template,
	components: {
		"row" : rowComponent
	},
	props: {
		currentCellData: Object,
		maxRows: Number,
		maxColumns: Number,
		showCSSGrid: Boolean
	},
	data(){
		return {
			selectedIndex: {
				row: 0,
				col: 0
			},
			gridData : [],
			currentCell: null
		}
	},
	methods: {
		KeyHandler( event ) {
			let row = this.selectedIndex.row;
			let col = this.selectedIndex.col;
			let shouldStopPropagation = true;

			console.log( "event key:", event.key);
			if( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowRight ) ) {
				++col;
			}
			else if( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowLeft ) ) {
				--col;
			}
			else if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowDown ) ) {
				++row;
			}
			else if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowUp ) ) {
				--row;
			}
			else if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.PageDown ) ) {
				row += 5;
			}
			else if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.PageUp ) ) {
				row -= 5;
			}
			else if( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.Home ) ) {
				if( event.ctrlKey ){
					row = 0;
					col = 0;
				}
				else{
					col = 0;
				}
			}
			else if( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.End ) ) {
				if( event.ctrlKey ) {
					row = this.gridData.length-1;
					col = this.gridData[ row ].length-1;
				}
				else{
					col = this.gridData[ row ].length-1;
				}
			}
			else{
				shouldStopPropagation = false;
			}

			if( shouldStopPropagation ){
				event.stopPropagation();
			}
			row = Math.min( Math.max( 0, row ), this.gridData.length-1 );
			col = Math.min( Math.max( 0, col ), this.gridData[ row ].length-1 );

			this.onSetRow( row );
			this.onSetCol( col );
			console.log( this.selectedIndex );

			this.$emit( "input", this.gridData );

		},
		// allow to prevent arrowUp/Down, pageUp/down, home/end scrolling the page
		keyPreventHandler( event ){
			if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowDown )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowUp )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.Home )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.End )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.PageDown )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.PageUp )
			) {
				event.preventDefault();
			}
		},
		onSetCol( value ){
			this.$set( this.selectedIndex, "col", value );
		},
		onSetRow( value ) {
			this.$set( this.selectedIndex, "row", value );
		},
		onSetCellData( value ) {
			this.currentCell = value;
		},
		getRowsCount(){
			return this.gridData.length;
		},
		AddColumn( shouldAddAfter, cellData ) {
			let index = this.selectedIndex.col;

			if ( !this.gridData[this.selectedIndex.row] )
				this.$set( this.gridData, this.selectedIndex.row, [] );

			if( shouldAddAfter && this.gridData[this.selectedIndex.row].length > 0 )
				index += 1;

			this.gridData[this.selectedIndex.row].splice(
				index,
				0,
				cellData
			);
		},
		removeCell() {
			let index = this.selectedIndex.col;
			if( this.gridData.length > 0 && this.gridData[this.selectedIndex.row] ) {
				if ( this.gridData[this.selectedIndex.row].length > 1) {
					this.gridData[this.selectedIndex.row].splice(index, 1);
					if (index >= this.gridData[this.selectedIndex.row].length) {
						index = this.gridData[this.selectedIndex.row].length - 1
						this.onSetCol(index);
					}
					// else the columns is already valid in the new row
				}
				// if there is 1 column, so remove the row
				else {
					this.removeRow();
				}
			}
		},
		AddRow( shouldAddAfter ) {
			let index = this.selectedIndex.row;
			if( shouldAddAfter && this.gridData.length > 0 ){
				index += 1;
			}

			this.gridData.splice(index, 0, [  ] );
			this.AddColumn( false,{ colSize: 1, component: null } )
		},
		removeRow() {
			let indexRow = this.selectedIndex.row;
			let indexCol = this.selectedIndex.col;
			if( this.gridData.length > 0 ) {
				this.gridData.splice( indexRow, 1 );
				if( indexRow >= this.gridData.length) {
					indexRow = Math.max( 0, this.gridData.length-1);
					this.onSetRow( indexRow );
				}

				if( this.gridData.length > 0 ) {
					if( this.gridData[ indexRow ].length >= indexCol ){
						indexCol = Math.max( 0, this.gridData[ indexRow ].length - 1 );
						this.onSetCol( indexCol );
					}
					// else the columns is already valid in the new row
				}
				else{
					this.onSetCol( 0 );
				}
			}
		},
		getAvailableColumnsCount() {
			if( this.selectedIndex.row >= this.gridData.length || this.gridData.length < 1 )
				return -1;
			let a_columns = this.gridData[ this.selectedIndex.row ];
			let columnSize = 0;
			for (let i = 0; i < a_columns.length; i++){
				columnSize += a_columns[i].colSize;
			}
			return this.maxColumns - columnSize;
		},
		getAvailableRowsCount() {
			return this.maxRows - this.gridData.length;
		}
	}
}