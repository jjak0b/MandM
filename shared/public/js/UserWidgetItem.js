export default class UserWidgetItem {
	constructor( name, getOptionsCallback, onDisposeCallback, value = {}, props = {}, style= {} ) {
		this.name = name;
		this.getOptions = getOptionsCallback;
		this.onDispose = onDisposeCallback;
		this.value = value;
		this.props = props;
		this.style = style;
	}

	dispose() {
		if( this.onDispose )
			this.onDispose( this );
	}

}