import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";
import { component as listComponent } from "../../shared/components/AccessibleListWidget.js";
import JSTreeNode from "../../shared/js/JSTreeNode.js";
import NodeUtils from "../../shared/js/NodeUtils.js";
import { I18nString } from "../../shared/js/I18nUtils.js";
import Mission from "../../shared/js/Mission.js";


export const component = {
	template: template,
	props: {
		value: Object, // mission cache
		missions: Array,
		locale: String,
		localesList: Array,
		copiedMission: Object
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
		Mission.setDuplicateCallback( this.duplicateMissionCallback );
	},
	methods: {
		disposeMissionCallback(mission) {
			console.warn( "callback ", mission );
			this.$i18n.removeMessageAll( mission.title );
			this.$i18n.removeMessageAll( mission.description );
		},
		duplicateMissionCallback( locales, toLabel, fromLabel ) {
			let self = this;
			I18nUtils.setValueFromLabel( locales, self.$i18n, toLabel, fromLabel )
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
		onDelete( index ) {
			this.selectedIndex = null;
			this.remove(index);
		},
		onCopy( index ) {
			console.log("Copied mission", this.missions[index]);
			this.$emit('copy-mission', new Mission(this.missions[index]));
			this.$emit('save-story');
		},
		onPaste( index ) {
			if (!this.copiedMission) {
				return
			}
			console.log("Pasted mission", this.copiedMission);
			let newMission = this.copiedMission.duplicate(this.copiedMission.locales);
			this.missions.splice(index, 0, newMission);
		}
	}
};