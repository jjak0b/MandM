import {template} from "./ToastContainerWidgetTemplate.js";
import { component as toastComponent } from "./ToastWidget.js";

export const component = {
	template: template,
	props:{

	},
	components: {
		"toast-widget": toastComponent
	},
	data() {
		return{
			toasts: []
		}
	},
	methods: {
		push( title, subTitle= null, body, delay = 5000, autohide= true, previewImg = null, previewAlt = null) {
			let i = 0;

			this.toasts.push({
				title: title,
				subTitle: subTitle,
				body: body,
				delay: delay,
				autohide: autohide,
				previewImg: previewImg,
				previewAlt: previewAlt
			});
		},
		remove( toast ) {
			if( toast ) {
				let index = this.toasts.indexOf( toast );
				if( index != null && index != undefined && index >= 0 ){
					this.toasts.splice( index, 1 );
				}
			}
		}
	}
}