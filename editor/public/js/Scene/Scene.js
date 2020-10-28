import Disposable from "../Disposable.js";
import SceneCell from "./SceneCell.js";

export default class Scene extends Disposable{
	constructor( unparsedScene ) {
		super( unparsedScene );
		this.grid = [];
		if( unparsedScene.grid ){
			let grid = unparsedScene.grid;
			this.grid = new Array( grid.length );
			for( let i = 0; i < grid.length; i++ ) {
				this.grid[ i ] = new Array( grid[ i ].length);
				for (let j = 0; j < grid[ i ].length; j++) {
					this.grid[ i ][ j ] = new SceneCell( grid[ i ][ j ] );
				}
			}
		}
	}

	dispose( params ) {
		for( let i = 0; i < this.grid.length; i++ ) {
			for( let j = 0; j < this.grid[ i ].length; j++ ) {
				this.grid[ i ][ j ].dispose( params );
			}
		}
		super.dispose( params );
	}

	addComponent( row, column, component ) {

	}

}