import Player from "./Player.js";
import {CacheSystem} from "../../shared/js/CacheSystem.js";

function main() {
	try {
		let cacheAPI = new CacheSystem();
		let player = new Player();

		cacheAPI.init()
			.finally( ()=> {
				player.init()
					.then( () => {
						player.main();
					})
					.catch( (e) => {
						console.error( "[Error], Unable to init player", e );
					})
			});
	}
	catch (e) {
		console.trace( "[Error], Unhandled exception", e );
	}
}

main();