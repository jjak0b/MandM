import {template} from "./StyleEditorWidgetTemplate.js";
import {component as inputRangeNumberComponent} from "./SceneEditorWidgets/InputRangeNumberWidget.js";
import {component as styleLengthComponent } from "./StyleEditorWidgets/StyleLengthWidget.js";
import {component as styleColorComponent } from "./StyleEditorWidgets/StyleColorWidget.js";
import {component as styleStringComponent } from "./StyleEditorWidgets/StyleStringWidget.js";
import {component as styleURIComponent } from "./StyleEditorWidgets/StyleURIWidget.js";
import {component as styleSelectorComponent } from "./StyleEditorWidgets/StyleSelectorFieldset.js";
import {component as listWidgetComponent } from "../../shared/components/ListWidget.js";
import {FormUtils} from "../../shared/js/FormUtils.js";
import StyleRule from "../../shared/js/StyleData/StyleRule.js";
import StyleProperty from "../../shared/js/StyleData/StyleProperty.js";
import StyleData from "../../shared/js/StyleData/StyleData.js";
import {component as assetManagerBrowser} from "./AssetsManagerWidgets/AssetsManagerBrowserWidget.js";

export const component = {
	template: template,
	components: {
		"assets-manager-browser": assetManagerBrowser,
		"style-string-widget": styleStringComponent,
		"style-uri-widget": styleURIComponent,
		"style-length-widget": styleLengthComponent,
		"style-color-widget": styleColorComponent,
		"style-selector-widget": styleSelectorComponent,
		"list-item-widget": listWidgetComponent,
		"input-range-number-widget" : inputRangeNumberComponent
	},
	props: {
		value: StyleData
	},
	data(){
		let data = {
			selector: null,
			rules: [],
			properties: {
				"width": {
					parameters: [
						{
							defaults: [ "auto" ],
							options: styleLengthComponent,
						}
					]
				},
				"height": {
					parameters: [
						{
							defaults: [ "auto" ],
							options: styleLengthComponent,
						}
					]
				},
				"position": {
					parameters: [
						{
							defaults: [
								"static",
								"absolute",
								"fixed",
								"relative",
								"sticky"
							],
							options: styleStringComponent,
						}
					]
				},
				"top": {
					parameters: [
						{
							defaults: [ "auto" ],
							options: styleLengthComponent,
						}
					]
				},
				"resize": {
					parameters: [
						{
							defaults: [
								"none",
								"both",
								"horizontal",
								"vertical"
							],
							options: styleStringComponent,
						}
					]
				},
				"overflow-x": {
					parameters: [
						{
							defaults: [
								"auto",
								"visible",
								"hidden",
								"scroll"
							],
							options: styleStringComponent,
						}
					]
				},
				// background
				"background-color": {
					parameters: [
						{
							defaults: [ "transparent" ],
							options: styleColorComponent
						}
					]
				},
				"background-image": {
					parameters: [
						{
							defaults: [ "none" ],
							options: styleURIComponent
						}
					]
				},
				"background-position": {
					parameters: [
						{
							defaults: [
								"center",
								"left",
								"right"
							],
							options: styleStringComponent
						},
						{
							defaults: [
								"center",
								"top",
								"bottom"
							],
							options: styleStringComponent
						}
					]
				},
				"background-size": {
					parameters: [
						{
							defaults: [
								"auto",
								"cover",
								"contain"
							],
							options: styleLengthComponent
						},
						{
							defaults: [
								"auto",
								"cover",
								"contain"
							],
							options: styleLengthComponent
						}
					]
				},
				"background-repeat": {
					parameters: [
						{
							defaults: [
								"repeat",
								"repeat-x",
								"repeat-y",
								"no-repeat",
								"space",
								"round",
							],
							options: styleStringComponent
						}
					]
				},
				"background-origin": {
					parameters: [
						{
							defaults: [
								"border-box",
								"padding-box",
								"content-box"
							],
							options: styleStringComponent
						}
					]
				},
				"background-clip": {
					parameters: [
						{
							defaults: [
								"border-box",
								"padding-box",
								"content-box"
							],
							options: styleStringComponent
						}
					]
				},
				"background-attachment": {
					parameters: [
						{
							defaults: [
								"scroll",
								"fixed",
								"local"
							],
							options: styleStringComponent
						}
					]
				},
				// border
				"border-top-width": {
					parameters: [
						{
							defaults: [
								"thin",
								"medium",
								"thick"
							],
							options: styleLengthComponent
						}
					]
				},
				"border-top-style": {
					parameters: [
						{
							defaults: [
								"none",
								"hidden",
								"dotted",
								"dashed",
								"solid",
								"double",
								"groove",
								"ridge",
								"inset",
								"outset"
							],
							options: styleStringComponent
						}
					]
				},
				"border-top-color": {
					parameters: [
						{
							defaults: [
								"transparent"
							],
							options: styleColorComponent
						}
					]
				},
				"border-top-radius": {
					parameters: [
						{
							defaults: [],
							options: styleLengthComponent
						}
					]
				},
				"border-top-spacing": {
					parameters: [
						{
							defaults: [],
							options: styleLengthComponent
						}
					]
				},
				"margin-top": {
					parameters: [
						{
							defaults: [ "auto" ],
							options: styleLengthComponent
						}
					]
				},
				"padding-top": {
					parameters: [
						{
							defaults: [ ],
							options: styleLengthComponent
						}
					]
				},
				"font-style" : {
					parameters: [
						{
							defaults: [
								"normal",
								"italic",
								"oblique"
							],
							options: styleStringComponent
						}
					]
				},
				"font-variant" : {
					parameters: [
						{
							defaults: [
								"normal",
								"small-caps",
							],
							options: styleStringComponent
						}
					]
				},
				"font-weight" : {
					parameters: [
						{
							defaults: [
								"normal",
								"bold",
								"bolder",
								"lighter",
								"100",
								"200",
								"300",
								"400",
								"500",
								"600",
								"700",
								"800",
								"900"
							],
							options: styleStringComponent
						},
					]
				},
				"font-size" : {
					parameters: [
						{
							defaults: [
								"medium",
								"xx-small",
								"x-small",
								"small",
								"large",
								"x-large",
								"xx-large",
								"smaller",
								"larger",
							],
							options: styleStringComponent
						}
					]
				},
				"font-family" : {
					parameters: [
						{
							// just some common fonts
							defaults: [
								"Georgia",
								"Palatino Linotype",
								"Book Antiqua",
								"Times New Roman",
								"Arial",
								"Helvetica",
								"Arial Black",
								"Impact",
								"Lucida Sans Unicode",
								"Tahoma",
								"Verdana",
								"Courier New",
								"Lucida Console"
							],
							options: styleStringComponent
						},
						{ // give only 1 fallback
							defaults: []
						},
						{
							defaults: [
								"serif",
								"sans-serif",
								"cursive",
								"fantasy",
								"monospace"
							],
							options: styleStringComponent
						}
					],
					separator: ", ",
					wrapper: "\""
				},
				"font-kerning": {
					parameters: [
						{
							defaults: [
								"auto",
								"normal",
								"none"
							],
							options: styleStringComponent
						}
					]
				}
			}
		};

		/* CSS PROPERTIES */
		// copy first parameter reference into other parameters
		data.properties[ "overflow-y" ] = data.properties[ "overflow-x" ];

		[ "left", "right", "bottom" ].forEach( (side ) => {
			data.properties[ side ] = data.properties[ "top" ];
			data.properties[ "margin-" + side ] = data.properties[ "margin-top" ];
			data.properties[ "padding-" + side ] = data.properties[ "padding-top" ];
			[ "width", "style", "color", "radius", "spacing" ].forEach( (property ) => {
				data.properties[ "border-" + side + "-" + property ] = data.properties[ "border-top-" + property ];
				data.properties[ "border-" + side + "-" + property ] = data.properties[ "border-top-" + property ];
				data.properties[ "border-" + side + "-" + property ] = data.properties[ "border-top-" + property ];
			});
		});

		// 1 slot for fallback
		data.properties["font-family"].parameters[ 1 ] = data.properties["font-family"].parameters[ 0 ];

		return data;
	},
	created() {

	},
	watch: {
		"value.asset": function (newStyleSheet, oldStyleSheet) {
			if( oldStyleSheet ) {
				oldStyleSheet.dispose();
			}

			if( newStyleSheet ) {
				this.$root.$emit( "add-dependency", newStyleSheet );
			}
		}
	},
	methods: {
		addRule() {
			let rule = {
				selector: {},
				body: {
					properties: [],
				}
			};
			rule = new StyleRule( rule );

			this.value.rules.push( rule );
		},
		removeRule( index ) {
			let removed = this.value.rules.splice( index, 1 )[0];
			if( removed ) removed.dispose();
		},
		addProperty( rule, event ) {
			let serializedArray = $( event.target ).serializeArray();
			let self = this;
			let name = serializedArray[0].value;
			let property = {
				name: name,
				values: [],
				config: {
					separator: name in this.properties ? this.properties[ name ].separator : null,
					wrapper: name in this.properties ? this.properties[ name ].wrapper : null,
				}
			};

			if( this.properties[ property.name ] && this.properties[ property.name ].parameters ) {
				for( let i = 0; i < this.properties[ property.name ].parameters.length; i++ )
					property.values[ i ] = null;
			}

			property = new StyleProperty( property );

			$( event.target ).trigger('reset');
			rule.body.properties.push( property );
		},
		removeProperty( rule, index ) {
			if( !rule.body || !rule.body.properties ) return;


			let removed = rule.body.properties.splice( index, 1 )[0];
			if( removed ) removed.dispose();
		}
	}
};