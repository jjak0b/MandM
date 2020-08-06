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
			activityId: null
		}
	},
	watch: {
		'mission' : function( mission ) {
			if( mission ) {
				if( !('tree' in mission) ){
					Vue.set( mission, 'tree', { } );
				}
				if( !( 'children' in mission.tree ) ) {
					Vue.set( mission.tree, 'children', [] ) ;
				}
				console.log( "changed mission to:", mission)
				this.setValue( mission.tree );
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
			this.value = value;
			this.activityId = value ? value.id : null;
			this.$emit( 'input', this.value );
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
			this.value = null;
			this.activityId = this.nextId;
			console.log( "Set new ID: " , this.activityId  );
			this.$emit( 'input', this.value );
		},
		load( activity ) {
			this.activityId = activity.id;
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
			if( this.value && Number.isInteger( this.value.id )){
				return false;
			}
			return true
		}
	},
	updated() {
		let self = this;
		let e = document.getElementById('treeView');
		if( !e )
			console.error( e );
		this.$nextTick( function(){
			$(e).jstree({
				"core" : {
					// so that create works
					"check_callback" : true
				}
			});
		});
	}
};
/*
function TreeFromDataToJSON( root, locale, localeData ){
	if( !root ){
		return null;
	}
	else {
		let obj = {
			a_attr: {
				'v-html': VueI18n.$t( root.title, locale, localeData );
			}
		};

		if( root.children ) {
			obj[ 'children' ] = [];
			for (let i = 0; i < root.children.length) {
				obj.children[i] = TreeFromDataToJSON(component, root.children[i])
			}
		}
		return obj;
	}
}*/