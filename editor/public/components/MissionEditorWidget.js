import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import {I18nUtils} from "/shared/js/I18nUtils.js";
import { component as listComponent } from "/shared/components/AccessibleListWidget.js";
import { component as borderlessInput } from "./i18nWidgets/I18nBorderlessInputWidget.js";


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
	methods: {
		add() {
			console.log( "registered new mission: ", this.newMission );
			this.missions.push( this.newMission );

			this.$emit('save-story');
		},
		remove( index ) {
			let mission = this.missions[ index ];
			if( mission ) {
				this.$i18n.removeMessageAll( mission.title );
				this.$i18n.removeMessageAll( mission.description );
				this.missions.splice( index, 1);
				this.$emit('save-story');
			}
		},
		onAdd() {
			this.$emit( "inc-id" );

			this.newMission = {};
			let id = I18nUtils.getUniqueID();

			let prefix = `assets.mission.${ id }`;
			this.newMission.i18nCategory = prefix;
			this.newMission.id = id
			this.newMission.title = prefix + ".title";
			this.newMission.description =  prefix + ".description";

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