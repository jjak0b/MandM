import SceneComponent from "../SceneComponent.js";
import SceneCell from "./Grid/SceneCell.js";
import {I18nUtils} from "../../I18nUtils.js";

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
		this.props.gridRole = unparsed.gridRole || "grid";
		this.props.rowRole = unparsed.rowRole || "row";
		this.props.cellRole = unparsed.cellRole || "gridcell";

		// tags
		this.props.gridTag = unparsed.gridTag || "div";
		this.props.rowTag= unparsed.rowTag || "div";
		this.props.cellTag = unparsed.cellTag || "span";

		// classes
		this.props.rowClass = unparsed.rowClass || [ "row" ];
		this.props.cellClass = unparsed.cellClass || [ "col" ];

		// custom props
		this.props.selectable = unparsed.selectable || false;
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