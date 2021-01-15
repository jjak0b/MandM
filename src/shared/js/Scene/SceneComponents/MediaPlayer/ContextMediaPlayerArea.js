import I18nCategorized from "../../../I18nCategorized.js";
import {TypedValue} from "../../../Types/TypedValue.js";

export default class ContextMediaPlayerArea extends I18nCategorized {
	constructor(unparsed) {
		super(unparsed);

		// shape related
		/**
		 *
		 * @type {string}
		 */
		this.shape = unparsed.shape;
		/**
		 *
		 * @type {[number[], [number]]|number[][]|null}
		 */
		this.vertices = unparsed.vertices || ( () => {
			if (this.shape == 'circle') {
				return [ [50, 50], [50] ];
			}
			else if (this.shape == 'rect') {
				return [ [25, 25], [75, 75] ];
			}
			else {
				return null;
			}
		} )();

		this.useHighlight = unparsed.useHighlight || false;

		// attribute related
		/**
		 * `${this.i18nCategory}.image.area.${this.id}.label-alt`
		 * @type {string}
		 */
		this.alt = unparsed.alt || `${this.i18nCategory}.label-alt`;
		this.href = unparsed.href || "javascript:void(0)";
		this.target = unparsed.target || null;

		// interaction related

		this.action = unparsed.action || null; // TODO: eventAction built into an interaction editor component
		/**
		 *
		 * @type {TypedValue}
		 */
		this.value = new TypedValue( unparsed.value || {} );
	}

	duplicate(locales, i18nCategoryPrefix) {
		let duplicate = super.duplicate( i18nCategoryPrefix + ".image.area" );
		duplicate = Object.assign(
			duplicate,
			{
				shape: new String( this.shape ),
				vertices: JSON.parse( JSON.stringify( this.vertices ) ),
				useHighlight: this.useHighlight,
				alt: `${duplicate.i18nCategory}.label-alt`,
				href: this.href ? new String( this.href ) : null,
				target: this.target ? new String( this.target ) : null,
				action: this.action,
				value: new TypedValue( JSON.parse( JSON.stringify( this.value ) ) )
			}
		);
		locales.push(
			[
				this.alt,
				duplicate.alt
			]
		);
		return Object.setPrototypeOf( duplicate, ContextMediaPlayerArea.prototype );
	}

	dispose(params) {
		super.dispose(params);
	}
}