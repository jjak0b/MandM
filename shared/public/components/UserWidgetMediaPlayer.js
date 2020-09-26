import {template} from "./UserWidgetMediaPlayerTemplate.js";
import {I18nUtils} from "../js/I18nUtils.js";

export const component = {
	inheritAttrs: false,
	template: template,
	props: {
		value: Object,
		locale: String,
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
	mounted(){
		if( this.value.tag == "image" ){
			window.addEventListener( "resize", this.onResize );
		}
	},
	watch: {
		"value.areas": {
			deep: true,
			handler: function (areas) {
				this.$nextTick( this.updateMapAreas );
			}
		}
	},
	beforeUpdate() {
		if( this.value.tag == "image" ) {
			// here image size may have been changed, resized, and the highlight plugin may be buggy so refresh it
			this.setupHighlight();

			// let the view to update the areas coords
			this.updateMapAreas();
		}
	},
	updated(){
		if( this.value.tag == "image" ) {
			// into before update we let the view to update the map areas coords, so update the highlight plugin with new DOM
			this.setupHighlight();

			// while updating area sizes in editor, highlight it
			if (this.indexOverArea >= 0)
				this.highlightMapArea(this.indexOverArea);
		}
	},
	beforeDestroy(){
		if( this.value.tag == "image" ) {
			window.removeEventListener("resize", this.onResize);
		}
	},
	methods: {
		areaOnClick( indexArea, event ) {
			if( !this.value || !this.value.areas ) return;
			let area = this.value.areas[ indexArea ];
			if( area.value != null )
				this.$emit( 'input', area.value );


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
			if( this.value.tag == "image" ){
				// trigger vue cicle to update
				this.updateMapAreas();
			}
		},
		resizeArea( indexArea, imgWidth, imgHeight){
			let coords = [];
			if( !this.value || !this.value.areas || !this.value.areas[ indexArea ] )
				return coords;
			let self = this;
			let area = this.value.areas[ indexArea ];

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
			if( !this.value.areas || !this.$refs.img ) return;
			for( let areaIndex = 0; areaIndex < this.value.areas.length; areaIndex++ ) {
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
			if( this.value && this.value.areas && this.$refs.img ) {
				let useHighlight = false;
				this.value.areas.forEach( ( area, indexArea ) => {
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