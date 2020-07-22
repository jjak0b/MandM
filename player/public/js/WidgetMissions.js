/* DOM Widget which handle mission list rendering */
export var WidgetMissions = new Vue({
	el: '#quest_list',
	data: {
		missions: []
	},
	methods: {
		getMission: function (
			/* int */ id
		) {
			if( this.missions.length > 0 ){
				return this.missions[ id ];
			}
			return undefined;
		},
		addMission: function (
			/* Mission*/ mission
		) {
			this.missions.push( mission.data );
		}
	}
});

Vue.component('objective-item', {
	props : [
		"quest_name",
		"objective_name",
		"objective_progress_perc",
		"objective_message_redeem_reward",
		"objective_description",
		"objective_hint",
		"objective_hint_label"
	],
	template:
		`<details class="container">
			<summary>
				<div class="objective-header row">
					<div class="col"><label>{{quest_name}}</label></div>
					<div class="col"><label>{{objective_name}}</label></div>
					<div class="col row">
						<div class="col"><label>Completamento: {{objective_progress_perc}}&nbsp;%</label></div>
						<div class="col"><meter v-bind:value="objective_progress_perc/100.0">{{ objective_progress_perc }} %</meter></div>
					</div>
				</div>
				<div class="objective-main row justify-content-start">
					<button class="objective-reward btn btn-lg" disabled="disabled" >{{ objective_message_redeem_reward }}</button>
				</div>
			</summary>
			<div class="objective-description row justify-content-center scroll-y">
				<p class="text-justify" v-html="objective_description"></p>
			</div>
			<div class="objective-description-footer row justify-content-start">
				<button type="button" role="button" class="objective-help-btn btn btn-lg btn-danger" data-toggle="popover" data-placement="right" data-html="true" v-bind:data-content="objective_hint">{{ objective_hint_label }}</a>
			</div>
		</details>`
});
