import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./I18nInputWidget.js";
import {i18nContent} from "./Translations.js";

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

		}
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget
	},
	computed: {
		missionPlaceholderTitle: function () { return this.$t('MissionEditorWidget.label-mission-no-title' ) }
	},
	methods: {
		add() {
			let mission = {};
			mission.id = this.nextId; this.$emit( "inc-id" );
			mission.title = 'mission.' + mission.id + '.title';
			mission.description = 'mission.' + mission.id + '.description';
			console.log( "registered new mission: ", mission );
			this.missions.push( mission );
		},
		remove( index ) {
			let mission = this.missions[ index ];
			if( mission ) {
				i18nContent.removeMessageAll( mission.title );
				i18nContent.removeMessageAll( mission.description );
				this.missions.splice( index, 1);
				this.setValue( null );
			}
		},
		load( index ) {
			let mission = this.missions[ index ];
			if( mission ) {
				this.setValue(mission);
			}
		},
		setValue( value ) {
			this.$emit( 'input', value );
		}
	}
};