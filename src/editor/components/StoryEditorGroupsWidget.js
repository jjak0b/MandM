import {template} from "./StoryEditorGroupsWidgetTemplate.js";
import { component as listComponent } from "../../shared/components/AccessibleListWidget.js";

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		missions: Array,
		groups: Array
	},
	components: {
		"list-widget": listComponent
	},
	watch: {
		missions: function () { this.getMissionNames() }
	},
	computed: {
	},
	data() {
		return {
			missionNames: [],
			currentGroupIndex: null,
			selected: ""
		}
	},
	methods: {
		addGroup() {
			this.groups.push([]);
		},
		removeGroup( groupIndex ) {
			this.groups.splice( groupIndex, 1);
		},
		add() {
			this.groups[this.currentGroupIndex].push(this.selected);
		},
		deleteName( groupIndex, missionIndex ) {
			this.groups[groupIndex].splice( missionIndex, 1);
		},
		moveUp( groupIndex, missionIndex ) {
			this.groups[groupIndex].splice(
				missionIndex-1,
				0,
				this.groups[groupIndex].splice(missionIndex, 1)[0]
			)
		}
		,
		moveDown( groupIndex, missionIndex ) {
			this.groups[groupIndex].splice(
				missionIndex+1,
				0,
				this.groups[groupIndex].splice(missionIndex, 1)[0]
			)
		},
		showModal( index ) {
			this.currentGroupIndex = index;
			this.$bvModal.show('groupsModal');
		},
		getMissionNames() {
			this.missionNames = [];
			for (const mission of this.missions) {
				this.missionNames.push(mission.title);
			}
		}
	},
	mounted() {
		this.getMissionNames();
	}
}