import { template } from "./StoryFormImportFileTemplate.js";

export const component = {
	template: template,
	data() {
		return {
			file: null,
			fileData: null,
			validity: null,
			isLoading:false
		}
	},
	watch: {
		"file" : function (file) {
			this.validity = null;
			if( file ) {
				let self = this;
				this.isLoading = true; // start loading spinner
				this.getJSON( this.file )
					.then( (jsonData) => {
						self.validity = true;
						console.log( "[StoryEditor]", jsonData );
						self.fileData = jsonData;
					})
					.catch( (error) => {
						self.validity = false;

						console.error( "[StoryEditor]", "Error importing JSON file:", error );
					})
					.finally( () => {
						self.isLoading = false; // stop loading spinner
					});
			}
		}
	},
	methods: {
		getJSON( file ) {
			let self = this;
			return new Promise( function (resolve, reject) {
				if( file.type !== 'application/json') {
					reject( `Input file type "${file.type}" is not valid ! \nPlease upload a valid JSON file type with '.json' extension` );
					return;
				}
				let reader = new FileReader();
				reader.onload = function (onLoadEvent) {
					try {
						resolve( JSON.parse(onLoadEvent.target.result) );
					}
					catch( exception ) {
						reject( exception );
					}
				};
				reader.readAsText( file );
			});
		},
		onSubmit(event) {
			let shouldStopPropagation = true;
			if( this.file ) {
				// file is valid so can be loaded
				if( this.validity ) {
					shouldStopPropagation = false;
					this.$emit( 'import', this.fileData );
				}
			}

			if( shouldStopPropagation ) {
				event.stopPropagation();
			}
		},
		onReset( event ) {
			this.file = null;
			this.fileData = null;
			this.validity = null;
		}
	}
}