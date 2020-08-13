export const template = 
`<div>
	<section>
		<i18n-selector-widget
			id="i18n-selector-widget"
			v-model="locale"></i18n-selector-widget>
	</section>
	<div class="tab-content">
		<section
			id="story-editor-widget-section"
			class="tab-pane fade container"
			role="tabpanel"
			aria-labelledby="story-tab">
			<story-editor-widget
			id="story-editor-widget"
			v-model="cache.story"></story-editor-widget>
		</section>
		<section
			id="mission-editor-widget-section"
			class="tab-pane fade container"
			role="tabpanel"
			aria-labelledby="missions-tab">
			<mission-editor-widget id="mission-editor-widget"
			 	v-bind:missions="cache.story.missions"
			 	v-bind:locale="locale"
			 	v-bind:nextId="cache.story.missionNextId"
			 	v-on:inc-Id="++cache.story.missionNextId"
			 	v-model="cache.mission"
			></mission-editor-widget>
		</section>
		<section
			id="activity-editor-widget-section"
			class="tab-pane fade container"
			role="tabpanel"
			aria-labelledby="activities-tab">
			<activity-editor-widget id="activity-editor-widget"
				v-bind:mission="cache.mission"
				v-bind:locale="locale"
				v-bind:nextId="cache.story.activityNextId"
				v-on:inc-Id="++cache.story.activityNextId"
				v-model="cache.activity"
			></activity-editor-widget>
		</section>
	</div>
</div>
`;