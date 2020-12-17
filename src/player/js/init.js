import {component as playerComponent} from "../components/Player.js";
import {i18n} from "../../shared/js/i18n.js";

// minimal offline locales
i18n.mergeLocaleMessage( i18n.fallbackLocale,

	{
		"shared": {
			"label-loading": "Loading"
		},
		"Player" : {
			"errors": {
				"label-generic": "Error",
				"label-unable-to-load-resources": "Ops, we can't load resources, please refresh"
			}
		}
	}
);
function main() {
	new Vue( playerComponent );
}
main();