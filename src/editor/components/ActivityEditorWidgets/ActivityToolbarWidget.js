import {template} from "./ActivityToolbarWidgetTemplate.js";
import NodeUtils from "../../../shared/js/NodeUtils.js";
import {component as listWidgetComponent} from  "../../../shared/components/ListWidget.js";

export const component = {
	template: template,
	components: {
		'list-widget': listWidgetComponent
	},
	props: {
		type: String,
		copiedActivity: Object,
		grabbedActivity: Object,
		active: Boolean
	},
	computed: {
		isMission: function() { return this.type === NodeUtils.Types.Mission }
	}
};

