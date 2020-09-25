import { template } from "./StoryFormExportServerTemplate.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";

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
		feedbackValid() { return this.validityName === true ? this.$t('StoryEditorWidget.label-valid-name-available') : ""; },
		feedbackInvalid () { return this.validityName === false ? this.$t('StoryEditorWidget.label-invalid-name-already-exists') : ""; },
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
			this.isLoading = true;
			this.validityOperation = null;

			// Add i18n authored messages from vue-i18n instance
			this.dataExport.assets.locales = I18nUtils.getRootMessages(this.$i18n, "assets" );

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