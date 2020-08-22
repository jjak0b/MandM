import { template } from "./MediaFormWidgetTemplate.js";
import { asyncLoad as asyncLoadComponentI18nInputWidget} from "../I18nInputWidget.js";
import { asyncLoad as asyncLoadComponentI18nMediaPlayer } from "/shared/components/I18nMediaPlayerWidget.js";

export const component = {
	template: template,
	components: {
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
			}
		}
	},
	computed: {
		localeImageCaptionLabel: function () { return (this.assetId != null && this.assetId != undefined) ? 'assets.caption.' + this.assetId : null },
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
		}
	}
}