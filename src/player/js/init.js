import {component as playerComponent} from "../components/Player.js";
import {i18n} from "../../shared/js/i18n.js";

// minimal offline locales
i18n.mergeLocaleMessage( 'en',

	{
		"shared": {
			"label-loading": "Loading"
		},
		"Player" : {
			"errors": {
				"label-generic": "Error",
				"label-unable-to-load-resources": "Ops, we can't load resources, please refresh the app",
				"label-no-story": "No story",
				"label-story-forbidden": "Story forbidden",
				"label-story-not-found": "Story not found",
				"label-error": "Error",
				"label-no-team": "No team",
				"label-invalid-team": "Invalid team"
			}
		}
	}
);
function main() {
	new Vue( playerComponent );
}
main();