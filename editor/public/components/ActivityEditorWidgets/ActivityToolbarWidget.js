import {template} from "./ActivityToolbarWidgetTemplate.js";
import NodeUtils from "../../js/NodeUtils.js";

export const component = {
	template: template,
	props: {
		type: String
	},
	data() {
		return {
			showGrab: true
		}
	},
	computed: {
		isMission: function() { return this.type === NodeUtils.Types.Root }
	},
	mounted() {
		$( "#menu" ).menu({
					select: (e, ui) => {
						if( ui.item.attr('id') == "grabToolbar"
							|| ui.item.attr('id') == "dropToolbar" ) {
							this.showGrab = !this.showGrab;
						}
						const event = jQuery.Event( ui.item.attr('id') );
						$( "#menu" ).trigger(event);
				}
			}
		);
	}
};
