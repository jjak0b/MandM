import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./I18nInputWidget.js";

export const component = {
	template: template,
	props: {
		missions: Array,
		locale: String,
		localesData: Object
	},
	data : function () {
		return {
			nextId: 0,
			missionId: 0,
			missionCache: null
		}
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget
	},
	beforeMount: function () {

	},
	computed: {
		localeTitle: 		function () {  return Number.isNaN( this.missionId ) ? undefined : 'mission.title.' + this.missionId },
		localeDescription: 	function () {  return Number.isNaN( this.missionId ) ? undefined : 'mission.description.' + this.missionId }
	},
	methods: {
		save() {
			let mission = this.missionCache;
			if( !mission ) {
				mission = [];
				this.missions.push( mission );
				mission.id = this.nextId++;
				mission.title = this.localeTitle;
				mission.description = this.localeDescription;
				console.log( "registered new mission: ", mission );
			}

			// set new Id, so new locale data will be available
			this.missionCache = null;
			this.missionId = this.nextId;
			console.log( "Set new ID: " , this.missionId  );

		},
		remove() {
			this.missionId = this.nextId;
			if( this.missionCache ) {
				this.missions.splice(this.missions.indexOf(this.missionCache), 1);
				this.missionCache = null;
			}
		},
		load( mission ) {
			this.missionCache = mission;
			this.missionId = mission.id;
		}
	}
};