import SceneComponent from "../SceneComponent.js";
import SceneCell from "./Grid/SceneCell.js";

export default class ComponentGrid extends SceneComponent {
	constructor( unparsed ) {
		super( unparsed );
		this.grid = [];
		if( unparsed && unparsed.grid ){
			this.grid = unparsed.grid;
			for( let i = 0; i < this.grid.length; i++ ) {
				for (let j = 0; j < this.grid[ i ].length; j++) {
					this.grid[ i ][ j ] = new SceneCell( this.grid[ i ][ j ] );
				}
			}
		}

		// roles
		this.props.gridRole = unparsed.gridRole || "grid";
		this.props.rowRole = unparsed.rowRole || "row";
		this.props.cellRole = unparsed.cellRole || "gridcell";

		// tags
		this.props.gridTag = unparsed.gridTag || "div";
		this.props.rowTag= unparsed.rowTag || "div";
		this.props.cellTag = unparsed.cellTag || "span";

		// classes
		this.props.rowClass = unparsed.rowClass || "row";
		this.props.cellClass = unparsed.cellClass || "col";

		// custom props
		this.props.selectable = unparsed.selectable || false;
	}

	dispose( params ) {
		for( let i = 0; i < this.grid.length; i++ ) {
			for( let j = 0; j < this.grid[ i ].length; j++ ) {
				this.grid[ i ][ j ].dispose( params );
			}
		}
		super.dispose( params );
	}

	duplicate( locales, activityCategory ) {
		let duplicate = new ComponentGrid();
		duplicate.grid = new Array( this.grid.length );
		for( let i = 0; i < this.grid.length; i++ ) {
			duplicate.grid[ i ] = new Array( this.grid[ i ].length );
			for( let j = 0; j < this.grid[ i ].length; j++ ) {
				duplicate.grid[ i ][ j ] = this.grid[ i ][ j ].duplicate( locales, activityCategory );
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


		return duplicate;
	}
}