export const template =
`<div class="mission-widget">
	<details class="container">
		<summary>
			<div class="objective-header row">
				<div class="col">
					<label>{{ missionName }}</label>
				</div>
				<div class="col">
					<label>{{ actionName }}</label>
				</div>
				<div class="col row">
					<div class="col">
						<label>Completamento: {{ actionProgress }}&nbsp;%</label>
					</div>
					<div class="col">
						<meter v-bind:value="actionProgress/100.0">{{ actionProgress }} %</meter>
					</div>
				</div>
			</div>
			<div class="objective-main row justify-content-start">
				<button
					class="objective-reward btn btn-lg"
					disabled="disabled">{{ actionRedeemRewardLabel }}</button>
			</div>
		</summary>
		<div class="objective-description row justify-content-center scroll-y">
			<p
				class="text-justify"
				v-html="actionDescription"></p>
		</div>
		<div class="objective-description-footer row justify-content-start">
			<button
				type="button"
				role="button"
				class="objective-help-btn btn btn-lg btn-danger"
				data-toggle="popover"
				data-placement="right"
				data-html="true"
				v-bind:data-content="actionHintDescription">{{ actionHintLabel }}</button>
		</div>
	</details>
</div>`;

export const component = {
	props : {
		"mission-name": 				String,
		"action-name": 					String,
		"action-progress": 				Number,
		"action-redeem-reward-label": 	String,
		"action-description": 			String,
		"action-hint-description": 		String,
		"action-hint-label": 			String
	},
	template: template
};

Vue.component('mission-widget', component);