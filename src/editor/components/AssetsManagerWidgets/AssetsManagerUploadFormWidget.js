import {template} from "./AssetsManagerUploadFormTemplate.js";
import {Asset} from "../../../shared/js/Asset.js";

export const component = {
	template: template,
	props: {
		assetNames: Object
	},
	data() {
		let data = {
			acceptMIMETypes: {
				"images": {
					accept: [
						"image/*"
					],
					regExp: [
						/^image\/[-\w.]+$/im
					]
				},
				"audios": {
					accept: [
						"audio/mpeg",
						// "audio/ogg", // maybe no Edge and Safari support
						"audio/wav"
					],
					regExp: [
						/^audio\/mpeg$/im,
						// /^audio\/ogg$/igm, // maybe no Edge and Safari support
						/^audio\/wav$/im
					]
				},
				"videos": {
					accept: [
						"video/mp4",
						// "video/ogg", // maybe no Edge and Safari support
						"video/webm",

					],
					regExp: [
						/^video\/mp4$/im,
						// /^video\/ogg$/igm, // maybe no Edge and Safari support
						/^video\/webm"$/im
					]

				},
				"captions": {
					accept: [
						"text/vtt",
						".vtt"
					],
					regExp: [
						/^text\/vtt$/im,
						/^.vtt$/im
					]
				}
			},
			// will be filled after definition
			optionsCategories: [],

			asset: null,
			isLoading: false,
			loadingPercentage: 0,

			form: {
				category: null,
				file: null,
				name: null,
				shouldOverrideName: false
			},
			validity: {
				category: {
					state: null
				},
				file: {
					state: null,
					feedback: {
						valid: "AssetsManager.label-valid-file",
						invalid: "AssetsManager.label-invalid-file-unsupported"
					}
				},
				name: {
					state: null,
					stateOverride: null,
					feedback: {
						valid: "AssetsManager.label-valid-name-available",
						invalid: "AssetsManager.label-invalid-name-already-exists"
					}
				},
				operation: {
					state: null,
					feedback: {
						valid: "shared.status.label-operation-success",
						invalid: "shared.status.label-operation-failed"
					}
				},
				form: {
					state: null,
				}
			}
		};

		Object.keys( data.acceptMIMETypes ).forEach( ( category) => {
			data.optionsCategories.push(
				{
					value: category,
					text: this.$t( `shared.media.categories.${category}.label` )
				}
			);
		});

		return data;
	},
	computed: {
		canSubmit: function () {
			this.validity.form.state = this.validity.category.state && ( this.validity.name.state || this.validity.name.stateOverride ) && this.validity.file.state && !this.isLoading;
			return this.validity.form.state;
		},
		fileExtension: function () {
			if( this.form.file && this.form.file.name ) {
				let filename = this.form.file.name;
				return filename.substring( filename.lastIndexOf('.'), filename.length ) || "";
			}
			return "";
		}
	},
	watch: {
		"assetNames": function () {
			this.updateValidityName( this.form.name, null );
		},
		"form.category": function (category, previous ) {
			this.$emit('fetch' );
			this.updateValidityCategory(category, previous);
			this.onReset( null );
		},
		"form.file" : function (file, previous) {
			this.$emit('fetch' );
			this.updateValidityFile( file, previous );
		},
		"form.name" : function (name, previous ) {
			this.updateValidityName( name, previous );
		}
	},
	methods: {
		updateValidityCategory(category, previous) {
			this.validity.category.state = category && Object.keys( this.acceptMIMETypes ).includes( category );
		},
		updateValidityFile( file, previous ) {
			this.validity.file.state = null;
			if( file ) {

				let self = this;
				let category = this.form.category;
				let filename = file.name;

				if( category && filename) {
					this.validity.file.state = this.isFileOfCategory( file, category );

					if( this.validity.file.state ) {

						// override name
						this.form.name = filename.substring(0, filename.lastIndexOf('.') ) || filename;
					}
				}
				else{
					this.validity.file.state = false;
				}
			}

			if( !this.validity.file.state ) {
				this.form.name = null;
			}
		},
		updateValidityName( name, previous ) {
			this.validity.operation.state = null;
			this.validity.form.state = null;

			if( name ) {
				let newFileName = name + this.fileExtension;
				// if names is not defined is because server couldn't be reached
				this.validity.name.state = this.assetNames && ( this.form.category in this.assetNames) ? !this.assetNames[ this.form.category ].includes( newFileName ) : true;
			}
			else {
				this.validity.name.state = null;
			}
		},
		isFileOfCategory( file, category ) {
			let searchMIME = null
			if( file.type && file.type.length > 0 ) {
				searchMIME = file.type;
			}
			else {
				searchMIME = file.name.substring(file.name.lastIndexOf('.'), file.name.length) || null;
			}

			if( searchMIME ) {
				for (let i = 0; i < this.acceptMIMETypes[ category ].regExp.length; i++) {
					let regExp = this.acceptMIMETypes[ category ].regExp[ i ];
					if( regExp.test( searchMIME ) ){
						return true;
					}
				}
				return false;
			}
			else {
				return null;
			}
		},
		getFeedback( field, isValidFeedback ) {
			let feedbackString = null;

			// return valid (invalid) feedback iff isValidFeedback is true (false)
			if( field in this.validity ) {
				if( this.validity[ field ].state === true ) {
					if( isValidFeedback ) {
						feedbackString = this.validity[ field ].feedback.valid;
					}
				}
				else if( this.validity[ field ].state === false ){
					if( !isValidFeedback ) {
						feedbackString = this.validity[ field ].feedback.invalid;
					}
				}

				return feedbackString ? this.$t( feedbackString ) : null;
			}
		},
		onSubmit( event ) {
			if( !this.canSubmit ){
				event.stopPropagation();
				return;
			}
			let self = this;

			// create Asset

			let blobOptions = {
				type : this.form.file.type
			};
			// fix to override MIME type not defined or recognized by browser for vtt files
			if( (!blobOptions.type || !blobOptions.type.length) && this.form.category == "captions" && this.fileExtension.toLowerCase() == ".vtt" ) {
				blobOptions.type = "text/vtt";
			}

			this.asset = new Asset(
				this.form.name + this.fileExtension,
				this.form.category,
				new Blob( [ this.form.file ], blobOptions )
			);

			this.isLoading = null;
			if( this.asset ) {
				this.isLoading = true;
				this.validity.operation.state = null;

				let progressCallback = (progressEvent) => {
					if( progressEvent.lengthComputable ) {
						let percentComplete = progressEvent.loaded / progressEvent.total * 100;
						this.loadingPercentage = percentComplete;
					}
					else {
						this.loadingPercentage = null;
					}
				};
				this.asset.put( progressCallback )
					.then( (response) => {
						self.validity.operation.state = true;
					})
					.catch( (error) => {
						self.validity.operation.state = false;
						console.error( "[Asset Manager Upload Form]", "Unable to upload asset",  this.asset, "because:", error);
					})
					.always( function () {
						self.isLoading = false;
						self.loadingPercentage = 100;
					});
			}
		},
		onReset( event ) {
			this.asset = null;
			this.form.file = null;
			this.form.name = null;
			this.form.shouldOverrideName = null;

			this.validity.file.state = null;
			this.validity.operation.state = null;
			this.validity.name.state = null;
			this.validity.name.stateOverride = null;

			this.isLoading = false;
			this.loadingPercentage = 0;
		}
	}
};
