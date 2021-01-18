import Disposable from "./Disposable.js";

export class Asset extends Disposable {
	static shouldReuseCache = false;
	/**
	 *
	 * @type {Map<String, Asset>}
	 */
	static cache = new Map();
	constructor( /*Object|String*/assetObjectOrName, category, data = null ) {
		super( null );
		if( "string" == typeof assetObjectOrName ) {
			this.name = assetObjectOrName;
			this.category = category;
			this.url = `/assets/${this.category}/${this.name}`;
			this.data = data;
		}
		else { // parse an unparsed Asset object using construct
			this.name = assetObjectOrName.name;
			this.category = assetObjectOrName.category;
			this.url = `/assets/${this.category}/${this.name}`;
			this.data = assetObjectOrName.data;
		}
		/**
		 *
		 * @type {String}
		 */
		this.blobURL = null;

		if( Asset.shouldReuseCache ) {
			if( !Asset.cache.has( this.url ) ) {
				Asset.cache.set( this.url, this );
			}
		}
	}

	/**
	 *
	 * @param reference {Asset}
	 */
	copyTo( reference ) {
		reference.name = this.name;
		reference.category =this.category;
		reference.url = this.url;
		reference.data = this.data;
		reference.blobURL = this.blobURL;
	}

	duplicate() {
		let duplicate = new Asset( JSON.parse( JSON.stringify( this ) ), null );
		super.duplicate();
		return duplicate;
	}

	toJSON() {
		return {
			name: this.name,
			category: this.category,
			url: this.url,
			data :this.data,
		}
	}

	getURL() {
		let cached = Asset.cache.get( this.url );
		return cached ? cached.blobURL : this.url;
	}

	toString() {
		return this.name;
	}

	equals( asset ) {
		if( asset ) {
			if( this.name == asset.name
				&& this.category == asset.category
				&& this.url == asset.url ) {

				return true;
			}
		}

		return false;
	}

	delete() {
		return $.ajax(
			this.getURL(),
			{
				method: "delete"
			}
		)
	}

	put( onProgress ) {
		let self = this;
			if( self.data ) {

				let formData = new FormData();
				formData.append('upload', self.data, self.name );

				let requestOptions = {
					method: "put",
					data: formData,
					enctype: 'multipart/form-data',
					processData: false,
					contentType: false,
				};

				let xmlHttpRequestGetter = onProgress
					? function(){
						// get the native XmlHttpRequest object
						let xhr = $.ajaxSettings.xhr() ;

						// set the onprogress event handler
						xhr.upload.onprogress = onProgress;
						return xhr ;
					}
					: null;

				if( xmlHttpRequestGetter )
					requestOptions.xhr = xmlHttpRequestGetter;

				return $.ajax(
					self.url,
					requestOptions
				);
			}
			else {
				return Promise.reject( null );
			}
	}

	/**
	 *
	 * @returns {Promise<Response>}
	 */
	fetch() {
		return window.fetch( this.url )
			.then( (response) => {
				if( response.ok ) {
					return response.blob()
						.then((blobData) => {
							this.blobURL = URL.createObjectURL(blobData);
							return response;
						});
				}
				else {
					return Promise.reject(response);
				}
			});
	}
}