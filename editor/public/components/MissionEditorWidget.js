import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";
import { component as listComponent } from "/shared/components/AccessibleListWidget.js";

export const component = {
	template: template,
	props: {
		nextId: Number,
		value: Object, // mission cache
		missions: Array,
		locale: String
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'list-widget': listComponent
	},
	watch: {
		selectedIndex: function (index) {
			this.$emit('select-mission', index);
		}
	},
	data : function () {
		return {
			selectedIndex: null
		}
	},
	computed: {
		missionPlaceholderTitle: function () { return this.$t('MissionEditorWidget.label-mission-no-title' ) },
		selectedId: function () { return this.value ? this.value.id : null },
		missionNames: function () {
			let names = [];
			for (const mission of this.missions) {
				names.push(this.$t(mission.title));
			}
			return names
		}
	},
	methods: {
		add() {
			let mission = {};
			let id = I18nUtils.getUniqueID();
			let prefix = `assets.mission.${ id }`;

			mission.i18nCategory = prefix;
			mission.id = id
			mission.title = prefix + ".title";
			mission.description =  prefix + ".description";
			console.log( "registered new mission: ", mission );

			this.missions.push( mission );
			this.$emit('save-story');
		},
		remove( index ) {
			let mission = this.missions[ index ];
			if( mission ) {
				this.$i18n.removeMessageAll( mission.title );
				this.$i18n.removeMessageAll( mission.description );
				this.missions.splice( index, 1);
				this.setValue( null );
			}
		},
		onAdd() {
			this.$emit( "inc-id" );
			this.$bvModal.show('addMissionModal');
		},
		onSelect( index ) {
			this.selectedIndex = index;
		},
		onMoveUp( index ) {
			if ( this.missions.splice(index-1, 0, this.missions.splice(index, 1)[0]) ) {
				if (this.selectedIndex === index) this.selectedIndex = index-1;
				else if (this.selectedIndex === index-1) this.selectedIndex = index;
			}
		},
		onMoveDown( index ) {
			if ( this.missions.splice(index+1, 0, this.missions.splice(index, 1)[0]) ) {
				if (this.selectedIndex === index) this.selectedIndex = index+1;
				else if (this.selectedIndex === index+1) this.selectedIndex = index;
			}
		},
		onCopy( index ) {

		},
		onPaste( index ) {

		},
		onDelete( index ) {
			this.selectedIndex = null;
			this.remove(index);
		}
	}
};