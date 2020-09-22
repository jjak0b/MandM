import { template } from "./StoryFormExportFileTemplate.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		dataExport: Object
	},
	data() {
		return {

		}
	},
	methods: {
		updateStoryURI( event ){
			let a = event.target;
			a.href= null;
			a.download = null;
			a.type = null;
			if( !this.dataExport ) return event.preventDefault();

			// Add i18n authored messages from vue-i18n instance
			this.dataExport.assets.locales = I18nUtils.getRootMessages(this.$i18n, "assets" );

			a.type = 'text/json'
			let data = a.type + ";charset=utf-8," + encodeURIComponent( JSON.stringify( this.dataExport ) );
			a.href = 'data:' + data;
			a.download = 'Story.json';
		}
	}
}