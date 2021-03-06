import {template} from "./UserWidgetEditorMediaPlayerImageAreaTabPanelTemplate.js";
import {asyncLoad as asyncLoadComponentI18nInputWidget} from "../../../i18nWidgets/I18nInputWidget.js";
import ContextMediaPlayerArea from "../../../../../shared/js/Scene/SceneComponents/MediaPlayer/ContextMediaPlayerArea.js";
import {component as typedValueComponent} from "../../../InputTypedValueWidget.js";

export const component = {
	template: template,
	props: {
		locale : String,
		area: ContextMediaPlayerArea,
		areaIndex: Number,
		labelShapeTypes: Object
	},
	components: {
		"input-typed-value": typedValueComponent,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
	},
	data() {
		return {
			validStates: {
				url: null,
				anchor: null
			}
		}
	},
	computed: {
		isValidAnchor: function () {
			if( this.area.href && this.area.href.length > 0 ){
				return document.getElementById( this.area.href ) ? true : false;
			}
			return false;
		},
		isValidURL: function () {
			if( !this.area.href ) return false;

			let url = null;
			try {
				url = new URL(this.area.href);
				return url.protocol === "http:" || url.protocol === "https:";
			}
			catch (e) {
				return false;
			}
		}
	},
	methods: {
		formatterURL(url, event) {
			this.validStates.url = event.target.reportValidity();
			return url;
		},
		formatterAnchor(anchor, event) {
			this.validStates.anchor = event.target.reportValidity();
			if( this.validStates.anchor ) {
				let targetAnchor = document.getElementById( anchor );
				this.validStates.anchor = targetAnchor ? true : null;
			}
			return anchor;
		},
		getLocaleLabelVertexDescription( vertexIndex ){
			switch ( this.area.shape ) {
				case "rect":
					if( vertexIndex == 0 )
						return "UserWidgets.MediaPlayer.areas.label-rectangle-top-left";
					else
						return "UserWidgets.MediaPlayer.areas.label-rectangle-bottom-right";
					break;
				case "circle":
					if( vertexIndex == 0 )
						return "UserWidgets.MediaPlayer.areas.label-circle-centre";
					else
						return "UserWidgets.MediaPlayer.areas.label-circle-radius";
					break;
				default:
					return "";
					break
			}
		},
		onChangeAreaLinkType( event ) {
			let type = event.target.value
			this.$set( this.area, "hrefType", type );
			let href = null;
			let target = null;
			switch( type ) {
				case "anchor":
					target = "_self"
					break;
				case "url":
					target = "_blank"
					break;
				default:
					href = "javascript:void(0)";
			}

			this.$set( this.area, "href", href );
			this.$set( this.area, "target", target );
		}
	}
}