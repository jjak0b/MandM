import {template} from "./ActivityToolbarWidgetTemplate.js";

export const component = {
	template: template,
	mounted() {
		$( "#menu" ).menu({
					select: function(e, ui) {
						const event = jQuery.Event( ui.item.text().toLowerCase() + 'Toolbar' );
						$( "#menu" ).trigger(event);
				}
			}
		);
	}
};
