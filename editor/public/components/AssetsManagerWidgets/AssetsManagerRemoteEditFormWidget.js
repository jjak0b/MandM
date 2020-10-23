import {template} from "./AssetsManagerRemoteEditFormTemplate.js";
import {component as assetManagerBrowser} from "./AssetsManagerBrowserWidget.js";

export const component = {
	template: template,
	components: {
		"assets-manager-browser": assetManagerBrowser
	},
	props: {

	},
	data() {
		return {
			validity: {
				state: null,
				feedback: {
					valid: null,
					invalid: null
				}
			},
			selectedAsset: null,
			options: [],
			assets: [],
			operationAlert: {
				isVisible: false,
				isError: false,
				operationResult: null,
				operationResultCause: null,
				operationMessage: null,
				operationList: null,
			}
		}
	},
	computed: {
		canDelete() {
			return !!this.selectedAsset;
		}
	},
	methods: {
		deleteAsset() {
			this.clearOperationStatus();
			let self = this;
			this.selectedAsset.delete()
				.then( (data) => {
					this.selectedAsset = null;
					if( self.$refs.assetsBrowser ) {
						self.$refs.assetsBrowser.updateList();
					}
					self.operationAlert.operationResult = this.$t("shared.label-operation-success");
					self.operationAlert.isError = false;
					self.operationAlert.isVisible = true;
					this.$emit( "fetch" );
				})
				.catch( (xhr, textStatus, error) => {
					console.error( "[AssetManagerRemoteEdit]", "Unable to delete asset", self.selectedAsset, "cause: ", error );

					let cause = null;
					switch( xhr.status ) {
						case 403: // forbidden
							self.operationAlert.operationResultCause = this.$t("AssetManager.error.label-asset-is-dependency");
							self.operationAlert.operationMessage = this.$tc("AssetManager.label-stories-that-depend-by-asset", this.selectedAsset );
							let dependencies = xhr.responseJSON;
							self.operationAlert.operationList = [];
							dependencies.forEach( (dependency) => {
								let item = {
									key: dependency.story,
									value: dependency.count,
								};

								self.operationAlert.operationList.push( item );
							});
							break;
						case 404: // not found (shouldn't happen)
							self.operationAlert.operationResultCause = this.$t("AssetManager.error.label-asset-already-deleted");
							break;
						default:
							self.operationAlert.operationResultCause = this.$tc("AssetManager.error.label-unable-to-delete-asset", this.selectedAsset );
							break;
					}
					self.operationAlert.operationResult = this.$t("shared.label-operation-failed");
					self.operationAlert.isError = true;
					self.operationAlert.isVisible = true;
				});
		},
		clearOperationStatus() {
			this.operationAlert.isVisible = false;
			this.operationAlert.isError = false;
			this.operationAlert.operationResult = null;
			this.operationAlert.operationResultCause = null;
			this.operationAlert.operationMessage = null;
			this.operationAlert.operationList = null;
		}
	}
};