export const template = 
`<div>
<section>
	<div id="i18n-selector-widget">
		<i18n-selector-widget
			v-model="locale"></i18n-selector-widget>
	 </div>
</section>
<section id="story-editor-widget-section" class="tab-pane fade container" role="tabpanel" aria-labelledby="story-tab">
	<story-editor-widget id="story-editor-widget"></story-editor-widget>
</section>
<section id="mission-editor-widget-section" class="tab-pane fade container" role="tabpanel" aria-labelledby="missions-tab">
	<mission-editor-widget id="mission-editor-widget"
	   v-bind:missions="missions"
	   v-bind:locale="locale"
	   v-bind:localesData="localesData"></mission-editor-widget>
</section>
<section id="activity-editor-widget-section" class="tab-pane fade container" role="tabpanel" aria-labelledby="activities-tab">
	<activity-editor-widget id="activity-editor-widget"></activity-editor-widget>
</section>
</div>
`;