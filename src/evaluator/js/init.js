import {component as evaluatorComponent} from "../components/Evaluator.js";
import {i18n} from "../../shared/js/i18n.js	";

// minimal offline locales
i18n.mergeLocaleMessage( i18n.fallbackLocale,

		{
			"shared": {
				"label-loading": "Loading"
			},
			"Evaluator" : {
				"label-loading-resources": "Loading resources",
				"errors": {
					"label-error": "Error",
					"label-unable-to-load-resources": "Ops, we can't load resources, please refresh"
				}
			}
		}
);
function main() {
	new Vue( evaluatorComponent );
}
main();