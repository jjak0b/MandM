import {template} from "./MissionEditorWidgetTemplate.js";
import {i18n} from "./Translations.js"

export const component = {
	template: template,
	props: {
		missions: Array,
		missionId: Number,
		missionTitle:  String,
		missionDescription: String
	},
	data : function () {
		return {
			nextId: 0,
			missionCache: null
		}
	},
	methods: {
		save() {
			let mission = this.missionCache;
			if( !mission ) {
				mission = {};
				this.missions.push( mission );
				this.missionId = this.nextId ++;
				console.log( "registered new mission: ", mission );
			}

			mission.id =  this.missionId;
			mission.title = this.missionTitle;
			mission.description = this.missionDescription;

			// clean
			this.missionId = null;
			this.missionTitle = null;
			this.missionDescription = null;

			this.missionCache = null;
		},
		remove() {
			this.missionId = null;
			this.missionTitle = null;
			this.missionDescription = null;
			if( this.missionCache ) {
				this.missions.splice(this.missions.indexOf(this.missionCache), 1);
				this.missionCache = null;
			}
		},
		load( mission ) {
			this.missionCache = mission;

			this.missionId = mission.id;
			this.missionTitle = mission.title;
			this.missionDescription = mission.description;
		}
	}
}
Vue.component( 'mission-editor-widget', component );

export const vm = new Vue ({
	el: "#mission-editor-widget",
	i18n,
	data: {
		missions: []
	}
});