export class TypedValue {
	constructor( unparsed ) {
		this.type = unparsed ? unparsed.type : null;
		this.value = unparsed ? unparsed.value : null;
	}
}