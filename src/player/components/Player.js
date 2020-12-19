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
		}
	},
	created() {
		this.isLoading = true;
		this.loadingInfoLocaleLabel = "shared.label-loading";

		console.log( "[PlayerVM]", "Start downloading story" );
		let promsInit = [
			this.cacheSystem.init(),
			this.player.init(),
			I18nUtils.fetchLocales( "./", [ i18n.locale, i18n.fallbackLocale ] )
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
				let localesMessages = responses[ 2 ];
				console.log( "[PlayerVM]", "Story downloading complete" );
				console.log( "[PlayerVM]", "Start downloading story assets" );

				i18n.mergeLocaleMessage( i18n.locale, localesMessages[ i18n.locale ] );
				i18n.mergeLocaleMessage( i18n.fallbackLocale, localesMessages[ i18n.fallbackLocale ] );

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
				setTimeout( () => this.$nextTick( () => {
					this.isLoading = false;
					console.log( "[PlayerVM]", "story assets download complete" );
					// just let finish the loading animation
				}),1000 );
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