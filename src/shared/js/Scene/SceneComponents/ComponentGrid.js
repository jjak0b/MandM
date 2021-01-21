import SceneComponent from "../SceneComponent.js";
import SceneCell from "./Grid/SceneCell.js";

export default class ComponentGrid extends SceneComponent {
	constructor( unparsed ) {
		super( unparsed );
		this.props.gridData = [];
		if( unparsed && unparsed.props.gridData ){
			this.props.gridData = unparsed.props.gridData;
			for( let i = 0; i < this.props.gridData.length; i++ ) {
				for (let j = 0; j < this.props.gridData[ i ].length; j++) {
					this.props.gridData[ i ][ j ] = new SceneCell( this.props.gridData[ i ][ j ] );
				}
			}
		}

		// roles
		this.props.gridRole = unparsed.props.gridRole;
		this.props.rowRole = unparsed.props.rowRole;
		this.props.cellRole = unparsed.props.cellRole;

		// tags
		this.props.gridTag = unparsed.props.gridTag || "div";
		this.props.rowTag= unparsed.props.rowTag || "div";
		this.props.cellTag = unparsed.props.cellTag || "span";

		// classes
		this.props.gridClass = unparsed.props.gridClass || [ "container" ];
		this.props.rowClass = unparsed.props.rowClass || [ "row" ];
		this.props.cellClass = unparsed.props.cellClass || [ "col" ];
		this.props.cursorCellClass = unparsed.props.cursorCellClass || [];
		this.props.selectedCellClass = unparsed.props.selectedCellClass || [];

		// custom props
		this.props.useIndexes = unparsed.props.useIndexes !== undefined ? unparsed.props.useIndexes : false;
		this.props.navKey = unparsed.props.navKey !== undefined ? unparsed.props.navKey : false;
		this.props.selectable = unparsed.props.selectable !== undefined ? unparsed.props.selectable : false;
	}

	/**
	 *
	 * @param testFunction( component: SceneComponent )
	 */
	filter( testFunction ) {
		let array = [];
		if( !testFunction ) return array;

		for (const cells of this.props.gridData) {
			for (const cell of cells) {
				if( cell && cell.component ) {
					if( testFunction( cell.component ) ) {
						array.push(cell.component);
					}
					if( cell.component instanceof ComponentGrid ) {
						array = array.concat( cell.component.filter( testFunction ) );
					}
				}
			}
		}
		return array;
	}

	dispose( params ) {
		for( let i = 0; i < this.props.gridData.length; i++ ) {
			for( let j = 0; j < this.props.gridData[ i ].length; j++ ) {
				this.props.gridData[ i ][ j ].dispose( params );
			}
		}
		super.dispose( params );
	}

	duplicate( locales, i18nCategoryPrefix ) {
		let duplicate = super.duplicate( locales, i18nCategoryPrefix );
		duplicate.props.gridData = new Array( this.props.gridData.length );
		for( let i = 0; i < this.props.gridData.length; i++ ) {
			duplicate.props.gridData[ i ] = new Array( this.props.gridData[ i ].length );
			for( let j = 0; j < this.props.gridData[ i ].length; j++ ) {
				duplicate.props.gridData[ i ][ j ] = this.props.gridData[ i ][ j ].duplicate( locales, i18nCategoryPrefix );
			}
		}
		// roles
		duplicate.props.gridRole = this.props.gridRole;
		duplicate.props.rowRole = this.props.rowRole;
		duplicate.props.cellRole = this.props.cellRole;

		// tags
		duplicate.props.gridTag = this.props.gridTag;
		duplicate.props.rowTag= this.props.rowTag;
		duplicate.props.cellTag = this.props.cellTag;

		// classes
		duplicate.props.rowClass = this.props.rowClass;
		duplicate.props.cellClass = this.props.cellClass;

		// custom props
		duplicate.props.selectable = this.props.selectable;


		return Object.setPrototypeOf( duplicate, ComponentGrid.prototype );
	}
}