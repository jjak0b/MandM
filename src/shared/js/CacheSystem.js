export class CacheSystem {
	constructor() {
		this._defaultFetch = window.fetch.bind( window );
		window.fetch = this._fetchOverride.bind( this );
		this.version = 1;
	}

	/**
	 *
	 * @returns {Promise<void>}
	 */
	init( version = 1 ) {
		this.version = version;
		return new Promise( (resolve, reject) => {
			if( window.indexedDB) {
				let dbDeleteRequest = indexedDB.deleteDatabase( "cache" );
				dbDeleteRequest.addEventListener( "success", ( ) => {
					let dbOpenRequest = indexedDB.open("cache", version );
					dbOpenRequest.addEventListener( "error", (event) => reject( event.target.error ) );
					dbOpenRequest.addEventListener("upgradeneeded", this._onUpgradeNeeded );
					dbOpenRequest.addEventListener( "success", (event) => resolve() );
				})
			}
			else {
				reject("Indexed DB not supported");
			}
		});
	}

	/**
	 * method that should override window.fetch, and use that as fallback on cache miss
	 * @param url
	 * @param options
	 * @returns {Promise<Response>}
	 * @private
	 */
	_fetchOverride( url, options ) {
		console.log( `[${this.constructor.name}]`, "intercepting request for", url );
		if( url ) {
			return new Promise( (resolve, reject ) => {
				// check cache first !
				this.fetch( url )
					.then( (blob) => {
						resolve( new Response( blob ), {status: 200, statusText: "Ok"} );
					})
					// cache miss or got error
					.catch( (error) => {
						if( error ) {
							reject( error );
						}
						// cache miss -> fetch on remote
						else {
							this._defaultFetch( url, options )
								.then( (response) => {
									if( response.ok ) {
										response.blob()
											.then( (blob) => {
												// update cache first and so resolve
												let endResponse = new Response( blob, { status: response.status } );
												this.update( url, blob)
													.finally( () => resolve( endResponse ) );
											})
											.catch( reject );
									}
									else {
										// resolve to caller
										resolve( response );
									}
								})
								.catch( reject );
						}
					} );
			} );
		}
		else {
			return this._defaultFetch( url, options );
		}
	}

	/**
	 *
	 * @param url
	 * @returns {Promise<Blob>}
	 *
	 */
	fetch( url ) {
		return new Promise( (resolve, reject) => {
			let iDBOpenRequest = indexedDB.open( "cache", this.version );
			iDBOpenRequest.addEventListener( "error", (error) => {
				console.error( `[${this.constructor.name}:fetch]`, "indexedDB Error on opening cache DB, reason:", error );
				reject( error );
			});
			// add our newItem object to the object store
			iDBOpenRequest.addEventListener("success", (event) => {
				/**
				 * @type {IDBDatabase}
				 */
				let db = event.target.result;
				let idbTransaction = db.transaction( ["assets"], "readonly"  );
				idbTransaction.addEventListener( "error", (error) => {
					console.error( `[${this.constructor.name}:fetch]`, "indexedDB Error on transaction init request on cache DB, reason:", error );
					reject(error);
				});

				let idbRequest = idbTransaction.objectStore( "assets" ).get( url );
				idbRequest.addEventListener( "success", (event) => {
					let blob = event.target.result;
					if( blob ) {
						console.log( `[${this.constructor.name}]`, "Cache hit for", url );
						resolve( blob );
					}
					else {
						// CACHE MISS
						console.warn( `[${this.constructor.name}]`, "Cache miss for", url );
						reject();
					}
				});
				idbRequest.addEventListener( "error", ( error ) => {
					console.error( `[${this.constructor.name}:fetch]`, "indexedDB Error on read request on cache DB, reason:", error );
					reject( error );
				});
			});
		});
	}

	/**
	 *
	 * @param url
	 * @param blob
	 * @returns {Promise<void>}
	 */
	update( url, blob ) {
		return new Promise( (resolve, reject) => {
			let iDBOpenRequest = indexedDB.open( "cache" );
			iDBOpenRequest.addEventListener( "error", (error) => {
				console.error( `[${this.constructor.name}:update]`, "indexedDB Error on opening cache DB, reason:", error );
				reject( error );
			});
			// add our newItem object to the object store
			iDBOpenRequest.addEventListener("success", (event) => {
				/**
				 * @type {IDBDatabase}
				 */
				let db = event.target.result;
				let idbTransaction = db.transaction( ["assets"], "readwrite"  );
				let idbRequest = idbTransaction.objectStore( "assets" ).put( blob, url );
				idbRequest.addEventListener( "success", () => resolve() );
				idbRequest.addEventListener( "error", ( error ) => {
					console.error( `[${this.constructor.name}:update]`, "indexedDB Error on update request on cache DB, reason:", error );
					reject( error );
				});
			});
		});
	}

	_onUpgradeNeeded(event) {
		console.log( `[${this.constructor.name}]`, "Create cache DB");
		let db = event.target.result;
		let idbObjectStore = db.createObjectStore(
			"assets",
			{ autoIncrement: false }
		);
	}
}