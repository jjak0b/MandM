import {i18n} from "../../shared/js/i18n.js";
import Player from	"../js/Player.js"
import Story from "../../shared/js/Story.js";
import {CacheSystem} from "../../shared/js/CacheSystem.js";

export const component = {
	el: '#main',
	i18n: i18n,
	components: {

	},
	data() {
		return {
			player: Player.getInstance(),
			cacheSystem: new CacheSystem(),
			loadingProgress: 0,
			isLoading: false
		}
	},
	created() {
		this.isLoading = true;
		console.log( "[PlayerVM]", "Start downloading story" );
		let promsInit = [
			this.cacheSystem.init(),
			this.player.init()
		];
		this.loadingProgress = 0;
		let updateProgress = (percentage) => {
			this.loadingProgress = percentage;
		}
		allProgress( promsInit, updateProgress )
			.then( (responses) => {
				console.log( "[PlayerVM]", "Story downloading complete" );
				console.log( "[PlayerVM]", "Start downloading story assets" );
				this.loadingProgress = 0;
				return allProgress( responses[ 1 ], updateProgress );
			})
			.then( () => {
				setTimeout( () => this.$nextTick( () => {
					this.isLoading = false;
					console.log( "[PlayerVM]", "story assets download complete" );
					// just let finish the loading animation
				}),1000 );
			});
	},
	methods: {

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