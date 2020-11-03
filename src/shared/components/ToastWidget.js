// Precondition: JQuery, JQuery UI and Bootstrap are required
import {template} from "./ToastWidgetTemplate.js";

export const component = {
	template: template,
	props:{
		title: String,
		subTitle: String,
		body: String,
		delay: Number,
		autohide: Boolean,
		previewImg: String,
		previewAlt: String
	},
	data() {
		return {
			// milliseconds
			duration: 750
		}
	},
	mounted() {
		let element = $( this.$el )[0];
		let self = this;
		// Note: Bootstrap's toast seem to set the transition delay reading the css property, so we will override it
		$( element ).css( "transition-duration", (self.duration/1000) + "s");

		// init toggle of blind effect, so set it as already "played" but it's not ( close animation )
		$( element ).toggle();
		// and then when toast start showing, it will play reversed animation
		$( element ).on( "show.bs.toast", function () {
			$( this ).toggle("blind",{
				direction: "right"
			});
		});
		$( element ).on( "hide.bs.toast", function ( event ) {
			$( this ).toggle("blind",{
				direction: "right"
			});
		});

		// notify parent to delete it
		$( element ).on( "hidden.bs.toast", function () {
			$( this ).toast('dispose');
			self.$emit( "remove");
		});

		$( element ).toast( "show" );
	},
	updated() {
		let element = $( this.$el )[0];
		// close immediately
		$( element ).toggle();
		// refresh animation
		$( element ).toast('show')
	}
}