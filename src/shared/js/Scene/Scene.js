import Disposable from "../Disposable.js";
import ComponentGrid from "./SceneComponents/ComponentGrid.js";

export default class Scene extends Disposable {
	constructor( unparsedScene ) {
		super( unparsedScene );
		this.body = new ComponentGrid( unparsedScene ? unparsedScene.body : null );
	}

	dispose( params ) {
		this.body.dispose( params );
	}

	addComponent( row, column, component ) {

	}

	duplicate( locales, i18nCategoryPrefix ) {
		let duplicateScene = new Scene( {
			body: this.body.duplicate( locales, i18nCategoryPrefix )
		});

		return duplicateScene;
	}

}