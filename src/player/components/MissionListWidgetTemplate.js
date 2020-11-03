import { component as missionWidgetComponent } from "./MissionWidget.js";

export const template =
`<ul class="list-group">
	<li v-for="mission in missions" class="list-group-item">
		<mission-widget
			v-bind:mission-name 				= "mission.quest_name"
			v-bind:action-name 					= "mission.objective_name"
			v-bind:action-progress 				= "mission.objective_progress_perc"
			v-bind:action-redeem-reward-label 	= "mission.objective_message_redeem_reward"
			v-bind:action-description			= "mission.objective_description"
			v-bind:action-hint-description		= "mission.objective_hint"
			v-bind:action-hint-label			= "mission.objective_hint_label">
		</mission-widget>
	</li>
</ul>`
;

export const component = {
	props : {
		missions: Array
	},
	components: {
		'mission-widget': missionWidgetComponent
	},
	template: template
};

Vue.component('mission-list-widget', component );