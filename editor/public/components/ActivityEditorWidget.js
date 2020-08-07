import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";

export const component = {
	template: template,
	props: {
		value: Object, // current activity
		locale: String,
		mission : Object
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'activity-tree-widget': activityTreeWidgetComponent
	},
	data() {
		return {
			nextId: 0,
			activityId: null,
			treeRoot: null,
			refresh: false,
			activityTypes: {
				"tell" : "ActivityEditorWidget.activity-type.tell",
				"condition": "ActivityEditorWidget.activity-type.condition"
			}
		}
	},
	watch: {
		'mission' : function( mission ) {
			if( mission ) {
				if( !('tree' in mission) ){
					mission['tree'] = {};
				}
				if( !( 'children' in mission.tree ) ) {
					mission['tree']['children'] = [];
				}
				if( !( 'title' in mission.tree ) ) {
					mission['tree']['title'] = mission.title;
				}
				if( !( 'type' in mission.tree ) ) {
					mission['tree']['type'] = "#";
				}
				this.treeRoot = mission.tree;
				this.setValue( this.treeRoot );
			}
			else{
				this.setValue( null );
			}
		}
	},
	computed: {
		localeTitle: 		function () {  return this.value && Number.isInteger( this.value.id ) ? 'activity.title.' + this.value.id : null },
		localeDescription: 	function () {  return this.value && Number.isInteger( this.value.id ) ? 'activity.description.' + this.value.id : null }
	},
	methods: {
		setValue(value ) {
			this.activityId = value ? value.id : null;
			this.$emit( 'input', value );
		},
		save() {
			let activity = this.value;
			if( !activity ) {
				activity = {};
				this.makeFolder( activity );
				activity.id = this.nextId++;
				activity.title = this.localeTitle;
				activity.description = this.localeDescription;
				console.log( "registered new activity: ", activity );
			}

			// set new Id, so new locale data will be available
			this.activityId = this.nextId;
			console.log( "Set new ID: " , this.activityId  );
			this.setValue( null );
		},
		load( activity ) {
			this.activityId = activity.id;
			this.setValue( activity );
			this.target = activity;
		},
		add: function( self = this.value ) {
			let id = this.nextId++;
			let activity = {
				id: id,
				title: 'activity.title.'+id,
				description: 'activity.description.'+id,
				parent: self,
				children: []
			}

			if( self && self.children )
				self.children.push( activity );
			this.setValue( activity );
		},
		remove() {
			if( this.value ) {
				let parent = this.value.parent;
				parent.children.splice(parent.children.indexOf(this.value), 1);
				this.setValue( parent );
			}
		},
		duplicate(self = this.value ) {
			let id = this.nextId++;
			let activity = {
				id: id,
				title: self.localeTitle+id,
				description: self.localeDescription+id,
				parent: self.parent,
				children: self.children
			}
		},
		isRoot() {
			if( this.value && Number.isInteger( this.value.id )){
				return false;
			}
			return true
		},
		onAdd(){
			let id = this.nextId++;
			let item = {
				id: id,
				title: 'activity.title.'+id,
				description: 'activity.description.'+id,
				type: "tell",
				children: [] // TODO: SET only if conditional activity
			}
			this.setValue( item );
			// item['id'] = this.$refs.treeView.Add( item, parent );

			this.$refs.treeView.add( item );
		},
		onRemove(){
			this.$refs.treeView.remove();
		},
		onDuplicate(){
			this.$refs.treeView.duplicate();
		}
	}
};