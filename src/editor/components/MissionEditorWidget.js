import {template} from "./MissionEditorWidgetTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget } from "./i18nWidgets/I18nInputWidget.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";
import { component as listComponent } from "../../shared/components/AccessibleListWidget.js";
import JSTreeNode from "../js/JSTreeNode.js";
import NodeUtils from "../js/NodeUtils.js";
import { I18nString } from "../../shared/js/I18nUtils.js";
import Mission from "../js/Mission.js";


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
			this.$emit('save-story');
			this.$emit('copy-mission', this.missions[index]);
		},
		onDelete( index ) {
			this.selectedIndex = null;
			this.remove(index);
		},
		onPaste( index ) {
			if (!this.copiedMission) {
				return
			}
			this.selectedIndex = null;
			let self = this;
			let i18nConfig = {
				method: "t",
				params: () => [ self.locale, undefined ]
			}
			let copiedData = {};
			copiedData.locales = {};
			copiedData.id = I18nUtils.getUniqueID();
			let data = {};
			let children = [];
			let missionLocales;
			let id = this.copiedMission.id;
			for (const locale in this.copiedMission.locales){
				if (this.copiedMission.locales[locale]) {
					copiedData.locales[locale] = {};
					copiedData.locales[locale].assets = {};
					copiedData.locales[locale].assets.mission = {};
					copiedData.locales[locale].assets.mission[copiedData.id] = this.copiedMission.locales[locale];
				}
			}

			copiedData.mission = this.iterate(this.copiedMission, id, copiedData.id);

			if ( copiedData.mission.tree ) {
				if (copiedData.mission.tree.data) data = copiedData.mission.tree.data;
				if (copiedData.mission.tree.children) children = copiedData.mission.tree.children;
			}
			copiedData.mission.tree = new JSTreeNode(
					copiedData.id,
					new I18nString(this.$i18n, copiedData.mission.title, i18nConfig ),
					NodeUtils.Types.Root,
					data,
					children
			);

			for ( const locale in copiedData.locales ) {
				this.$i18n.mergeLocaleMessage(locale, copiedData.locales[locale]);
			}

			this.missions.splice(index, 0, copiedData.mission);
			this.$emit('save-story');
		},
		iterate(ObjValue, oldValue, newValue) {
			let obj = JSON.parse(JSON.stringify(ObjValue));
			for (let property in obj) {
				if (obj.hasOwnProperty(property)) {
					if (typeof obj[property] == "object") {
						this.$set(obj, property, this.iterate(obj[property], oldValue.toString(), newValue.toString()));
					} else if (typeof obj[property] == "string") {
						this.$set(obj, property,  obj[property].replaceAll(oldValue.toString(), newValue.toString()));
					}
				}
			}
			return obj;
		}
	}
};