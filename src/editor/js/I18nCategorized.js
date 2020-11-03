import Disposable from "./Disposable.js";

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
}