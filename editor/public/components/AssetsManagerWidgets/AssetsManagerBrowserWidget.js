import { template } from "./AssetsManagerBrowserWidgetTemplate.js";

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
		}
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
				categories: []
			},
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
			for (let i = 0; i < categories.length; i++) {
				promisesNames[ i ] = $.get( `/assets/${categories[i]}/` );
			}
			let self = this;
			return new Promise( function (resolve, reject) {
			Promise.all( promisesNames )
				.then( (assetNames) => {
					self.optionsAssets = [];
					assetNames.forEach( (namesOfCategory, i) => {

						let options = self.filter.search ? namesOfCategory.filter( (name) => name.includes( self.filter.search ) ) : namesOfCategory;
						if( options && options.length > 0) {
							let group = {
								label: self.$tc( self.localeStrings[ categories[ i ] ], 100 ),
								options: options
							}

							self.optionsAssets.push( group );
						}
					});
					resolve( assetNames );
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
		onFocus(event) {
			this.focused = true;
			console.log("onFocus")
		},
		onBlur(event) {
			console.log("onBlur")
			this.closeDialog();
		}
	}
};