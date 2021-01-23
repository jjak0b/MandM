import {template} from "./UserWidgetMediaPlayerTemplate.js";
import {I18nUtils} from "../js/I18nUtils.js";
import {Asset} from "../js/Asset.js";
import ContextMediaPlayer from "../js/Scene/SceneComponents/MediaPlayer/ContextMediaPlayer.js";

export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		classes: Array,
		context: ContextMediaPlayer,
		locale: String,
		tabindex: {
			type: Number,
			default: null
		}
	},
	data() {
		return {
			// realtime coords
			map: {
				coords:[]
			},
			I18nUtils: I18nUtils,
			captionContent: null,
			indexOverArea: -1,
			updateFlagToggle: false
		}
	},
	created() {

		if( this.context.asset && this.context.asset.category == "images" ) {
			window.addEventListener("resize", this.onResize);
		}
	},
	mounted(){
		if( this.context.asset && this.context.asset.category == "images" ) {

			// trigger the update lifecycle after the DOM is rendered to set the highlight if needed
			setTimeout( () => {
				this.updateFlagToggle = !this.updateFlagToggle;
			}, 0 );
		}
	},
	watch: {
		"context.areas": {
			deep: true,
			handler: function (areas) {
				this.$nextTick( this.updateMapAreas );
			}
		}
	},
	beforeUpdate() {
		if( this.context.asset && this.context.asset.category == "images" ) {
			// here image size may have been changed, resized, and the highlight plugin may be buggy so refresh it
			this.setupHighlight();

			// let the view to update the areas coords
			this.updateMapAreas();
		}
	},
	updated(){
		if( this.context.asset && this.context.asset.category == "images" ) {
			// into before update we let the view to update the map areas coords, so update the highlight plugin with new DOM
			this.setupHighlight();

			// while updating area sizes in editor, highlight it
			if (this.indexOverArea >= 0)
				this.highlightMapArea(this.indexOverArea);
		}
	},
	beforeDestroy(){
		if( this.context.asset && this.context.asset.category == "images" ) {
			window.removeEventListener("resize", this.onResize);
		}
	},
	methods: {
		areaOnClick( indexArea, event ) {
			if( !this.context || !this.context.areas ) return;
			let area = this.context.areas[ indexArea ];
			if( area.value != null ) {
				this.$emit('input', area.value);

				this.$el.dispatchEvent(new Event('change', { bubbles: true }));
			}

			// deprecated, unused
			if( area.action == 'event' ){
				// TODO: dispatch event to window (global) object
			}
		},
		onCueChange( event ){
			let cues = event.target.track.activeCues;
			if( cues && cues[0] && cues[0].text )
				this.captionContent = cues[0].text;
			else
				this.captionContent = "";
		},
		onResize( event ){
			if( this.context.asset && this.context.asset.category == "images" ){
				// trigger vue cicle to update
				this.updateMapAreas();
			}
		},
		resizeArea( indexArea, imgWidth, imgHeight){
			let coords = [];
			if( !this.context || !this.context.areas || !this.context.areas[ indexArea ] )
				return coords;
			let self = this;
			let area = this.context.areas[ indexArea ];

			if( !area.vertices || !area.vertices.length )
				return coords;

			area.vertices.forEach( (vertex, indexVertex) => {
				vertex.forEach( (axisValuePercent, axisIndex) =>{
					let percentRate = axisValuePercent/100.0;
					// x coords are even
					// y coords are odd
					// radius is on even index, so will get width as reference
					if( axisIndex == 0 ) {
						coords.push( percentRate * imgWidth );
					}
					else {
						coords.push( percentRate * imgHeight );
					}
				});
			});
			return coords;
		},
		updateMapAreas() {
			// update a variable to force view update and recompute map coords
			// see :key="updateFlagToggle" on template
			if( !this.context.areas || !this.$refs.img ) return;
			for( let areaIndex = 0; areaIndex < this.context.areas.length; areaIndex++ ) {
				let coords = this.resizeArea(areaIndex, this.$refs.img.width, this.$refs.img.height);
				this.map.coords[areaIndex] = coords ? coords.join() : "";
			}
			this.updateFlagToggle = !this.updateFlagToggle;
		},
		getStringAreaCoords( areaIndex ){
			return ( 0 <= areaIndex && areaIndex < this.map.coords.length ) ? this.map.coords[ areaIndex ] : "";
		},
		setupHighlight(){
			let self = this;
			if( this.context && this.context.areas && this.$refs.img ) {
				let useHighlight = false;
				this.context.areas.forEach( ( area, indexArea ) => {
					if( self.$refs.area && self.$refs.area[indexArea] ) {
						$(self.$refs.area[indexArea]).data(
							"maphilight",
							{
								neverOn: !area.useHighlight,
							}
						);
					}
					if( !useHighlight ) useHighlight = area.useHighlight;
				});
				if( useHighlight ){
					$( this.$refs.img ).maphilight();
				}
			}
		},
		highlightMapArea( indexArea ){
			this.indexOverArea = indexArea;
			if( indexArea >= 0)
				$( this.$refs.area[ indexArea ] ).mouseover();
		},
		unHighlightMapArea( indexArea  ){
			if( indexArea >= 0)
				$( this.$refs.area[ indexArea ] ).mouseout();
			this.indexOverArea = -1;
		},
		getImgAlt() {
			let localeLabel = this.context.captions[0];
			let translation = this.$t( localeLabel );

			if( translation && translation !== localeLabel ) {
				return translation;
			}
			else {
				return "";
			}
		},
		getAreaAlt( area ) {
			let localeLabel = area.alt;
			let translation = this.$t( localeLabel );

			if( translation && translation !== localeLabel ) {
				return translation;
			}
			else {
				return "";
			}
		}
	}
};

export const asyncLoad = function ( resolve, reject ) {
	I18nUtils.fetchCodes()
		.then( function (i18nCodes) {
			resolve( component );
		})
		.catch( (error) => resolve( component ) );
};