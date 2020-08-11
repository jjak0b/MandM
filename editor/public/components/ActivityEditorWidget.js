import {template} from "./ActivityEditorWidgetTemplate.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as conditionActivityOptionWidget} from "./ActivityTypeOpEditorWidget.js";
import JSTreeNode from "../js/JSTreeNode.js";

export const component = {
	template: template,
	props: {
		value: Object, // current activity
		locale: String,
		mission : Object
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'option-conditions-widget': conditionActivityOptionWidget,
		'activity-tree-widget': activityTreeWidgetComponent
	},
	data() {
		return {
			nextId: 0,
			activityId: null,
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
					mission['tree'] = new JSTreeNode( undefined, "#", { title: mission.title}, [] );
				}
				console.info( "[ActivityEditor]", "changed mission tree", mission['tree'] );
				this.$nextTick( function () {
					this.loadTree( mission.tree ); // load tree into Tree component
					this.load( mission.tree ); // set current activity
				})
			}
			else{
				this.load( null );
			}
		}
	},
	computed: {
		localeTitle: 		function () {  return this.value && this.value.id && !this.isRoot() ? 'activity.title.' + this.value.id : null },
		localeDescription: 	function () {  return this.value && this.value.id && !this.isRoot() ? 'activity.description.' + this.value.id : null }
	},
	methods: {
		setValue(value ) {
			this.activityId = value ? value.id : null;
			// this.value = value;
			this.$emit( 'input', value );
		},
		updateTree( value ) {
			Vue.set( this.mission, "tree", value );
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
			console.info( "[ActivityEditor]", "Loading current activity", activity );
			this.setValue( activity );
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
			if( this.value && this.value.id== JSTreeNode.DEFAULT.id ){
				return true;
			}
			return false;
		},
		loadTree( tree ) {
			this.$refs.treeView.load( tree );
		},
		onAdd(){
			let id = this.nextId++;
			let item = new JSTreeNode(
				id,
				"tell",
				{
					title: 'activity.title.'+id,
					description: 'activity.description.'+id
				},
				[]
			);
			/*let item = {
				id: id,
				data: {
					title: 'activity.title.'+id,
					description: 'activity.description.'+id
				},
				type: "tell",
				children: []
			}*/
			// this.setValue( item );
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