export class Asset {
	constructor( name, category, data = null ) {
		this.name = name;
		this.category = category;
		this.url = `/assets/${this.category}/${this.name}`;
		this.data = data;
	}

	getURL() {
		return this.url;
	}

	toString() {
		return this.name;
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
		return new Promise( function(resolve, reject) {
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

				$.ajax(
					self.getURL(),
					requestOptions
				)
					.then( resolve )
					.catch( ( xhr, textStatus, error) => {
						reject( error );
					});
			}
			else {
				reject( null );
			}
		});
	}
}