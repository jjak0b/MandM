import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";
import { component as listComponent } from "/shared/components/AccessibleListWidget.js";
import { component as borderlessInput } from "./i18nWidgets/I18nBorderlessInputWidget.js";
import Mission from "../js/Mission.js";


export const component = {
	template: template,
	props: {
		nextId: Number,
		value: Object, // mission cache
		missions: Array,
		locale: String,
		localesList: Array
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'list-widget': listComponent,
		'borderless-input': borderlessInput
	},
	watch: {
		selectedIndex: function (index) {
			this.$emit('select-mission', index);
		}
	},
	data : function () {
		return {
			newMission: {},
			selectedIndex: null
		}
	},

	computed: {
		selectedId: function () { return this.value ? this.value.id : null },
		missionNames: function () {
			let names = [];
			for (const mission of this.missions) {
				names.push(mission.title);
			}
			return names
		}
	},
	created() {
		Mission.setDisposeCallback(Mission.name, this.disposeMissionCallback );
	},
	methods: {
		disposeMissionCallback(mission) {
			console.warn( "callback ", mission );
			this.$i18n.removeMessageAll( mission.title );
			this.$i18n.removeMessageAll( mission.description );
		},
		add() {
			console.log( "registered new mission: ", this.newMission );
			this.missions.push( this.newMission );

			this.$emit('save-story');
		},
		remove( index ) {
			let mission = this.missions[ index ];

			if( mission ) {
				console.log( "REMOVING", mission);
				mission.dispose();
				this.missions.splice( index, 1);
				this.$emit('save-story');
			}
		},
		onAdd() {
			this.$emit( "inc-id" );

			let newMission = {};
			let id = I18nUtils.getUniqueID();

			let prefix = `assets.mission.${ id }`;
			newMission.i18nCategory = prefix;
			newMission.id = id
			newMission.title = prefix + ".title";
			newMission.description =  prefix + ".description";
			this.newMission = new Mission( newMission );

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