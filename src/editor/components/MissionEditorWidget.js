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
		story: Object,
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
		selectedId: function () { return this.value ? this.value.id : null }
	},
	created() {
		Mission.setDisposeCallback(Mission.name, this.disposeMissionCallback );
	},
	methods: {
		disposeMissionCallback(mission) {
			this.$i18n.removeMessageAll( mission.title );
			this.$i18n.removeMessageAll( mission.description );
		},
		addMission() {
			console.log( "Added mission: ", this.newMission );
			this.missions.push( this.newMission );

			this.$emit('save-story');
		},
		onAddMission() {
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
		onSelectMission( index ) {
			this.selectedIndex = index;
			console.log("Selected mission", this.missions[index])
		},
		onMoveUpMission( index ) {
			if (index !== 0) {
				if (this.missions.splice(index - 1, 0, this.missions.splice(index, 1)[0])) {
					if (this.selectedIndex === index) this.selectedIndex = index - 1;
					else if (this.selectedIndex === index - 1) this.selectedIndex = index;
				}
			}
		},
		onMoveDownMission( index ) {
			if (index !== this.missions.length-1) {
				if (this.missions.splice(index + 1, 0, this.missions.splice(index, 1)[0])) {
					if (this.selectedIndex === index) this.selectedIndex = index + 1;
					else if (this.selectedIndex === index + 1) this.selectedIndex = index;
				}
			}
		},
		onDeleteMission( index ) {
			this.selectedIndex = null;
			let mission = this.missions[ index ];

			if( mission ) {
				console.log( "Removed mission", mission);

				if ( this.story.groups.length > 0 ) {
					for ( const group in this.story.groups ) {
						this.$set( this.story.groups, group,
						this.story.groups[group].filter( element => {
							return element.id !== mission.id;
						} ) );

					}
				}

				mission.dispose();
				this.missions.splice( index, 1);

				this.$emit('save-story');
			}
		},
		onCopyMission( index ) {
			console.log("Copied mission", this.missions[index]);
			this.$emit('copy-mission', new Mission(this.missions[index]));
			this.$emit('save-story');
		},
		onPasteMission( index ) {
			if (!this.copiedMission) {
				return
			}
			console.log("Pasted mission", this.copiedMission);

			this.copiedMission.i18nTupleList = [];
			let newMission = this.copiedMission.duplicate(this.copiedMission.i18nTupleList, 'assets' );
			let localesCopy = I18nUtils.copyOldLabelsToNewLabels( this.copiedMission.locales, this.copiedMission.i18nTupleList );
			for (const locale in localesCopy) {
				this.$i18n.mergeLocaleMessage(locale, localesCopy[locale] );
			}
			this.copiedMission.i18nTupleList = undefined;

			if (index === this.missions.length - 1) index++;
			this.missions.splice(index, 0, newMission);
		},
		onEnableMission( index ) {
			let value = !this.missions[index].active;
			this.$set(this.missions[index], 'active', value);
			if (value) console.log("Enabled mission", this.missions[index])
			else console.log("Disabled mission", this.missions[index])
		}
	}
};