import { template } from "./StoryFormImportServerTemplate.js";

export const component = {
	template: template,
	props: {
		names: Array
	},
	data() {
		return {
			name: null,
			validity: null,
			isLoading: false,
		}
	},
	watch : {
		"name": function (name) {
			this.validity = null;
		}
	},
	methods: {
		onSubmit(event) {
			if( this.name ) {
				let self = this;
				this.isLoading = true; // start loading spinner
				this.validity = null; // while downloading reset it
				let reqJSONStory = this.getJSON( this.name )
				let reqJSONLocales = $.getJSON( `${this.name}/assets/locales/` )
				Promise.all( [reqJSONStory, reqJSONLocales] )
					// file has been downloaded so can be loaded
					.then( (jsonData) => {
						let story = jsonData[0];
						let locales = jsonData[1];
						self.validity = true;
						self.$emit('import', story );
						Object.keys( locales )
							.forEach( locale => self.$i18n.mergeLocaleMessage( locale, locales[ locale ] ) );
					})
					// file can't be downloaded for some reason so report it
					.catch( ( error) => {
						self.validity = false;
						console.error( "[StoryEditor]", `Error downloading story "${self.name}"`, "cause:", error );
					})
					.finally( () => {
						self.isLoading = false; // stop loading spinner
					});
			}
		},
		onReset( event ) {
			this.name = null;
			this.validity = null;
		},
		getJSON( name ) {
			return $.get( `/stories/${name}` );
		}
	}
}