import {template} from "./ActivityToolbarWidgetTemplate.js";
import NodeUtils from "../../../shared/js/NodeUtils.js";

export const component = {
	template: template,
	props: {
		type: String,
		copiedActivity: Object,
		grabbedActivity: Object,
		active: Boolean
	},
	computed: {
		isMission: function() { return this.type === NodeUtils.Types.Mission }
	},
	mounted() {
		$( "#menu" ).menu({
			select: (e, ui) => {
				const event = jQuery.Event( ui.item.attr('id') );
				$( "#menu" ).trigger(event);
			}
		});
	}
};

