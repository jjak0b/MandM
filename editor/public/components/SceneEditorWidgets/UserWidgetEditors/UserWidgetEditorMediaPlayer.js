import { template } from "./UserWidgetEditorMediaPlayerTemplate.js";
import { asyncLoad as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/UserWidgetMediaPlayer.js";
import {FormUtils} from "/shared/js/FormUtils.js";
import {component as listComponent } from "/shared/components/ListWidget.js";
import {component as inputValidator} from "/shared/components/InputValidatorWidget.js";
import {component as imageAreaTabPanel} from "./UserWidgetEditorMediaPlayer/UserWidgetEditorMediaPlayerImageAreaTabPanel.js";
import {component as assetsManagerBrowser} from "../../AssetsManagerWidgets/AssetsManagerBrowserWidget.js";
import {component as i18nRegion } from "../../i18nWidgets/I18nRegion.js";
import {Asset} from "/shared/js/Asset.js";

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
		value: {
			type: Object,
			default: {
				asset: null,
				captions: null
			}
		},
		component: Object,
		assetId : Number,
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
			nextAreaId: 0,
			form: {
				asset: null,
				caption: null,
			}
		}
	},
	created() {
		if( this.component ) {
			this.component.onDispose = (componentData) => this.resetValue( componentData.value );
		}
	},
	watch: {
		"value" : function ( value ) {
			// try to parse the assets when we have an unparsed asset
			if( value && value.asset && !(value.asset instanceof Asset) ) {
				console.log( "[UserWidgetEditorMediaPlayer]", "Parsing assets" );
				value.asset = new Asset( value.asset );
				if( value.captions ) {
					Object.keys( value.captions )
						.forEach( (key) => {
							if( typeof value.captions[ key ] != "string" )
								value.captions[ key ] = new Asset( value.captions[ key ] );
						});
				}
			}
		},
		"form.asset" : function (asset, prevAsset ) {

			console.log( "asset", asset, prevAsset );

			let shouldAddAsset = !!asset;

			if( this.value.asset ) {
				if( !shouldAddAsset || !asset.equals( this.value.asset ) ) {
					this.resetCaptions( this.value );
					if( prevAsset.category == "images") {
						this.resetAreas( this.value );
					}

					this.$root.$emit( "remove-dependency", this.value.asset  );
					this.$delete( this.value, "asset" );
				}
				else {
					shouldAddAsset = false;
				}
			}

			if( shouldAddAsset ) {
				this.$set( this.value, "asset", asset );
				this.$root.$emit( "add-dependency", this.value.asset );

				this.$set( this.value, "captions", {} );
				if( this.value.asset.category == "images" ) {
					this.$set(this.value.captions, 0, this.localeImageCaptionLabel );
				}
			}
		},
		"form.caption" : function ( caption, prevCaption) {
			console.log( "caption", caption, prevCaption );
			let shouldAddCaption = !!caption;
			let isCaptionSetForLocale =  this.value.captions && this.locale in this.value.captions;

			if( isCaptionSetForLocale ) {
				if( !shouldAddCaption || !caption.equals(this.value.captions[ this.locale ] )  ) {
					this.$root.$emit( "remove-dependency", this.value.captions[ this.locale ] );
					if( isCaptionSetForLocale )
						this.$delete( this.value.captions, this.locale );
				}
				else {
					shouldAddCaption = false;
				}
			}

			if( shouldAddCaption ) {
				this.$set( this.value.captions, this.locale, caption );
				this.$root.$emit( "add-dependency", this.value.captions[ this.locale ] );
			}
		}
	},
	computed: {
		localeLabelAssetPrefix: function() { return (this.assetId != null && this.assetId != undefined) ? 'assets.' + this.assetId : null },
		localeImageCaptionLabel: function () {
			let prefix = this.localeLabelAssetPrefix;
			if (prefix)
				return prefix + ".caption";
			return null;
		}
	},
	methods: {
		shouldPreview() {
			return this.value && this.value.asset;
		},
		resetValue( value ) {
			console.warn("free captions");
			this.resetCaptions( value );
			console.warn("free areas");
			this.resetAreas( value );
			console.warn("free asset");
			this.$root.$emit( "remove-dependency", value.asset );
			console.warn("delete ref asset");
			this.$delete(value, "asset");

			this.form.asset = null;
			this.form.caption = null;
		},
		reset() {
			console.log("[MediaFormWidget]", "resetData" );
			this.resetValue( this.value );
		},
		resetCaptions( value ) {
			if( value.captions ) {
				if (0 in value.captions) {
					this.$i18n.removeMessageAll(value.captions[0]);
					this.$delete(value.captions, 0);
				}
				else {
					Object.keys(value.captions)
						.forEach((lang) => {
							if (value.captions[lang]) {
								this.$root.$emit("remove-dependency", value.captions[lang] );
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
				value.areas.pop();
			}
			this.$delete( value, "areas" );
		},
		onAddArea( event ) {
			let data = FormUtils.getAssociativeArray($(event.target).serializeArray());

			let id = this.nextAreaId++;
			let area = {
				id: id,
				alt: this.localeLabelAssetPrefix + '.areaAlt.'+ id,
				shape: data["shape"],
				action: null, // TODO: eventAction built into an interaction editor component
				href: "javascript:void(0)",
				target: null,
				value: null, // TODO: value returned can be a value built with a variable editor component
				vertices: (() => {
					if (data["shape"] == 'circle') {
						return [ [50, 50], [50] ];
					}
					else if (data["shape"] == 'rect') {
						return [ [25, 25], [75, 75] ];
					}
					else {
						return null;
					}
				})()
			};
			if (!this.value.areas)
				this.$set(this.value, "areas", [] );
			this.value.areas.push( area );
		},
		onRemoveArea( index ) {

			if( 0 <= index && index < this.value.areas.length ) {
				this.$refs.preview.unHighlightMapArea( index );
				this.$i18n.removeMessageAll( this.value.areas[ index ].alt );
				this.value.areas.splice( index, 1 );
			}

			if( !this.value.areas.length ) {
				this.$set( this.value, "areas", undefined );
				delete this.value["areas"];
			}
		}
	}
}