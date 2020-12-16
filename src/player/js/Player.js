import Story from "../../shared/js/Story.js";
import {Asset} from "../../shared/js/Asset.js";

export default class Player {
	constructor() {
		/**
		 * @type {Story}
		 */
		this.story = null;
		this.loadingProgress = 0;
		/**
		 *
		 * @type {ServiceWorkerRegistration}
		 */
		this.cacheWorker = null;
	}

	/**
	 * @type Player
	 */
	static instance;

	/**
	 *
	 * @returns {Player}
	 */
	static getInstance() {
		return this.instance;
	}

	init() {
		console.log(`[${this.constructor.name}]`, "Init");
		let cachedStoryName = Cookies.get("storyNameInCache");
		let url = new URL( window.location.href );
		let storyName = url.searchParams.get( "story" );
		return this.downloadStory( storyName );

	}

	downloadStory( storyName ) {

		if( !storyName )
			throw new Error("No story defined in URL");
		// let _reqJSONStory = fetch( `/player/js/init.js` );
		let reqJSONStory = fetch( `/stories/${storyName}?source=player` );
		return reqJSONStory
			.catch( (e) => {
				throw e;
			})
			.then( (response) => {
				return response.json();
			})
			.then( (json) => {
				this.story = new Story( json );

				let assetsRequests = [];
				for (const category in this.story.dependencies) {
					if( category === "locales") continue;
					/**
					 * @type { {asset: Asset, count: Number}[] }
					 */
					let assetsEntries = this.story.dependencies[ category ];
					for (const { asset } of assetsEntries) {
						assetsRequests.push( asset.fetch() );
					}
				}
			});
	}

	main() {

	}

}