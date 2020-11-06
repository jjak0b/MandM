import Disposable from "../Disposable.js";
import StyleRule from "./StyleRule.js";
import {Asset} from "../Asset.js";

export default class StyleData extends Disposable {
	constructor( unparsed ) {
		super(unparsed);

		this.asset = unparsed && unparsed.asset ? new Asset( unparsed.asset, null, null ) : null;
		this.rules = unparsed && unparsed.rules ? new Array( unparsed.rules.length ) : [];
		for (let i = 0; i < this.rules.length; i++) {
			this.rules[ i ] = new StyleRule(unparsed.rules[ i ]);
		}
	}

	dispose(params) {
		if( this.asset ) {
			this.asset.dispose( params );
		}

		for (let i = 0; i < this.rules.length; i++) {
			this.rules[ i ].dispose( params );
		}

		super.dispose(params);
	}
}