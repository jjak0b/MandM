import Disposable from "../../Disposable.js";

export default class SceneComponentProps extends Disposable {
	constructor( unparsed ) {
		super( unparsed );
		/**
		 *
		 * @type {String[]}
		 */
		this.class = unparsed.class || [];
		/**
		 *
		 * @type {String|undefined}
		 */
		this.id = unparsed.id || undefined;
	}

	duplicate() {
		return new SceneComponentProps({
			class: JSON.parse( JSON.stringify( this.class )),
			id: this.id ? "" + this.id : undefined
		});
	}
}