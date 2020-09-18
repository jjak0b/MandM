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
				this.getJSON( this.name )
					// file has been downloaded so can be loaded
					.done( (jsonData) => {
						self.validity = true;
						self.$emit('import', jsonData);
					})
					// file can't be downloaded for some reason so report it
					.fail( ( xhr, textStatus, error) => {
						self.validity = false;
						console.error( "[StoryEditor]", `Error downloading story "${self.name}"`, "cause:", error );
					})
					.always( () => {
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