import { template } from "./StoryFormExportServerTemplate.js";

export const component = {
	template: template,
	props: {
		dataExport: Object,
		names: Array
	},
	data() {
		return {
			name: null,
			validityName: null,
			validityOperation: null,
			validityForm: null,
			isLoading: false
		}
	},
	computed: {
		canSubmit: function () {
			return this.validityForm == null ? this.validityName : this.validityForm;
		}
	},
	watch: {
		"name" : function (name) {
			this.validityOperation = null;
			this.validityForm = null;
			if( name ) {
				// if names is not defined is because server couldn't be reached
				this.validityName = this.names ? !this.names.includes( this.name ) : null;
			}
			else {
				this.validityName = null;
			}
		}
	},
	methods: {
		onSubmit( event ) {
			if( !this.canSubmit ){
				event.stopPropagation();
				return;
			}
			let self = this;
			let data = {
				story: self.story,
				locales: {}
			};
			this.isLoading = true;
			this.validityOperation = null;
			self.$i18n.availableLocales.forEach( (locale) => {
				if( self.$i18n.messages[ locale ] && self.$i18n.messages[ locale ].assets )
					data.locales[ locale ] = self.$i18n.messages[ locale ].assets;
			});
			console.log( JSON.stringify( data ) );
			$.ajax( `/stories/${self.name}`, {
				method: "put",
				contentType: 'application/json',
				data: JSON.stringify( self.dataExport )
			})
				.done( (data) => {
					self.validityOperation = true;
				})
				.fail( ( xhr, textStatus, error) => {
					self.validityOperation = false;
					console.error("[StoryEditor]", `Failed to create or replace the Story ${self.name}`, error );
				})
				.always( () => {
					self.isLoading = false;
					this.$emit("update-names");
				});
		}
	}
}