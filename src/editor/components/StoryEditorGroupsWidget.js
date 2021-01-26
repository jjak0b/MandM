 import {template} from "./StoryEditorGroupsWidgetTemplate.js";
import { component as listComponent } from "../../shared/components/AccessibleListWidget.js";
 import VueQrcode from '/libs/vue-qrcode/vue-qrcode.esm.js';

 Vue.component(VueQrcode.name, VueQrcode);

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		missions: Array,
		groups: Array,
		public: Boolean,
		url: String
	},
	components: {
		"list-widget": listComponent
	},
	computed: {
	},
	data() {
		return {
			currentGroupIndex: null,
			selected: null
		}
	},
	methods: {
		getGroupName( index ) {
			return this.$t('StoryEditorWidget.label-group') + ' ' + (index+1);
		},
		addGroup() {
			this.groups.push([]);
		},
		removeGroup( groupIndex ) {
			this.groups.splice( groupIndex, 1);
		},
		addGroupMission() {
			this.groups[this.currentGroupIndex].push({
				title: this.missions[this.selected].title,
				id: this.missions[this.selected].id,
				active: this.missions[this.selected].active
			});
		},
		deleteGroupMission( groupIndex, missionIndex ) {
			this.groups[groupIndex].splice( missionIndex, 1);
		},
		moveUpGroupMission( groupIndex, missionIndex ) {
			if (missionIndex !== 0) {
				this.groups[groupIndex].splice(
						missionIndex - 1,
						0,
						this.groups[groupIndex].splice(missionIndex, 1)[0]
				)
			}
		},
		moveDownGroupMission( groupIndex, missionIndex ) {
			if (missionIndex !== this.groups[groupIndex].length-1) {
				this.groups[groupIndex].splice(
						missionIndex + 1,
						0,
						this.groups[groupIndex].splice(missionIndex, 1)[0]
				)
			}
		},
		enableGroupMission( groupIndex, missionIndex ) {
			let value = !this.groups[groupIndex][missionIndex].active;
			this.$set(this.groups[groupIndex][missionIndex], 'active', value);
		},
		showModal( index ) {
			this.selected = null;
			this.currentGroupIndex = index;
			this.$bvModal.show('groupsModal');
		},
	}
}