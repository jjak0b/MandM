import Disposable from "../Disposable.js";
import SceneCell from "./SceneCell.js";

export default class Scene extends Disposable{
	constructor( unparsedScene ) {
		super( unparsedScene );
		this.grid = [];
		if( unparsedScene && unparsedScene.grid ){
			this.grid = unparsedScene.grid;
			for( let i = 0; i < this.grid.length; i++ ) {
				for (let j = 0; j < this.grid[ i ].length; j++) {
					this.grid[ i ][ j ] = new SceneCell( this.grid[ i ][ j ] );
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

	duplicate( locales, activityCategory ) {
		let duplicateScene = new Scene(JSON.parse(JSON.stringify(this)));
		for( let i = 0; i < duplicateScene.grid.length; i++ ) {
			for( let j = 0; j < duplicateScene.grid[ i ].length; j++ ) {
				duplicateScene.grid[ i ][ j ] = this.grid[ i ][ j ].duplicate( locales, activityCategory );
			}
		}

		return duplicateScene;
	}

}