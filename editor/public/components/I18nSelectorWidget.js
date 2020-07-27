import {template} from "./I18nSelectorWidgetTemplate.js";
import {i18n} from "./Translations.js";

export const component = {
	template: template,
	props: {
		"global-locales-list": Object,
		"global-locale-selected": String,
		"locale": String
	},
	data(){
		return {
			localesList: {}
		}
	},
	methods: {
		add() {
			let code = this.globalLocaleSelected;
			let lang = this.globalLocalesList[ code ];
			this.$set( this.localesList, code, lang);
		}
	}
};

Vue.component( 'i18n-selector-widget', component );

export const vm = new Vue ({
	el: "#i18n-selector-widget",
	i18n,
	data: {
		i18nList: {}
	},
	mounted: function() {
		$.get("/shared/i18n/map")
		.then(map => {
			Object.keys(map)
			.forEach( (key, index) => {
				vm.$set( vm.i18nList, key, map[ key ] );
			});
		})
		.catch( (error) => console.error( "Error getting i18n map" ) );
	}
});