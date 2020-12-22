import {template} from "./PlayerViewportTemplate.js";
import {component as sceneViewportComponent} from "./SceneViewport.js";
import ActivityNode from "../../shared/js/ActivityNodes/ActivityNode.js";
import ActivityDataSceneable from "../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataSceneable.js";
import Player from "../js/Player.js";
import ActivityNodeTell from "../../shared/js/ActivityNodes/ActivityNodeTell.js";
import ActivityNodeQuest from "../../shared/js/ActivityNodes/ActivityNodeQuest.js";

export const component = {
	template: template,
	components: {
		"scene-viewport": sceneViewportComponent
	},
	props: {
		activity: ActivityNode,
		player: Player
	},
	data() {
		return {

		}
	},
	computed : {
		shouldClickToContinue() { return this.activity instanceof ActivityNodeTell },
		isSceneable() { return this.activity && this.activity.data && this.activity.data instanceof ActivityDataSceneable },
		scene() { return this.isSceneable ? this.activity.data.scene : null }
	},

	watch: {
		scene() {
			this.$nextTick( () => this.$el.focus() );
		}

	},
	methods : {
		onInput( type, event ) {
			if( this.isSceneable ) {
				console.log( "input", event );
				if( this.activity instanceof ActivityNodeTell && type === 'click') {
					this.player.handleActivityBehavior();
				}
				else if( this.activity instanceof ActivityNodeQuest && type !== 'click' ) {
					this.player.envVars.userInput = event;
					this.player.handleActivityBehavior();
				}
			}
		}
	}
}