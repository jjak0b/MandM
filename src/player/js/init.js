import {component as playerComponent} from "../components/Player.js";
import {i18n} from "../../shared/js/i18n.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";

function main() {

	let promiseLocales = I18nUtils.fetchLocales( "./", [ i18n.locale, i18n.fallbackLocale ] );

	promiseLocales
		.then((localesMessages) => {
			playerComponent.i18n.mergeLocaleMessage( i18n.locale, localesMessages[ i18n.locale ] );
			playerComponent.i18n.mergeLocaleMessage( i18n.fallbackLocale, localesMessages[ i18n.fallbackLocale ] );
		})
		.catch( error => { console.error( "Error while getting localesData, continue offline ...", error ); })
		.finally( function () {
			new Vue( playerComponent );
		});
}
main();