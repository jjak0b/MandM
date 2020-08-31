import {template} from "./ActivityToolbarWidgetTemplate.js";

export const component = {
	template: template,
	data() {
		return {
			showGrab: true
		}
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

