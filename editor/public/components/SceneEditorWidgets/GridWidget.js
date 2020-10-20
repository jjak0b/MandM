import {template} from "./GridWidgetTemplate.js";
import {component as rowComponent } from "./GridRowWidget.js";
import {KeyboardUtils} from "/shared//js/KeyboardUtils.js";

export const component = {
	template: template,
	components: {
		"row" : rowComponent
	},
	props: {
		locale: String,
		gridData: Array,
		value: Array,
		maxRows: Number,
		maxColumns: Number,
		showCSSGrid: Boolean,
		nextAssetId: Number,
		localesList: Array
	},
	data(){
		return {
			cursor: [
				0,
				0
			],
			currentCell: null
		}
	},
	watch: {
		// parent to child update is not needed because we send the object reference on updated cursor, so any field change
		// happens on same object reference

		// child to parent
		// Note: we send the object reference, so if the internal field are changed, will be updated also on child since it's a reference
		"cursor": function (newVal, oldVal) {
			if( newVal
				&& newVal[0] < this.gridData.length
				&& newVal[1] < this.gridData[ newVal[0] ].length ) {
				this.$emit( 'input', newVal );
			}
			else{
				this.$emit( 'input', null );
			}
		}
	},
	methods: {
		KeyHandler( event ) {
			let row = this.cursor[0];
			let col = this.cursor[1];
			let shouldStopPropagation = true;

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
				row = Math.min( Math.max( 0, row ), this.gridData.length-1 );
				col = Math.min( Math.max( 0, col ), this.gridData[ row ].length-1 );

				this.onSetCursor( [row, col] );

				this.$emit( "input", this.gridData );
				event.stopPropagation();
			}

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
		onSetCursor( value ) {
			this.cursor.splice(0, 2, value[0], value[1] );
		},
		onSetCellData( value ) {
			this.currentCell = value;
		},
		getRowsCount(){
			return this.gridData.length;
		},
		getColumnsCount() {
			if( this.gridData.length > 0 && this.gridData[ this.cursor[0] ] ){
				let a_columns = this.gridData[ this.cursor[0] ];
				let columnSize = 0;
				for (let i = 0; i < a_columns.length; i++){
					columnSize += a_columns[i].colSize;
				}
				return columnSize;
			}
			return 0;
		},
		AddColumn( shouldAddAfter, cellData ) {
			let index = this.cursor[1];

			if ( !this.gridData[this.cursor[0]] )
				this.$set( this.gridData, this.cursor[0], [] );

			if( shouldAddAfter && this.gridData[this.cursor[0]].length > 0 )
				index += 1;

			this.gridData[this.cursor[0]].splice(
				index,
				0,
				cellData
			);
			this.onSetCursor( [ this.cursor[0], index ] );
		},
		removeCell() {
			let index = this.cursor[1];
			if( this.gridData.length > 0 && this.gridData[this.cursor[0]] ) {
				if ( this.gridData[this.cursor[0]].length > 1) {
					this.gridData[this.cursor[0]].splice(index, 1);
					if (index >= this.gridData[this.cursor[0]].length) {
						index = this.gridData[this.cursor[0]].length - 1
					}
					// else the columns is already valid in the new row
					this.onSetCursor( [ this.cursor[0], index ] );
				}
				// if there is 1 column, so remove the row
				else {
					this.removeRow();
				}
			}
		},
		AddRow( shouldAddAfter ) {
			let index = this.cursor[0];
			if( shouldAddAfter && this.gridData.length > 0 ){
				index += 1;
			}

			this.gridData.splice(index, 0, [  ] );
			this.onSetCursor( [ index, 0 ] );
			this.AddColumn( false,{ colSize: 1, component: null } )
		},
		removeRow() {
			let indexRow = this.cursor[0];
			let indexCol = this.cursor[1];
			if( this.gridData.length > 0 ) {
				this.gridData.splice( indexRow, 1 );
				if( indexRow >= this.gridData.length) {
					indexRow = Math.max( 0, this.gridData.length-1);
				}

				if( this.gridData.length > 0 ) {
					if( indexCol >= this.gridData[ indexRow ].length ){
						indexCol = Math.max( 0, this.gridData[ indexRow ].length - 1 );
					}
					// else the columns is already valid in the new row
				}
				else{
					indexCol = 0;
				}

				this.onSetCursor( [ indexRow, indexCol ] );
			}
		},
		getAvailableColumnsCount() {
			if( this.gridData.length < 1 )
				return -1;
			return this.maxColumns - this.getColumnsCount();
		},
		getAvailableRowsCount() {
			return this.maxRows - this.gridData.length;
		}
	}
}