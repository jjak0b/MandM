import {i18n} from "../../shared/js/i18n.js";
import Player from	"../js/Player.js"
import Story from "../../shared/js/Story.js";
import {CacheSystem} from "../../shared/js/CacheSystem.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";
import {template} from "./PlayerTemplate.js";
import {component as playerViewport} from "./PlayerViewport.js";

export const component = {
	el: '#main',
	template: template,
	i18n: i18n,
	components: {
		playerViewport
	},
	data() {
		return {
			player: Player.getInstance(),
			cacheSystem: new CacheSystem(),
			loadingProgress: 0,
			loadingInfoLocaleLabel: "shared.label-loading",
			isLoading: false,
			/**
			 * @type Promise
			 */
			readyPromise: null,
			locale: i18n.locale
		}
	},
	created() {
		this.isLoading = true;
		this.loadingInfoLocaleLabel = "shared.label-loading";

		console.log( "[PlayerVM]", "Start downloading story" );
		let promsInit = [
			this.cacheSystem.init(),
			this.player.init(),
			I18nUtils.fetchLocales( "/shared/", [ i18n.locale, i18n.fallbackLocale ] ),
			I18nUtils.fetchLocales( "./", [ i18n.locale, i18n.fallbackLocale ] ),
			I18nUtils.fetchLocales( this.player.storyURL, [ i18n.locale, i18n.fallbackLocale ] )
		];
		this.loadingProgress = 0;
		let updateProgress = (percentage) => {
			this.loadingProgress = percentage;
		}
		this.readyPromise = allProgress( promsInit, updateProgress )
			.catch( (error) => {
				console.error( "[PlayerVM]", "Unable to init Player required stuff", error );
				return error;
			})
			.then( (responses) => {
				let assetsProms = responses[ 1 ];
				let localesMessagesShared = responses[ 2 ];
				let localesMessagesPlayer = responses[ 3 ];
				let localesMessagesAuthored = responses[ 4 ];
				console.log( "[PlayerVM]", "Story downloading complete" );
				console.log( "[PlayerVM]", "Start downloading story assets" );

				console.log( "[PlayerVM]", "Init i18n messages for current locale and fallback" );
				for (const locale in localesMessagesShared) {
					this.$i18n.mergeLocaleMessage( locale, localesMessagesShared[ locale ] );
				}

				for (const locale in localesMessagesPlayer) {
					this.$i18n.mergeLocaleMessage( locale, localesMessagesPlayer[ locale ] );
				}

				for (const locale in localesMessagesAuthored) {
					this.$i18n.mergeLocaleMessage( locale, localesMessagesAuthored[ locale ] );
				}

				this.loadingProgress = 0;
				this.loadingInfoLocaleLabel = "Player.label-loading-resources";
				return allProgress( assetsProms, updateProgress );
			})
			.catch( (error) => {
				this.$bvToast.toast(
					this.$t("Player.errors.label-unable-to-load-resources"),
					{
						title: this.$t("Player.errors.label-error"),
						appendToast: true,
						noAutoHide: true,
						variant: "danger"
					}
				)
				console.error( "[PlayerVM]", "Unable to fetch assets", error );
				return error;
			})
			.then( () => {
				// From here we have all stuffs we need to run the story

				// Init custom stylesheet for the story
				if( this.player.story.style ) {
					let head = document.getElementsByTagName('head')[0];

					// add stylesheet URL
					if( this.player.story.style.assets && this.player.story.style.assets.length ) {
						console.log( "[PlayerVM]", "Init custom file stylesheets" );
						for (let i = 0; i < this.player.story.style.assets.length; i++) {
							let asset = this.player.story.style.assets[ i ];

							let link = document.createElement('link');
							link.setAttribute( "id", "author-stylesheet-" + i );
							link.setAttribute('rel', 'stylesheet');
							link.setAttribute('type', 'text/css');
							link.setAttribute('href', asset.getURL() );
							head.appendChild(link);
						}
					}

					// write into style tag the custom CSS rules
					if( this.player.story.style.rules && this.player.story.style.rules.length > 0 ) {
						console.log( "[PlayerVM]", "Init custom stylesheet content" );
						let styleElement = document.createElement( "style");
						styleElement.setAttribute( "id", "author-style");
						let content = "\n";
						for (const styleRule of this.player.story.style.rules ) {
							content += styleRule.toString() + "\n";
						}
						styleElement.innerHTML = content;
						head.appendChild(styleElement);
					}
				}

				return new Promise( (resolve) => {
					setTimeout( () => this.$nextTick( () => {
						this.isLoading = false;
						console.log( "[PlayerVM]", "story assets download complete" );
						// just let finish the loading animation
						resolve();
					}),1000 );
				})
			})
	},
	mounted() {
		this.readyPromise
			.then( ()=> {
				this.start();
			})
	},
	methods: {
		start() {
			this.player.main();
		}
	}
}

function allProgress(proms, progress_cb) {
	let d = 0;
	progress_cb(0);
	for (const p of proms) {
		p.then(()=> {
			d ++;
			progress_cb( 100 * (d / proms.length ) );
		});
	}
	return Promise.all(proms);
}