import {template} from "./AssetsManagerRemoteTemplate.js";
import { component as assetsManagerUploadForm } from "./AssetsManagerUploadFormWidget.js";
import { component as assetManagerEditForm } from "./AssetsManagerRemoteEditFormWidget.js";

export const component = {
	template: template,
	props: {

	},
	components: {
		"assets-manager-upload-form": assetsManagerUploadForm,
		"assets-manager-edit-form": assetManagerEditForm
	},
	data() {
		let data = {
			cache: {
				assetCategories: [],
				assetNames : null // associative object array and key is the asset's category
			}
		}
		return data;
	},
	created() {
		this.fetchRemoteAssets();
	},
	methods: {
		fetchRemoteAssets() {
			let self = this;
			return new Promise( function (resolve, reject) {
				$.get("/assets/")
					.then( (data) => {
						if( data && typeof data === "object" ) {

							Object.keys( data ).forEach( (category) => {
								let assetNames = data[ category ];
								self.cache.assetCategories.push( category );

								if( !self.cache.assetNames ) self.$set( self.cache, "assetNames", {} );
								self.$set( self.cache.assetNames, category, assetNames );
							});
							resolve( self.cache.assetNames );
						}
					})
					.catch( ( error ) => {
						console.error( "[ Assets Manager Remote]", "Error: unable to fetch asset names", "cause:", error );
						reject( error );
					});
			});
		}
	}
};
