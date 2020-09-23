import { template } from "./StoryFormImportServerTemplate.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";

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
	computed: {
		feedbackValid() { return this.validity === true ? this.$t('StoryEditorWidget.label-valid-downloaded-from-remote') : null; },
		feedbackInvalid () { return this.validity === false? this.$t('StoryEditorWidget.label-invalid-unable-get-from-remote') : null; }
	},
	methods: {
		onSubmit(event) {
			if( this.name ) {
				let self = this;
				this.isLoading = true; // start loading spinner
				this.validity = null; // while downloading reset it
				let reqJSONStory = this.getJSON( this.name );
				let reqJSONLocales = I18nUtils.fetchLocales( `/stories/${this.name}` );
				Promise.all( [reqJSONStory, reqJSONLocales] )
					// file has been downloaded so can be loaded
					.then( (jsonData) => {
						let story = jsonData[0];
						let locales = jsonData[1];
						story.assets.locales = locales;
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