import { template } from "./AssetsManagerBrowserWidgetTemplate.js";
import {Asset} from "/shared/js/Asset.js";

export const component = {
	template: template,
	components: {

	},
	props: {
		value: String,
		// force categories
		buttonOnly: {
			type: Boolean,
			default: false
		},
		forceFilter: {
			type: Array,
			default: []
		},
		onTimeout:  null,
	},
	data() {
		return {
			focused: false,
			valueCurrent: null,
			categories: [
				"videos",
				"audio",
				"images",
				"captions"
			],
			localeStrings: {
				videos: "shared.media.label-video",
				audio: "shared.media.label-audio",
				images: "shared.media.label-image",
				captions: "shared.media.label-caption",
			},
			selectedItem: null,
			filter: {
				search: null,
				categories: [],
			},
			assets: null,
			optionsCategories: [],
			optionsAssets: [],
			disabled: {},
			visible: false
		}
	},
	computed: {
		labelContent: function () {
			return this.valueCurrent || this.$t('AssetManager.label-select-asset');
		}
	},
	beforeMount() {
		this.setupFilters();
		this.updateList();
	},
	watch: {
		value: function( newVal ) {
			if( newVal && newVal.length ) {
				let self = this;
				console.log("Hello", newVal);
				this.updateList()
					.then( (categoriesAssetsNames) => {
						let found = false;
						for (let i = 0; i < categoriesAssetsNames.length; i++) {
							if( categoriesAssetsNames[ i ].includes( newVal ) ) {
								found = true;
								break;
							}
						}
						console.log("for", newVal);
						if( found ) {
							console.log("found", newVal);
							self.valueCurrent = newVal;
							self.selectedItem = newVal;
						}
					})
					.catch( () => {
						self.valueCurrent = null;
						self.selectedItem = null;

					});
			}
			else{
				this.valueCurrent = null;
				this.selectedItem = null;
			}
		},
		visible: function ( isVisible ) {
			if( isVisible ) {
				this.openDialog()
			}
			else{
				this.closeDialog();
			}
		}
	},
	methods: {
		setupFilters() {
			let isForced = this.forceFilter && this.forceFilter.length;
			for (let i = 0; i < this.categories.length; i++) {

				// check forced filters
				if( isForced && this.forceFilter.includes( this.categories[ i ] ) ){
					this.filter.categories.push( this.categories[ i ] );
				}

				// create options data
				this.optionsCategories[ i ] = {
					value:  this.categories[ i ],
					text: this.$tc( this.localeStrings[ this.categories[ i ] ], 100 ),
					disabled: isForced,
				};
			}
		},
		updateList() {
			// if filter is set, then get only filtered, else get all
			let categories = this.filter.categories.length ? this.filter.categories : this.categories;

			let promisesNames = new Array( categories.length );
			let query = null;
			if( this.filter.search && this.filter.search.length ) {
				query = `search=${ encodeURIComponent( this.filter.search ) }`;
			}

			for (let i = 0; i < categories.length; i++) {
				let url = `/assets/${categories[i]}/`;
				if( query ) url += `?${query}`;
				promisesNames[ i ] = $.get( url );
			}

			let self = this;
			return new Promise( function (resolve, reject) {
			Promise.all( promisesNames )
				.then( (assetNames) => {
					self.assets = {};
					self.optionsAssets = [];

					for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {

						let optionGroup = null;

						let assetsCount = assetNames[ categoryIndex ].length;
						if( assetsCount > 0 ) {
							if( !( categories[categoryIndex] in self.assets ) ) {
								self.$set(
									self.assets,
									categories[ categoryIndex ],
									new Array( assetsCount )
								);
							}

							// init option group for categories[ categoryIndex ]
							optionGroup = {
								label: self.$tc( self.localeStrings[ categories[ categoryIndex ] ], 100 ),
								options: new Array( assetsCount )
							};
							// end  option group
						}

						for (let i = 0; i < assetsCount; i++) {
							let asset = new Asset(
								assetNames[ categoryIndex ][ i ],
								categories[ categoryIndex ]
							);
							self.assets[ categories[ categoryIndex ] ].splice(i, 0, asset );

							// init options for option group
							optionGroup.options[ i ] = {
								value: asset,
								text: asset.toString()
							};
							// end init options
						}

						if( optionGroup ) {
							self.optionsAssets.push( optionGroup );
						}
					}

					resolve( self.assets );
				})
				.catch( (error) => {
					console.error( "[Assets Manager Browser]", "Error getting names for", categories, "cause:", error)
					reject( error );
				});
			});
		},
		setFocusOnDialog() {
			if( this.$refs.dialogContent )
				this.$refs.dialogContent.focus();
		},
		onSubmit( event ) {
			this.valueCurrent = this.selectedItem;
			this.visible = false;
			this.$emit('input', this.valueCurrent );
		},
		openDialog() {
			this.focused = true;
			this.visible = true;
		},
		closeDialog() {
			this.focused = false;
			this.visible = false;
		},

		// when focus change, first is fired focusout event and will bubble to parents,
		// and then focusin event will be fired on new focused element and will bubble to parents
		// onFocusIn and onFocusOut handle when the dialog should close

		onFocusIn(event) {
			this.focused = true;
			if( this.onTimeout ) {
				clearTimeout( this.onTimeout );
				this.onTimeout = null;
			}
		},
		onFocusOut(event) {
			// if onFocusIn will be triggered on next tick, then "focused" will be true and won't close
			this.onTimeout = setTimeout(
				() => this.closeDialog(),
				50
			);
		},
	}
};