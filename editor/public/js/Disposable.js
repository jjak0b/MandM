export default class Disposable {
	static disposeCallbacks = {};

	constructor( unparsedObj ) {
		if( unparsedObj )
			this.setDisposeCallback( unparsedObj.disposeCallback );
	}

	setDisposeCallback( func ) {
		this.disposeCallback = func;
	}

	getDisposeCallback() {
		return this.disposeCallback;
	}

	static setDisposeCallback( classname, func ) {
		Disposable.disposeCallbacks[ classname ] = func;
	}

	static getDisposeCallback( classname ) {
		if( classname in Disposable.disposeCallbacks ) {
			return Disposable.disposeCallbacks[ classname ];
		}
		return null;
	}


	dispose( params ) {
		// first callback associated to instance
		let callback = this.getDisposeCallback();
		if( callback )
			callback( this, params );

		// after callback associated to class
		callback = Disposable.getDisposeCallback( this.constructor.name );
		if( callback )
			callback( this, params );
	}
}