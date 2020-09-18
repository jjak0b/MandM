import { template } from "./StoryFormExportFileTemplate.js";

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

			a.type = 'text/json'
			let data = a.type + ";charset=utf-8," + encodeURIComponent( JSON.stringify( this.dataExport ) );
			a.href = 'data:' + data;
			a.download = 'Story.json';
		}
	}
}