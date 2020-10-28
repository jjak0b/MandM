export default class Disposable {
	constructor( unparsedObj ) {
		this.setDisposeCallback( unparsedObj.disposeCallback );
	}

	setDisposeCallback( func ) {
		this.disposeCallback = func;
	}

	getDisposeCallback() {
		return this.disposeCallback;
	}

	dispose( params ) {
		if( this.disposeCallback )
			this.disposeCallback( params );
	}
}