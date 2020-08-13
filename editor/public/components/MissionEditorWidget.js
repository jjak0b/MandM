import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./I18nInputWidget.js";

export const component = {
	template: template,
	props: {
		nextId: Number,
		value: Object, // mission cache
		missions: Array,
		locale: String
	},
	data : function () {
		return {
			missionId: 0
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
			let mission = this.value;
			if( !mission ) {
				mission = {};
				this.missions.push( mission );
				mission.id = this.nextId++;
				this.$emit( "inc-Id" );
				mission.title = this.localeTitle;
				mission.description = this.localeDescription;
				console.log( "registered new mission: ", mission );
			}

			// set new Id, so new locale data will be available
			this.missionId = this.nextId;
			console.log( "Set new ID: " , this.missionId  );
			this.setValue( null )
		},
		remove() {
			this.missionId = this.nextId;
			if( this.value ) {
				this.missions.splice(this.missions.indexOf(this.value), 1);
				this.setValue( null );
			}
		},
		load( mission ) {
			// this.value = mission;
			this.missionId = mission.id;
			this.setValue( mission );
		},
		setValue( value ) {
			this.$emit( 'input', value );
		}
	}
};