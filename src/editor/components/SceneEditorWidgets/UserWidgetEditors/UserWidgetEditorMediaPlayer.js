import { template } from "./UserWidgetEditorMediaPlayerTemplate.js";
import { asyncLoad as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "../../../../shared/components/UserWidgetMediaPlayer.js";
import {FormUtils} from "../../../../shared/js/FormUtils.js";
import {component as listComponent } from "../../../../shared/components/ListWidget.js";
import {component as inputValidator} from "../../../../shared/components/InputValidatorWidget.js";
import {component as imageAreaTabPanel} from "./UserWidgetEditorMediaPlayer/UserWidgetEditorMediaPlayerImageAreaTabPanel.js";
import {component as assetsManagerBrowser} from "../../AssetsManagerWidgets/AssetsManagerBrowserWidget.js";
import {component as i18nRegion } from "../../i18nWidgets/I18nRegion.js";
import {Asset} from "../../../../shared/js/Asset.js";
import {I18nUtils} from "../../../../shared/js/I18nUtils.js";
import ComponentMediaPlayer from "../../../../shared/js/Scene/SceneComponents/ComponentMediaPlayer.js";
import ContextMediaPlayer from "../../../../shared/js/Scene/SceneComponents/MediaPlayer/ContextMediaPlayer.js";
import ContextMediaPlayerArea from "../../../../shared/js/Scene/SceneComponents/MediaPlayer/ContextMediaPlayerArea.js";

export const component = {
	template: template,
	components: {
		"assets-manager-browser-widget": assetsManagerBrowser,
		"user-widget-editor-media-player-image-area-tabpanel": imageAreaTabPanel,
		"list-item-widget": listComponent,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'i18n-region': i18nRegion,
		"user-widget-media-player" : asyncLoadComponentI18nMediaPlayer
	},
	props: {
		component: ComponentMediaPlayer,
		locale : String
	},
	data() {
		return {
			/*labelMediaSourceTypes : {
				"file" : "SceneEditor.imgSourceTypes.label_file",
				"uri" : "SceneEditor.imgSourceTypes.label_uri"
			},*/
			mediaCategories: [
				"videos",
				"audios",
				"images"
			],
			labelMediaTypes : {
				"audios" : "UserWidgets.MediaPlayer.MediaType.label_audio",
				"videos" : "UserWidgets.MediaPlayer.MediaType.label_video",
				"images" : "UserWidgets.MediaPlayer.MediaType.label_image"
			},
			labelShapeTypes: {
				"default" : "UserWidgets.MediaPlayer.areas.label-shape-full",
				"rect" : "UserWidgets.MediaPlayer.areas.label-shape-rectangle",
				"circle" : "UserWidgets.MediaPlayer.areas.label-shape-circle"
			},
			sourceType: null,
			files : {
				main: null,
				captions: {}
			},
			shouldUseMap: false,
			form: {
				asset: null,
				caption: null,
			}
		}
	},
	watch: {
		"form.asset" : function (asset, prevAsset ) {

			let shouldAddAsset = !!asset;

			if( this.context.asset ) {
				if( !shouldAddAsset || !asset.equals( this.context.asset ) ) {
					this.resetValue( this.context );
				}
				else {
					shouldAddAsset = false;
				}
			}

			if( shouldAddAsset ) {
				this.$set( this.context, "asset", asset );
				this.$root.$emit( "add-dependency", asset );

				this.$set( this.context, "captions", {} );
				if( this.context.asset.category == "images" ) {

					// caption
					this.$set(
						this.context.captions,
						0,
						`${this.component.i18nCategory}.image.caption`
					);
					// label alt
					this.$set(
						this.context.captions,
						1,
						`${this.component.i18nCategory}.image.alt`
					);
				}
			}
		},
		"form.caption" : function ( caption, prevCaption) {
			let shouldAddCaption = !!caption;
			let isCaptionSetForLocale =  this.context.captions && this.locale in this.context.captions;

			if( isCaptionSetForLocale ) {
				if( !shouldAddCaption || !caption.equals(this.context.captions[ this.locale ] )  ) {
					this.context.captions[ this.locale ].dispose();
					this.$delete( this.context.captions, this.locale );
				}
				else {
					shouldAddCaption = false;
				}
			}

			if( shouldAddCaption ) {
				this.$set( this.context.captions, this.locale, caption );
				this.$root.$emit( "add-dependency", this.context.captions[ this.locale ] );
			}
		}
	},
	computed: {
		context() { return this.component.props.context }
	},
	methods: {
		shouldPreview() {
			return this.context && this.context.asset;
		},
		resetValue( value ) {
			console.log( value );

			this.resetCaptions( value );
			this.resetAreas( value );
			if( value.asset && value.asset.dispose )
				value.asset.dispose();

			this.$delete(value, "asset");
		},
		reset() {
			console.log("[MediaFormWidget]", "resetData" );
			this.resetValue( this.context );
			this.form.asset = null;
			this.form.caption = null;
		},
		resetCaptions( value ) {
			if( value.captions ) {
				if (0 in value.captions) {
					this.$i18n.removeMessageAll(value.captions[0]);
					this.$i18n.removeMessageAll(value.captions[1]);
					this.$delete(value.captions, 0);
					this.$delete(value.captions, 1);
				}
				else {
					Object.keys(value.captions)
						.forEach((lang) => {
							if (value.captions[lang]) {
								if( value.captions[lang] )
									value.captions[lang].dispose();
								this.$delete( value.captions, lang );
							}
						});
				}
			}
			this.$delete(value, "captions" );
			this.form.caption = null;
		},
		resetAreas( value ) {
			while( value && value.areas && value.areas.length > 0) {
				let area = value.areas.pop();
				area.dispose();
			}
			this.$delete( value, "areas" );
			this.$set( value, "areas", [] );
		},
		onAddArea( event ) {
			let data = FormUtils.getAssociativeArray($(event.target).serializeArray());
			let id = I18nUtils.getUniqueID();

			let area = new ContextMediaPlayerArea({
				id: id,
				i18nCategory: `${this.component.i18nCategory}.image.area.${id}`,
				shape: data["shape"],
				href: "javascript:void(0)",
				action: null, // TODO: eventAction built into an interaction editor component
				value: null
			});

			this.context.areas.push( area );
		},
		onRemoveArea( index ) {

			if( 0 <= index && index < this.context.areas.length ) {
				this.$refs.preview.unHighlightMapArea( index );
				this.context.areas[ index ].dispose();
				this.context.areas.splice( index, 1 );
			}
		}
	}
}