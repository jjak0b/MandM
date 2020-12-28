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

	dispose(params) {
		super.dispose(params);
	}
}