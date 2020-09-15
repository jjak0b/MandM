import { template } from "./MediaFormWidgetTemplate.js";
import { asyncLoad as asyncLoadComponentI18nInputWidget} from "../I18nInputWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/I18nMediaPlayerWidget.js";
import {FormUtils} from "/shared/js/FormUtils.js";
import {component as listComponent } from "/shared/components/ListWidget.js";
import {component as inputValidator} from "/shared/components/InputValidatorWidget.js";
import {i18nContent} from "../Translations.js";
import {component as imageAreaTabPanel} from "./MediaFormWidgets/MediaFormImageAreaTabPanel.js";

export const component = {
	template: template,
	components: {
		"media-form-image-area-tabpanel": imageAreaTabPanel,
		"list-item-widget": listComponent,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"i18n-media-player-widget" : asyncLoadComponentI18nMediaPlayer
	},
	props: {
		value: {
			type: Object,
			default: {
				src: null,
				captions: {}
			}
		},
		assetId : Number,
		locale : String
	},
	data() {
		return {
			/*labelMediaSourceTypes : {
				"file" : "SceneEditor.imgSourceTypes.label_file",
				"uri" : "SceneEditor.imgSourceTypes.label_uri"
			},*/
			labelMediaTypes : {
				"audio" : "MediaForm.MediaType.label-audio",
				"video" : "MediaForm.MediaType.label-video",
				"image" : "MediaForm.MediaType.label-image"
			},
			labelShapeTypes: {
				"default" : "MediaForm.areas.label-shape-full",
				"rect" : "MediaForm.areas.label-shape-rectangle",
				"circle" : "MediaForm.areas.label-shape-circle"
			},
			sourceType: null,
			files : {
				main: null,
				captions: {}
			},
			shouldUseMap: false,
			nextAreaId: 0
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
			return this.value && this.value.src;
		},
		reset() {
			console.log("[MediaFormWidget]", "resetData" );
			let self = this;
			this.files.main = null;
			Object.keys( this.files.captions )
				.forEach( (lang) => {
					if( self.files.captions[lang ] ) delete self.files.captions[ lang ] } );

			this.updateCaptions();
			this.updateSource();

			if( this.value.tag == "image" ){
				i18nContent.removeMessageAll( this.value.captions[0] );
			}
			this.$set( this.value, "tag", null );
		},
		updateSource() {
			if( this.value.src ){
				URL.revokeObjectURL( this.value.src );
			}

			this.$set(
				this.value,
				"src",
				this.files.main ? URL.createObjectURL(this.files.main) : null
			);
		},
		updateCaptions() {
			let self = this;

			if( !this.value ) return;

			if( !this.value.captions) this.$set( this.value, "captions", {} );

			if( this.value.tag == "image" ) {
				this.$set(
					this.value.captions,
					0,
					this.localeImageCaptionLabel
				);
			}
			else {
				// revoke and dealloc urls
				if( this.value.captions ){
					Object.keys( this.value.captions ).forEach( ( lang) => {
						if( this.value.captions[ lang ] )
							URL.revokeObjectURL( this.value.captions[ lang ] );
						delete this.value.captions[ lang ];
					});
				}
				// alloc new urls for also new files
				Object.keys( this.files.captions ).forEach( (locale) => {
					let file = this.files.captions[ locale ];
					if( file ){
						self.$set(
							self.value.captions,
							locale,
							URL.createObjectURL( new Blob( [ file ], {type: "text/vtt" } ) )
						);
					}
				});
			}
		},
		onFileload(event, fileCategory) {
			let file = event.target.files[0];

			if( fileCategory == "main" ) {
				this.files.main = file;
			}
			else if( fileCategory == "captions") {
				this.files.captions[ this.locale ] = file;
			}
			else{
				console.error( "[MediaForm]", "unknown fileCategory",  fileCategory );
				return;
			}
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
				i18nContent.removeMessageAll( this.value.areas[ index ].alt );
				this.value.areas.splice( index, 1 );
			}

			if( !this.value.areas.length ) {
				this.$set( this.value, "areas", undefined );
				delete this.value["areas"];
			}
		}
	}
}