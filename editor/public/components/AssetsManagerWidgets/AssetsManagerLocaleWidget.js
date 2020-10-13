import {template} from "./AssetsManagerLocaleTemplate.js";
import {Asset} from "/shared/js/Asset.js";

export const component = {
	template: template,
	props: {
		dataStory: Object
	},
	data() {
		return {

		}
	},
	created() {
		this.$root.$on( "add-dependency", this.addToDependencies );
		this.$root.$on( "remove-dependency", this.removeFromDependencies );
	},
	methods: {
		addToDependencies( /*Asset*/asset ) {
			if( asset ) {
				if( !(asset instanceof Asset) ) {
					asset = new Asset( asset.name, asset.category );
				}

				if( this.dataStory ) {
					let fullDependencies = this.dataStory.dependencies;
					let dependencies = fullDependencies[ asset.category ];
					console.log( "[AssetsManagerLocal]", "request of adding", asset, "to dependencies", dependencies );
					let shouldBeAdded = true;
					// check if asset is already in dependencies
					for (let i = 0; i < dependencies.length; i++) {
						if( asset.equals( dependencies[ i ].asset ) ) {
							shouldBeAdded = false;
							dependencies[ i ].count += 1;
							break;
						}
					}

					if( shouldBeAdded ) {
						let assetDependency = {
							asset: asset,
							count: 1
						}
						dependencies.push( assetDependency );
					}
					console.log( "[AssetsManagerLocal]", "result", dependencies );
				}
				else{
					console.error( "[AssetsManagerLocal]", "Unable to add \"%s\" to dependencies because story is not set" );
				}
			}

		},
		removeFromDependencies( /*Asset*/asset ) {
			if( asset ) {
				if( !(asset instanceof Asset) ) {
					asset = new Asset( asset.name, asset.category );
				}

				if( this.dataStory ) {
					let dependencies = this.dataStory.dependencies[ asset.category ];
					console.log("[AssetsManagerLocal]", "request of removing", asset, "from dependencies", this.dataStory.dependencies );
					for (let i = 0; i < dependencies.length; i++) {
						// the asset to check can be also be a not parsed asset (plain Object), so use a specific method
						if( asset.equals( dependencies[ i ].asset ) ) {
							dependencies[ i ].count -= 1;
							if( dependencies[ i ].count <= 0 ) {
								dependencies.splice( i, 1 );
							}
							break;
						}
					}
					console.log( dependencies );
				}
				else{
					console.error( "[AssetsManagerLocal]", "Unable to add \"%s\" to dependencies because story is not set" );
				}
			}
		},
	}
};