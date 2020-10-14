export default class UserWidgetItem {
	constructor( nameOrObj, getOptionsCallback, onDisposeCallback, value = {}, props = {}, style= {} ) {
		this.getOptions = getOptionsCallback;
		this.onDispose = onDisposeCallback;
		if( "string" == typeof nameOrObj ) {
			this.name = nameOrObj;
			this.value = value;
			this.props = props;
			this.style = style;
		}
		else { // parse an unparsed  object using construct
			this.name = nameOrObj.name;
			this.value = nameOrObj.value;
			this.props = nameOrObj.props;
			this.style = nameOrObj.style;
		}

	}

	dispose() {
		if( this.onDispose )
			this.onDispose( this );
	}

}