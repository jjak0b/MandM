import {template} from "./AttributeEditorWidgetTemplate.js";
import {component as listWidgetComponent } from "../../../shared/components/ListWidget.js";
import SceneComponent from "../../../shared/js/Scene/SceneComponent.js";
import InputSceneComponent from "../../../shared/js/Scene/InputSceneComponent.js";
import {component as attributeClassEditorWidget } from "./AttributeClassEditorWidget.js";

export const component = {
	template: template,
	components:{
		"list-item-widget": listWidgetComponent,
		attributeClassEditorWidget
	},
	props: {
		value: Object,
		component: SceneComponent,
	},
	data() {
		return {
			selectedAttribute: null,
			tempAttribute: {
				name: null,
				value: null
			}
		};
	},
	computed : {
		attributes() {
			let items = [];
			if( this.component ) {
				for (const name in this.component.attrs) {
					let item = {
						name: name,
						value: this.component.attrs[name],
					}

					items.push(item);
				}
			}
			return items;
		}
	},
	methods: {
		onRemoveAttribute( item ) {
			this.$delete( this.component.attrs, item.name );
		},
		setCurrentAttribute( items ) {
			if( items.length > 0 ) {
				this.selectedAttribute = items[0];
				let item = items[ 0 ];
				this.tempAttribute = Object.assign({}, this.tempAttribute, this.selectedAttribute );
			}
			else {
				this.selectedAttribute = null;
				this.tempAttribute = Object.assign({}, this.tempAttribute, { name: null, value: null } );
			}
		},
		isInteractComponent() {
			return this.component && (this.component instanceof InputSceneComponent);
		},
		onAddAttribute() {
			if( this.selectedAttribute ) {
				if( this.selectedAttribute.name != this.tempAttribute.name ) {
					this.$delete( this.component.attrs, this.selectedAttribute.name );
				}
				this.$set( this.component.attrs, this.tempAttribute.name, this.tempAttribute.value );
			}
			else {
				this.$set( this.component.attrs, this.tempAttribute.name, this.tempAttribute.value );
				this.tempAttribute.name = null;
				this.tempAttribute.value = null;
			}
		}
	}
}