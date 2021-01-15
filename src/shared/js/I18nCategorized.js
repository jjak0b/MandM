import Disposable from "./Disposable.js";
import {I18nUtils} from "./I18nUtils.js";

export default class I18nCategorized extends Disposable {
	constructor(unparsedObject) {
		super(unparsedObject);
		this.setID(unparsedObject.id );
		this.setI18nCategory( unparsedObject.i18nCategory );
	}

	setI18nCategory ( category ) {
		this.i18nCategory = category;
	}

	setID( id ) {
		this.id = id;
	}

	duplicate( i18nCategoryPrefix ) {
		let id = I18nUtils.getUniqueID();
		return new I18nCategorized({
			id: id,
			i18nCategory: i18nCategoryPrefix + "." + id
		});
	}
}