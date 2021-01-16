import {template} from "./GridWidgetTemplate.js";
import {KeyboardUtils} from "../js/KeyboardUtils.js";

export const component = {
	template: template,
	props: {
		gridData: Array,
		gridRole: {
			type: String,
			default: "grid"
		},
		gridClass: [Array, String],
		gridTag: {
			type: [String, Object],
			default: "div"
		},
		rowRole: {
			type: String,
			default: "row"
		},
		rowClass: [Array, String],
		rowTag: {
			type: [String, Object],
			default: "div"
		},
		cellRole: {
			type: String,
			default: "gridcell"
		},
		cellClass: [Array, String],
		cellTag: {
			type: [String, Object],
			default: "span"
		},
		cursorCellClass: [Array, String],
		selectedCellClass: [Array, String],
		useIndexes: {
			type: Boolean,
			default: true
		},
		navKey: {
			type: Boolean,
			default: true
		},
		selectable : {
			type: Boolean,
			default: false
		},
		preventFocus: {
			type: Boolean,
			default: false
		},
		value: Array,
		maxRows: Number,
		maxColumns: Number,
	},
	data(){
		return {
			cursor: [
				-1,
				-1
			],
			selectCursor: [
				-1,
				-1
			],
			currentCell: null,
			localPreventFocus: false,
		}
	},
	computed: {
		shouldPreventFocus() { return this.preventFocus || this.localPreventFocus }
	},
	mounted() {
		let cursor = this.value;
		let initRowIndex = -1
		let initCellIndex = -1;

		if( cursor && cursor[ 0 ] >= 0 && cursor[ 1 ] >= 0 ) {
			initRowIndex = cursor[ 0 ];
			initCellIndex = cursor[ 1 ];
		}
		else if( cursor && this.gridData ) {
			// select first cell if needed
			if( this.gridData.length > 0 ) {
				if( this.gridData[ 0 ].length > 0 ) {
					initRowIndex = 0;
					initCellIndex = 0;
				}
			}
		}

		this.localPreventFocus = true;
		this.onSetCursor( [ initRowIndex, initCellIndex ] );
		this.$nextTick( () => this.localPreventFocus = false );
	},
	watch: {
		// parent to child update is not needed because we send the object reference on updated cursor, so any field change
		// happens on same object reference

		// child to parent
		// Note: we send the object reference, so if the internal field are changed, will be updated also on child since it's a reference
		"cursor": function (newVal, oldVal) {
			if( newVal
				&& newVal[0] >= 0
				&& newVal[0] < this.gridData.length
				&& newVal[1] >= 0
				&& newVal[1] < this.gridData[ newVal[0] ].length ) {

				if( !this.shouldPreventFocus )
					this.focusCell( newVal, true );

				this.$emit( 'update:cursor', newVal );
			}
			else {
				this.$emit( 'update:cursor', null );
			}
		},
		"selectCursor": function (newVal, oldVal) {
			if( newVal
				&& newVal[0] >= 0
				&& newVal[0] < this.gridData.length
				&& newVal[1] >= 0
				&& newVal[1] < this.gridData[ newVal[0] ].length ) {

				this.$emit( 'input', newVal );
			}
			else{
				this.$emit( 'input', null );
			}
		},
		"value" : function (newVal, oldVal) {
			if(

				newVal
				&& newVal[0] >= 0
				&& newVal[0] < this.gridData.length
				&& newVal[1] >= 0
				&& newVal[1] < this.gridData[ newVal[0] ].length
			) {
				if( !this.isCellSelected( newVal[0], newVal[ 1 ] ) )
					this.onSetSelectCursor( newVal );
			}
			else{
				this.$emit( 'input', null );
			}
		}
	},
	methods: {
		getCellClass( rowIndex, cellIndex ) {
			let classes = [];

			if( this.cellClass ) {
				classes = classes.concat( this.cellClass );
			}
			if( this.isCellSelected(  rowIndex, cellIndex ) && this.selectedCellClass ) {
				classes = classes.concat( this.selectedCellClass );
			}
			if( this.isCellFocused( rowIndex, cellIndex ) && this.cursorCellClass ) {
				classes = classes.concat( this.cursorCellClass );
			}
			return classes;
		},
		getAriaColIndex(cellIndex) {
			if( !this.useIndexes ) return null;

			return cellIndex+1;
		},
		getAriaRowIndex(rowIndex) {
			if( !this.useIndexes ) return null;

			return rowIndex+1;
		},
		isCellSelected( rowIndex, cellIndex ) {
			if( !this.navKey ) return null;

			if( this.selectable ) {
				return this.selectCursor[0] === rowIndex && this.selectCursor[1] === cellIndex;
			}
			else {
				return null;
			}
		},
		focusCell( cursor, focusFirstChild ) {
			let el = this.getCellElement( cursor );
			if( el ) {
				if (focusFirstChild && el.children && el.children.length > 0) {
					el = el.children[0];
				}
				el.focus();
				// console.log( "focusing", el );
			}
			else {
				// console.log( "not found", cursor, focusFirstChild );
			}
		},
		isCellFocused( rowIndex, cellIndex ) {
			let isFocused =  this.cursor[ 0 ] === rowIndex && this.cursor[ 1 ] === cellIndex;
			return isFocused;
		},
		getCellElement( cursor ) {
			let name = `cell-${cursor[0]}-${cursor[1]}`;

			if( (name in this.$refs ) ) {
				return this.$refs[ name ][ 0 ];
			}
			return null;
		},
		handleOnCellSelect( event, cursor ) {
			if( !this.navKey ) return;

			if( !this.isCellSelected( cursor[0], cursor[1] ) ){
				this.localPreventFocus = true;
				this.onSetSelectCursor( cursor );
				this.$nextTick( () => {
					this.localPreventFocus = false;
				});
			}
		},
		KeyHandler( event ) {
			if( !this.navKey || this.gridData.length < 1) return;

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
				if( col < 0 ) col = 0;
				if( row < 0 ) row = 0;

				row = Math.min( Math.max( 0, row ), this.gridData.length-1 );
				col = Math.min( Math.max( 0, col ), this.gridData[ row ].length-1 );

				this.onSetCursor( [row, col] );

				event.stopPropagation();
			}

		},
		// allow to prevent arrowUp/Down, pageUp/down, home/end scrolling the page
		keyPreventHandler( event ){
			if( !this.navKey ) return;

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
		onSetSelectCursor( value ) {
			if( this.selectable ) {
				this.selectCursor.splice(0, 2, value[0], value[1] );
			}
			this.onSetCursor( value );
		},
		onSetCursor( value ) {
			if( !this.isCellFocused( value[0], value[1] ) )
				this.cursor.splice(0, 2, value[0], value[1] );
		},
		onSetCellData( value ) {
			this.currentCell = value;
		},
		getRowsCount(){
			return this.gridData.length;
		},
		getColumnsCount() {
			if( this.gridData.length > 0 && this.gridData[ this.selectCursor[0] ] ){
				let a_columns = this.gridData[ this.selectCursor[0] ];
				let columnSize = 0;
				for (let i = 0; i < a_columns.length; i++){
					columnSize += a_columns[i].colSize;
				}
				return columnSize;
			}
			return 0;
		},
		AddColumn( shouldAddAfter, cellData, cursor = this.selectCursor ) {
			let rowIndex =  cursor[0];
			let cellIndex = cursor[1];

			if( rowIndex < 0 ) rowIndex = 0;

			if ( !this.gridData[ rowIndex ] )
				this.$set( this.gridData, rowIndex, [] );

			let newCellIndex = cellIndex;
			if( shouldAddAfter && this.gridData[ rowIndex ].length > 0 )
				newCellIndex += 1;

			this.gridData[ rowIndex ].splice(
				newCellIndex,
				0,
				cellData
			);

			let cellPosition = [ rowIndex, newCellIndex ];

			return cellPosition;
		},
		removeCell( cursor = this.selectCursor ) {
			let rowIndex = cursor[0];
			let cellIndex = cursor[1];
			if( rowIndex >= 0 && cellIndex >= 0 && this.gridData.length > 0 && this.gridData[ rowIndex ] ) {
				if ( this.gridData[ rowIndex ].length > 1) {
					let removed = this.gridData[ rowIndex ].splice(cellIndex, 1);


					let isFocused = this.isCellFocused( rowIndex, cellIndex );
					let isSelected = this.isCellSelected( rowIndex, cellIndex );

					// unselecte
					if( isSelected ) {
						this.onSetSelectCursor( [-1, -1] );
					}

					// else the columns is already valid in the new row
					if( isFocused ){
						if (cellIndex >= this.gridData[ rowIndex ].length) {
							cellIndex = this.gridData[ rowIndex ].length - 1
						}
						this.onSetCursor( [ rowIndex, cellIndex ] );
					}

					return [ removed ];
				}
				// if there is 1 column, so remove the row
				else {
					return this.removeRow();
				}
			}
		},
		AddRow( shouldAddAfter, initCell ) {
			let rowIndex = this.selectCursor[0];
			if( rowIndex < 0 ) rowIndex = 0;
			if( shouldAddAfter && this.gridData.length > 0 ){
				rowIndex += 1;
			}

			this.gridData.splice(rowIndex, 0, [  ] );
			return this.AddColumn( false, initCell, [ rowIndex, 0 ] );
		},
		removeRow( cursor = this.selectCursor ) {
			let indexRow = cursor[0];
			let indexCol = cursor[1];

			if( indexRow >= 0 && indexCol >= 0 && this.gridData.length > 0 ) {
				let isFocused = this.isCellFocused( indexRow, indexCol );
				let isSelected = this.isCellSelected( indexRow, indexCol );

				let removedCells = this.gridData.splice( indexRow, 1 );

				if( indexRow >= this.gridData.length )
					indexRow--;

				// at least 1 row left
				if( this.gridData.length > 0 ) {
					// set same index or most near index of same cell index but of current row
					if( indexCol >= this.gridData[ indexRow ].length ){
						indexCol = Math.max( 0, this.gridData[ indexRow ].length - 1 );
					}
					// else the columns is already valid in the new row
				}
				else{
					indexCol = 0;
				}

				// unselect
				if( isSelected ) {
					this.onSetSelectCursor( [-1, -1] );
				}

				// else the columns is already valid in the new row
				if( isFocused ){
					this.onSetCursor( [ indexRow, indexCol ] );
				}

				return removedCells;
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