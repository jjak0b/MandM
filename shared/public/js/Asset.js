export class Asset {
	constructor( name, category, data = null ) {
		this.name = name;
		this.category = category;
		this.url = `/assets/${this.category}/${this.name}`;
		this.data = null;
	}

	getURL() {
		return this.url;
	}

	toString() {
		return this.name;
	}
}