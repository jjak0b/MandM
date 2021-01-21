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
		hasSubmit() {
			if( this.scene && this.$refs && this.$refs.form ) {
				let form = this.$refs.form;
				let hasSubmit = !!form.querySelector("[type='submit']");
				return hasSubmit;
			}
			else {
				return undefined;
			}
		},
		scene() { return this.isSceneable ? this.activity.data.scene : null }
	},

	watch: {
		scene() {
			this.$nextTick( () => {
				this.$el.focus();
			});
		}
	},

	methods : {
		// nextTick is needed to allow v-model to set value in component.value correctly

		onSubmit( event ) {
			this.$nextTick( () => this.onInput( 'input', event.target ) )
		},
		onChangeDoSubmit() {
			// if is Quest activity and has no submit button, perform submit on first "onchange" event
			if( !this.shouldClickToContinue && !this.hasSubmit ) {
				let form = this.$refs.form;
				this.$nextTick( () => this.onInput( 'input', form ) )
			}
		},
		onInput( type, target) {
			if( this.isSceneable ) {
				console.log( "input", target  );
				if( this.activity instanceof ActivityNodeTell && type === 'click') {
					this.player.handleActivityBehavior( null );
				}
				else if( this.activity instanceof ActivityNodeQuest && type !== 'click' ) {
					let input = this.getInputMap( target );
					if( this.player.handleActivityBehavior( input ) ) {
						let behaviorType = this.activity.data.noBranchBehavior;
						switch ( behaviorType ) {
							case "message":
								let localeLabelMessage = this.activity.data.message;
								this.$bvModal.msgBoxOk( this.$t( localeLabelMessage ), {
									size: 'md',
									buttonSize: 'md',
									hideHeaderClose: true,
									centered: true
								});
								break;
						}
					}
				}
			}
		},
		getInputMap( form ) {
			let input = new Map();
			let formData = new FormData( form );
			for (const key of formData.keys() ) {
				let values = formData.getAll( key );
				// put the array
				if( values.length > 1 ) {
					input.set( key, values );
				}
				// put the value
				else {
					input.set( key, values[ 0 ] );
				}
			}
			return input;
		}
	}
}