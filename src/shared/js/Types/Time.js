export default class Time {

	constructor(unparsed) {
		this.value = [
			unparsed && unparsed.value ? unparsed.value[ 0 ] : null, // hours
			unparsed && unparsed.value ? unparsed.value[ 1 ] : null, // minutes
			unparsed && unparsed.value ? unparsed.value[ 2 ] : null// seconds
		]
	}

	toString() {
		this.value.join(":");
	}
}