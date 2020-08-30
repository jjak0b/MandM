import {template} from "./AttributeEditorWidgetTemplate.js";
import {component as listWidgetComponent } from "/shared/components/ListWidget.js";

export const component = {
	template: template,
	components:{
		"list-item-widget": listWidgetComponent,
	},
	props: {
		value: Object
	},
	data() {
		let data = {
			localeLabels: {
				classes: {
					utility: "StyleEditorWidget.classes.label-utility",
					image: "StyleEditorWidget.classes.label-image",
					text: "StyleEditorWidget.classes.label-text",
					align: "StyleEditorWidget.classes.label-align",
					color: "StyleEditorWidget.classes.label-color",
					border: "StyleEditorWidget.classes.label-border",
					margin: "StyleEditorWidget.classes.label-margin",
					padding: "StyleEditorWidget.classes.label-padding",
					position: "StyleEditorWidget.classes.label-position",
					sizing: "StyleEditorWidget.classes.label-size",
					button: "StyleEditorWidget.classes.label-button"
				}
			},
			classes: {
				utility: [
					"caret",
					"close",
					"clearfix",
					"show",
					"hidden",
					"sr-only",
					"sr-only-focusable",
					"overflow-auto",
					"overflow-hidden",
					"visible",
					"invisible"
				],
				image: [
					"img-responsive",
					"img-rounded",
					"img-circle",
					"img-thumbnail"
				],
				text: [
					"text-justify",
					"text-left",
					"text-center",
					"text-right",
					"text-wrap",
					"text-nowrap",
					"text-truncate",
					"text-break",
					"text-lowercase",
					"text-uppercase",
					"text-capitalize",
					"text-hide",
					"font-weight-bold",
					"font-weight-bolder",
					"font-weight-normal",
					"font-weight-light",
					"font-weight-lighter",
					"font-italic",
					"text-monospace",
					"text-reset",
					"text-muted",
					"text-decoration-none"
				],
				align: [
					"align-baseline",
					"align-top",
					"align-middle",
					"align-bottom",
					"align-text-top",
					"align-text-bottom"
				],
				color: [
					"text-primary",
					"text-secondary",
					"text-success",
					"text-danger",
					"text-warning",
					"text-info",
					"text-light",
					"text-dark",
					"text-white",
					"text-white-50",
					"text-black-50",
					"text-body",
					"bg-primary",
					"bg-secondary",
					"bg-success",
					"bg-danger",
					"bg-warning",
					"bg-info",
					"bg-light",
					"bg-dark",
					"bg-white",
					"bg-transparent",
				],
				border: [
					"border",
					"border-primary",
					"border-secondary",
					"border-success",
					"border-danger",
					"border-warning",
					"border-info",
					"border-light",
					"border-dark",
					"border-white",
					"rounded",
					"rounded-circle",
					"rounded-0",
					"rounded-pill",
					"rounded-lg",
					"rounded-sm"
				],
				margin: [],
				padding: [],
				position: [
					"position-static",
					"position-relative",
					"position-absolute",
					"position-fixed",
					"position-sticky",
					"fixed-top",
					"fixed-bottom",
					"sticky-top"
				],
				sizing: [],
				button: [
					"btn btn-default",
					"btn btn-primary",
					"btn btn-secondary",
					"btn btn-success",
					"btn btn-warning",
					"btn btn-info",
					"btn btn-danger",
					"btn btn-link",
					"btn-lg",
					"btn-sm",
					"btn-xs",
					"btn-block",
					"active",
				]
			}
		};

		/* BOOTSTRAP CLASSES*/
		["m", "p"].forEach(( property) => {

			let destination = property == "m" ? data.classes.margin : data.classes.padding
			// all 4 sides
			destination.push( property + "-auto" );
			for( let i = 0; i < 6; i++ )
				destination.push( property + "-" + i );

			// specific side
			["t", "b", "l", "r", "x", "y"].forEach((side) => {

				destination.push( property + side + "-auto" );
				for( let i = 0; i < 6; i++ )
					destination.push( property + side + "-" + i );

				// negative for only margin
				if( property == "m") {
					for( let i = 1; i < 6; i++ )
						destination.push( property + side + "-n" + i );
				}

			});
		});

		["top", "right", "bottom", "left" ].forEach( (side) => {
			data.classes.border.push( "border-" + side );
			data.classes.border.push( "border-" + side + "-0" );
			data.classes.border.push( "rounded-" + side );
		});

		[ "h", "w", "mw", "mh", "vw", "wh", "min-vw", "min-vh"].forEach( (sizeUnitName) =>{
			[ 25, 50, 75, 100 ].forEach( value => {
				data.classes.sizing.push( sizeUnitName + "-" + value );
			});
		});

		Object.keys( data.classes ).forEach( (group) => {
			data.classes[group].sort();
		});
		return data;
	},
	methods: {
		onAddClass(event){
			let data = new FormData( event.target );
			let classes = [];
			let customValue = data.get( "classnameCustom" );
			let libValue = data.get( "classnameLib" );

			if( customValue )
				classes = classes.concat( customValue.trim().split(" ") );
			if( libValue )
				classes = classes.concat( libValue.split(" ") );

			if( classes.length > 0){
				classes = classes.concat( this.value.class );
				this.$set(
					this.value,
					"class",
					// get unique class list
					classes.filter( (value, index, array) => array.indexOf(value) === index )
				);
				$( event.target ).trigger( "reset" );
			}
		}
	}
}