import {template} from "./ListWidgetTemplate.js";
import {KeyboardUtils} from "../js/KeyboardUtils.js";

export const component = {
	template: template,
	props: {
		readonly: {
			type: Boolean,
			default: false
		},
		list: [Object, Array],
		tag: {
			type: String,
			default: "ul"
		},
		tagItem: {
			type: String,
			default: "li"
		},
		value: Object, // keys of item list that is selected
		roleList: {
			type: String,
			default: "listbox"
		},
		roleItem: {
			type: String,
			default: "option"
		},
		classItem: {
			type: Array,
			default: () => [
				"list-group-item",
				"list-group-item-action"
			]
		},
		classItemActive: {
			type: Array,
			default: () => [
				'active'
			]
		},
		classItemSelected: {
			type: Array,
			default: () => [
				'list-group-item-success'
			]
		},
		classList: {
			type: Array,
			default: () => [
				"overflow-auto",
				"list-group"
			]
		}
	},
	data() {
		return {
			minItemHeight: null,
			selectedKeyIndex: null,
			activedescendantKey: null,
			cachedlistLength: 0
		}
	},
	computed: {
		activedescendant: function () {
			if( this.activedescendantKey != null ){
				let id = this.$attrs.id;
				return id + "_li_" + this.activedescendantKey;
			}
			return null;
		},
		getStyle: function () {
			if( !this.list || !this.minItemHeight ) return null;
			return `min-height: ${this.minItemHeight}px`;
		}
	},
	watch: {
		"list": function () {
			if( !this.list ) return;
			let currentSelectedIndex = this.getRealIndexOf( this.selectedKeyIndex );
			let currentActiveIndex = this.getRealIndexOf( this.activedescendantKey );
			let newLength = this.getListLength();

			if( this.cachedlistLength != newLength ) {
				if( newLength == 0
				|| (currentSelectedIndex == null || currentSelectedIndex == undefined)
				|| (currentActiveIndex == null || currentActiveIndex == undefined) ){
					this.setSelected( null );
				}
				else if( currentSelectedIndex >= newLength ) {
					this.setSelected( --currentSelectedIndex );
				}
				else if( currentActiveIndex >= newLength ) {
					this.select( --currentSelectedIndex );
				}

				this.cachedlistLength = newLength;
			}
		}
	},
	updated(){
		if( !this.list ) return;

		let self = this;
		let maxHeight = 0;
		if( this.list instanceof Array ) {
			this.list.forEach( (value, key) =>{
				maxHeight = Math.max( maxHeight, self.$refs[ "li" + key ][0].offsetHeight );
			});
		}
		else {
			Object.keys( this.list ).forEach( (key, index) =>{
				maxHeight = Math.max( maxHeight, self.$refs[ "li" + key ][0].offsetHeight );
			});
		}
		this.minItemHeight = maxHeight;
	},
	methods: {
		getItemClasses( keyItem ) {
			let classes = [];

			if( this.classItem ) {
				classes = classes.concat(this.classItem);
			}

			if( keyItem === this.activedescendantKey ) {
				classes = classes.concat( this.classItemActive );
			}
			else if( keyItem === this.selectedKeyIndex ){
				classes = classes.concat( this.classItemSelected );
			}

			return classes;
		},
		getFirstKey() {
			if( !this.list ) return null;

			if( this.list instanceof Array ){
				return this.list.length > 0 ? 0 : null;
			}
			else {
				let keys = Object.keys( this.list );
				return keys.length > 0 ? keys[ 0 ] : null;
			}
		},
		getLastKey() {
			if( !this.list ) return null;
			if( this.list instanceof Array ){
				return this.list.length > 0 ? this.list.length-1 : null;
			}
			else {
				let keys = Object.keys( this.list );
				return keys.length > 0 ? keys[ keys.length-1 ] : null;
			}
		},
		getNextKey( keyIndex ) {
			if( !this.list ) return null;

			if( this.list instanceof Array ){
				return Math.min( Math.max( 0, keyIndex+1 ), this.list.length-1 );
			}
			else {
				let keys = Object.keys( this.list );
				let index = keys.indexOf( keyIndex );
				if( index != null ) {
					index = Math.min( Math.max( 0,  index+1 ), keys.length-1 );
				}
				return keys[ index ];
			}
		},
		getPrevKey( keyIndex ) {
			if( !this.list ) return null;

			if( this.list instanceof Array ){
				return Math.min( Math.max( 0, keyIndex-1 ), this.list.length-1 );
			}
			else {
				let keys = Object.keys( this.list );
				let index = keys.indexOf( keyIndex );
				if( index != null ) {
					index = Math.min( Math.max( 0,  index-1 ), keys.length-1 );
				}
				return keys[ index ];
			}
		},
		getListLength() {
			if(!this.list) return 0;

			if( this.list instanceof Array ){
				return this.list.length;
			}
			else {
				return Object.keys( this.list ).length;
			}
		},
		getRealIndexOf( keyIndex ) {
			if(!this.list) return null;

			if( this.list instanceof Array ){
				return keyIndex;
			}
			else {
				return Object.keys( this.list ).indexOf( keyIndex );
			}
		},
		select( keyIndex ) {
			this.activedescendantKey = keyIndex;
			if( this.activedescendantKey != null && this.activedescendantKey != keyIndex ){
				let el = this.$refs["li"+this.activedescendantKey];
				if( el ) el.focus();
			}
		},
		setSelected( keyIndex ) {
			this.select( keyIndex );
			if( this.readonly ) return;

			if( this.selectedKeyIndex != keyIndex ) {
				this.selectedKeyIndex = keyIndex;
				if( this.list && this.list[ keyIndex ] ) {
					this.$emit( "input", this.list[ keyIndex ] );
				}
				else {
					this.$emit( "input", null );
				}
			}
		},
		KeyHandler( event ) {
			let shouldStopPropagation = true;
			let newKeyIndex = null;
			let keys = null

			if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowDown ) ) {
				newKeyIndex = this.getNextKey( this.activedescendantKey );
			}
			else if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowUp ) ) {
				newKeyIndex = this.getPrevKey( this.activedescendantKey );
			}
			else if( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.Home ) ) {
				newKeyIndex = this.getFirstKey();
			}
			else if( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.End ) ) {
				newKeyIndex = this.getLastKey();
			}
			else{
				shouldStopPropagation = false;
			}

			if( shouldStopPropagation ){

				let isKeyDifferent = newKeyIndex != this.activedescendantKey;

				this.select( newKeyIndex );

				if( isKeyDifferent ) {
					this.updateScroll();
				}
				event.stopPropagation();
			}

		},
		// allow to prevent arrowUp/Down, pageUp/down, home/end scrolling the page
		keyPreventHandler( event ){
			if ( KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowDown )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.ArrowUp )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.Home )
				|| KeyboardUtils.iskey( event.key, KeyboardUtils.ENUM.Keys.End )
			) {
				event.preventDefault();
			}
		},
		updateScroll () {
			this.$nextTick( function () {
				let selectedOption = this.$refs["li"+this.activedescendantKey][0];
				let node = this.$refs["node"];
				if (selectedOption && node && node.scrollHeight > node.clientHeight) {

					let scrollBottom = node.clientHeight + node.scrollTop;
					let elementBottom = selectedOption.offsetTop + selectedOption.offsetHeight;
					if (elementBottom > scrollBottom) {
						node.scrollTop = elementBottom - node.clientHeight;
					}
					else if (selectedOption.offsetTop < node.scrollTop) {
						node.scrollTop = selectedOption.offsetTop;
					}
				}
			});
		}
	}
};