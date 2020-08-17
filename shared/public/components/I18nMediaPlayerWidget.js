import {template} from "./I18nMediaPlayerWidgetTemplate.js";
import {i18nContent} from "/edit/components/Translations.js"; // TODO: move this to a shared one

let i18nList = {};

export const component = {
	i18n: i18nContent,
	template: template,
	props: {
		value: Object,
		locale: String,
		tag: String
	},
	data() {
		return {
			i18nList: i18nList,
			subtitleContent: null
		}
	},
	methods: {
		onCueChange( event ){
			let cues = event.target.track.activeCues;
			if( cues && cues[0] && cues[0].text )
				this.subtitleContent = cues[0].text.replace(/\n/g, '<br>');
			else
				this.subtitleContent = "";
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