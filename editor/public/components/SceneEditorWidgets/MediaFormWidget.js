import { template } from "./MediaFormWidgetTemplate.js";
import { asyncLoad as asyncLoadComponentI18nInputWidget} from "../I18nInputWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/I18nMediaPlayerWidget.js";
import {FormUtils} from "/shared/js/FormUtils.js";
import {component as listComponent } from "/shared/components/ListWidget.js";

export const component = {
	template: template,
	components: {
		"list-item-widget": listComponent,
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"i18n-media-player-widget" : asyncLoadComponentI18nMediaPlayer
	},
	props: {
		value: Object,
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
				"audio" : "MediaForm.MediaType.label_audio",
				"video" : "MediaForm.MediaType.label_video",
				"image" : "MediaForm.MediaType.label_image"
			},
			sourceType: null,
			files : {
				main: null,
				subtitles: {}
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
		updateAssetForPreview() {
			let value = {};
			value[ "src" ] = this.files.main ? URL.createObjectURL(this.files.main) : null
			if( this.value.tag == "image" ){
				value[ "subtitles" ] = this.localeImageCaptionLabel;
			}
			else {
				value[ "subtitles" ] = {};
				let files = this.files.subtitles;
				if( files ) {
					Object.keys( files ).forEach( (locale) => {
						let binaryData = [];
						binaryData.push( files[ locale ] );
						value.subtitles[ locale ] = URL.createObjectURL( new Blob(binaryData, {type: "text/vtt" } ) );
					});
				}
			}
			let self = this;
			Object.keys( value )
				.forEach( (key) => self.$set( self.value, key, value[ key ] ) );
		},
		onFileload(event, fileCategory) {
			let file = event.target.files[0];

			if( fileCategory == "main" ) {
				this.files.main = file;
			}
			else if( fileCategory == "subtitle") {
				this.files.subtitles[ this.locale ] = file;
			}
			else{
				console.error( "[MediaForm]", "unknown fileCategory",  fileCategory );
				return;
			}

			this.updateAssetForPreview();
		},
		onAddArea( event ) {
			let data = FormUtils.getAssociativeArray($(event.target).serializeArray());

			let id = this.nextAreaId++;
			let area = {
				id: id,
				alt: this.localeLabelAssetPrefix + '.areaAlt.'+ id,
				shape: data["shape"],
				action: data["action"],
				href: data["action"] == 'url' ? "#" : "#", // TODO: get URL, anchor or "#" otherwise
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
				})(),
			};
			if (!this.value.areas)
				this.$set(this.value, "areas", [] );
			this.value.areas.push( area );
		},
		onRemoveArea( index ) {

			if( 0 <= index && index < this.value.areas.length ) {
				this.$refs.preview.unHighlightMapArea( index );
				this.value.areas.splice( index, 1 );
			}

			if( !this.value.areas.length ) {
				this.$set( this.value, "areas", undefined );
				delete this.value["areas"];
			}
		},
		getLocaleLabelVertexDescription( area, vertexIndex ){
			switch ( area.shape ) {
				case "rect":
					if( vertexIndex == 0 )
						return "MediaForm.areas.label-rectangle-top-left";
					else
						return "MediaForm.areas.label-rectangle-bottom-right";
					break;
				case "circle":
					if( vertexIndex == 0 )
						return "MediaForm.areas.label-circle-centre";
					else
						return "MediaForm.areas.label-circle-radius";
					break;
				default:
					return "";
					break
			}
		}
	}
}