export default class Disposable {
	static disposeCallbacks = {};
	static aliases = {};

	constructor( unparsedObj ) {
		if( unparsedObj )
			this.setDisposeCallback( unparsedObj.disposeCallback );
	}

	static registerSubClass( subClassname, classname ) {
		if( !(subClassname in Disposable.aliases ) ) {
			Disposable.aliases[ subClassname ] = [];
		}

		if( !Disposable.aliases[ subClassname ].includes( classname ) ) {
			Disposable.aliases[ subClassname ].push( classname );
		}
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
		// search for any candidate
		else if( classname in Disposable.aliases ){
			let aliases = Disposable.aliases[ classname ];
			for (let i = 0; i < aliases.length; i++) {
				if( aliases[ i ] in Disposable.disposeCallbacks ) {
					return Disposable.disposeCallbacks[ aliases[ i ] ];
				}
			}
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