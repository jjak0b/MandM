import {template} from "./I18nMediaPlayerWidgetTemplate.js";
import {i18nContent} from "/edit/components/Translations.js"; // TODO: move this to a shared one

let i18nList = {};

export const component = {
	inheritAttrs: false,
	i18n: i18nContent,
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
			i18nList: i18nList,
			subtitleContent: null,
			indexOverArea: -1,
			updateFlagToggle: false
		}
	},
	mounted(){
		if( this.value.tag == "image" ){
			window.addEventListener( "resize",this.updateMapAreas );
		}
		console.log("b");
	},
	watch: {

	},
	beforeUpdate() {
		if( this.value.tag == "image" ) {
			this.updateMapAreas();
		}
	},
	updated(){

		console.log("a");
	},
	beforeDestroy(){
		if( this.value.tag == "image" ) {
			window.removeEventListener("resize", this.updateMapAreas);
		}
	},
	methods: {
		onCueChange( event ){
			let cues = event.target.track.activeCues;
			if( cues && cues[0] && cues[0].text )
				this.subtitleContent = cues[0].text.replace(/\n/g, '<br>');
			else
				this.subtitleContent = "";
		},
		arrayToCoords( coords ) {
			if( !coords ) return "";
		},
		resizeArea( indexArea, imgWidth, imgHeight){
			console.log( "res", indexArea);
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

			let self = this;
			if( this.value && this.value.areas ) {
				//this.$nextTick( function () {
					let useHighlight = false;
					this.value.areas.forEach( ( area, indexArea ) => {
						$(self.$refs.area[indexArea]).data(
							"maphilight",
							{
								neverOn: ! area.useHighlight,
							}
						);
						if( !useHighlight ) useHighlight = area.useHighlight;
					});
					if( useHighlight ){
						console.log( "m", this.$refs.img, "w", this.$refs.img.width );
						$( this.$refs.img ).maphilight();
					}
				//});
			}
			this.updateFlagToggle = !this.updateFlagToggle;
		},
		getStringAreaCoords( areaIndex ){
			let coords = this.resizeArea( areaIndex, this.$refs.img.width, this.$refs.img.height );
			if( coords ){
				console.log( "coords", coords );
				return coords.join();
			}
			return ""
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
	if( i18nList != null ){
		resolve( component );
	}
	else{
		$.get("/shared/i18n/map")
			.then(map => {
				Object.keys(map)
					.forEach( (key, index) => {
						Vue.set( i18nList, key, map[ key ] );
					});
				console.log( "i18n list received:", i18nList );
				resolve( component );
			})
			.catch( (error) => console.error( "Error getting i18n map" ) );
	}
};