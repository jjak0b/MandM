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
import {component as stylesheetAssetComponent} from "./StyleEditorWidgets/StylesheetAssetWidget.js";

export const component = {
	template: template,
	components: {
		"stylesheet-asset": stylesheetAssetComponent,
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
			currentRuleIndex: -1,
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
	mounted() {
		if( this.value ) {
			for (let i = 0; i < this.value.rules.length; i++) {
				this.updateCSSInDocumentForRule(i);
			}
		}
	},
	computed: {
		currentRule() {
			if( this.currentRuleIndex >= 0 && this.currentRuleIndex < this.value.rules.length ) {
				return this.value.rules[ this.currentRuleIndex ]
			}
			return null;
		}
	},
	watch: {
		value: function( newVal ) {
			this.updateCSSInDocumentForRule();
			this.$nextTick( () => {
				if( this.value ) {
					for (let i = 0; i < this.value.rules.length; i++) {
						this.updateCSSInDocumentForRule(i);
					}
				}
			});
		},
		currentRule: {
			deep: true,
			handler: function (newVal, oldVal) {
				if( newVal && this.currentRuleIndex >= 0 )
					this.updateCSSInDocumentForRule( this.currentRuleIndex );
			}
		}
	},
	methods: {
		updateCSSInDocumentForRule( index, shouldDelete = false ) {
			const prefix = "authored-style-rule";
			if( index < 0 ) return ;

			// write into style tag the custom CSS rules
			let head = document.getElementsByTagName( "head" )[ 0 ];
			let styleElements = head.querySelectorAll( "."  + prefix );

			let childrenBaseCount = head.children.length - styleElements.length;
			if( index == undefined ) {
				while( head.children.length > childrenBaseCount ) {
					// remove first element on every step
					this.updateCSSInDocumentForRule( 0, true );
				}
				return ;
			}

			let styleElement;
			if( index >= styleElements.length ) {
				if( !shouldDelete ) {
					styleElement = document.createElement("style");
					styleElement.setAttribute("class", prefix);
					// create after last index
					if (styleElements.length > 0) {
						$(styleElement).insertAfter(styleElements[styleElements.length - 1]);
					}
					// create on last index on parent
					else {
						head.appendChild(styleElement);
					}
				}
			}
			else if( index >= 0 ) {
				styleElement = styleElements[ index ];
			}

			if( styleElement ) {
				if( shouldDelete ) {
					head.removeChild(styleElement);
				}
				else {
					let rule = this.value.rules[ index ];
					if( rule ){
						styleElement.innerHTML = rule.toString();
					}
				}
			}
		},
		removeStylesheet( index ) {
			if( index < this.value.assets.length ) {
				if( this.value.assets[ index ] )
					this.value.assets[ index ].dispose();
				this.value.assets.splice( index, 1 );
			}
		},
		addStylesheet() {
			this.value.assets.push( null );
		},
		addRule() {
			let rule = {
				selector: {},
				body: {
					properties: [],
				}
			};
			rule = new StyleRule( rule );

			this.value.rules.push( rule );

			this.updateCSSInDocumentForRule( this.value.rules.length-1, false );
		},
		removeRule( index ) {
			let removed = this.value.rules.splice( index, 1 )[0];
			if( removed ) removed.dispose();
			this.$nextTick( () => {
				this.updateCSSInDocumentForRule( index, true );
			});
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