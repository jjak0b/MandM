import {template} from "./StoryEditorWidgetTemplate.js";
import {FormUtils} from "/shared//js/FormUtils.js";
import { component as formImportFile } from "./StoryEditorWidgets/StoryFormImportFile.js";
import { component as formImportServer } from "./StoryEditorWidgets/StoryFormImportServer.js";
import { component as formExportFile } from "./StoryEditorWidgets/StoryFormExportFile.js";
import { component as formExportServer } from "./StoryEditorWidgets/StoryFormExportServer.js";
export const component = {
	template: template,
	props: {
		value: Object // story Cache
	},
	components: {

	},
	data() {
		return {
			remoteStories: null, // names
			delayForNextRemoteRequest: 5000,
			gamemodes: {
				0 : "StoryEditorWidget.gamemodes.solo",
				1 : "StoryEditorWidget.gamemodes.group",
				2 : "StoryEditorWidget.gamemodes.class"
			}
		}
	},
	beforeMount() {
		let self = this;
		function keepFetch() {
			self.getRemoteStoryNames()
				.catch( (e) => {
					console.error( "[StoryEditor]", "Unable getting remote story names");
					setTimeout( keepFetch, self.delayForNextRemoteRequest )
				});
		}
		keepFetch();
	},
	methods: {
		getRemoteStoryNames() {
			let self = this;
			return $.get( `/stories/` )
				.done(names => {
					if( names ) self.remoteStories = names;
				});
		},
		notifyValue( type, value ) {
			this.$emit( type, value );
		},
		load( data ) {
			let keys = Object.keys(data);
			for( let i = 0; i < keys.length; i++ ){
				Vue.set( this.value, keys[i], data[ keys[i]] );
			}
		},
	}
}