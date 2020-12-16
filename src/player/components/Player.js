import {i18n} from "../../shared/js/i18n.js";
import Player from	"../js/Player.js"
import Story from "../../shared/js/Story.js";

export const component = {
	el: '#main',
	i18n: i18n,
	components: {

	},
	data() {
		return {
			player: Player.getInstance(),
			loadingProgress: 0
		}
	}
}