import Disposable from "../Disposable.js";
import StyleBody from "./StyleBody.js";
import StyleSelector from "./StyleSelector.js";

export default class StyleRule extends Disposable {
	constructor(unparsed) {
		super(unparsed);
		this.selector = new StyleSelector( unparsed.selector );
		this.body = new StyleBody( unparsed.body );
	}

	toString() {
		return `${ this.selector } {\n${this.body}}`
	}

	dispose(params) {
		this.selector.dispose(params);
		this.body.dispose(params);
		super.dispose(params);
	}
}