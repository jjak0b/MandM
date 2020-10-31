const path = require( 'path' );
const fs = require( 'fs' );
const Promise = require( 'promise');

class AssetsHandler {
	constructor() {
		this.assetsDirname = "assets";
		this.pathAssets = path.join( __basedir, this.assetsDirname );
		this.pathAssetsCategories = {
			videos: path.join( this.pathAssets, 'videos' ),
			audios: path.join( this.pathAssets, 'audios' ),
			images: path.join( this.pathAssets, 'images' ),
			captions: path.join( this.pathAssets, 'captions' )
		};

		this.cacheAssets = {
			videos: [],
			audios: [],
			captions: [],
			images: []
		};

		this.updateAssetsList();
	}

	getCategories() {
		return Object.keys( this.pathAssetsCategories );
	}

	getPath() {
		return this.pathAssets;
	}

	getPathCategory( category ) {
		if( category )
			return this.pathAssetsCategories[ category ];
		return null;
	}

	getURLAsset( category, filename ) {
		return `/${this.assetsDirname}/${category}/${filename}`;
	}

	getPathAsset( category, filename ) {
		return path.join( this.getPathCategory( category ), filename );
	}

	getCategoryList( category ) {
		if( category in this.cacheAssets ) {
			return this.cacheAssets[ category ];
		}
		return null;
	}

	updateAssetsList() {

		if ( !fs.existsSync( this.getPath() ) ){
			fs.mkdirSync( this.getPath() );
		}

		let promises = [];

		this.getCategories().forEach( (category) => {
			if ( !fs.existsSync( this.getPathCategory( category ) ) ) {
				fs.mkdirSync( this.getPathCategory( category ) );
			}
			else{
				promises.push(
					getDirFileNames( this.getPathCategory( category ) )
						.then( (files) => this.cacheAssets[ category ] = files )
						.catch( (error) => console.error("Error Reading \"%s\" -> \"%s\"", category, this.getPathCategory( category ), error ) )
				);
			}
		});

		Promise.all( promises )
			.finally( () => {
				console.log( "[AssetHandler]", "Found: ", this.cacheAssets );
			});

	}

	addAsset( category, filename, fileFormData ) {
		let self = this;
		return new Promise( function ( resolve, reject ) {
			fs.writeFile(
				self.getPathAsset( category, filename ),
				fileFormData.buffer,
				function (err) {
					if (err) {
						reject( err );
					}
					else {
						if ( !self.cacheAssets[ category ].includes( filename ) ) {
							self.cacheAssets[ category ].push( filename );
							console.log("Assets added: ", filename );
						}
						else {
							console.log("Assets replaced: ", filename );
						}
						resolve( filename );
					}
				}
			);
		});
	}

	canDelete( category, filename, excludes ) {
		let storiesToCheck = storyHandler.getList();
		if( excludes && excludes.length > 0) {
			storiesToCheck = storiesToCheck.filter( (name) => !excludes.includes( name ) );
		}

		let isDependent = null;
		let urlRequested = handler.getURLAsset( category, filename );
		console.log("path", urlRequested );
		return new Promise( function (resolve, reject) {
			getStoriesThatUse( urlRequested, storiesToCheck )
				.then( (storyNames) => {
					resolve( [ !( storyNames && storyNames.length > 0 ), storyNames ] );
				})
				.catch( ( err ) => {
					console.error( "Error", "[Asset.canDelete]", "Unable to check stories assets", filename, "error:", err );
					reject( err );
				});
		});
	}
}

function getDirFileNames( path ) {
	return new Promise( function (resolve, reject) {
		fs.readdir(path, (err, files) => {
			if( err ) {
				reject( err );
			}
			else{
				resolve( files );
			}
		});
	});
}
const instance = new AssetsHandler();

module.exports = {
	AssetsHandler,
	instance
}