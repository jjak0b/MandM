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
			indexOverArea: -1
		}
	},
	mounted(){
		this.$nextTick( this.updateMapAreas );
		window.addEventListener( "resize",this.updateMapAreas );
	},
	watch: {
		"value.areas": {
			deep: true,
			handler: function (newVal) {
				// if a new area is updated, then update it
				this.$nextTick( this.updateMapAreas );
			}
		}
	},
	updated(){
		if( this.value.tag == "image" ) {
			if( this.indexOverArea >= 0 )
				this.highlightMapArea( this.indexOverArea );
		}
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
		resizeArea( indexArea ){
			if( !this.value || !this.value.areas || !this.value.areas[ indexArea ] )
				return;
			let self = this;
			let area = this.value.areas[ indexArea ];

			if( !area.vertices || !area.vertices.length )
				return;
			let coords = [];
			area.vertices.forEach( (vertex, indexVertex) => {
				vertex.forEach( (axisValuePercent, axisIndex) =>{
					let percentRate = axisValuePercent/100.0;
					// x coords are even
					// y coords are odd
					// radius is on even index, so will get width as reference
					if( axisIndex == 0 ) {
						let width = self.$refs.img.width;
						coords.push( percentRate * width );
					}
					else {
						let height = self.$refs.img.height;
						coords.push( percentRate * height );
					}
				});
			});
			this.$set( this.map.coords, indexArea, coords );
		},
		updateMapAreas() {
			let self = this;
			let useHighlight = false;
			if( this.value && this.value.areas && this.$refs.img ) {
				let self = this;
				this.value.areas.forEach( ( area, indexArea ) => {
					self.resizeArea( indexArea );
					$( self.$refs.area[ indexArea ] ).data(
						"maphilight",
						{
							neverOn: !area.useHighlight,
						}
					);
					if( !useHighlight ) useHighlight = area.useHighlight;
				});
				if( useHighlight )
					$( this.$refs.img ).maphilight();
			}
		},
		getStringAreaCoords( areaIndex ){
			if( this.map && this.map.coords && this.map.coords[ areaIndex ] ){
				return this.map.coords[ areaIndex ].join();
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