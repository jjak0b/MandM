export const template =
`
<div>
    <b-form-group
    	v-bind:label="$t('ActivityQuestEditor.label-choose-behavior-on-what-should-happen-when-user-response-doesnt-match-with-any-branch')"
		v-bind:description="$t('ActivityQuestEditor.label-activity-behaviors')"
    	v-slot="{ ariaDescribedby }"
	>
		<b-form-row>
		
			<b-col>
				<b-form-radio-group
					v-model="value.noBranchBehavior"
					v-bind:aria-describedby="ariaDescribedby"
					name="quest-behavior"
					stacked
					class="mb-2"
				>
					<b-form-radio value="nothing"
					>{{ $t('ActivityQuestEditor.label-nothing') }}</b-form-radio>
					<b-form-radio value="message"
					>{{ $t('ActivityQuestEditor.label-show-message') }}</b-form-radio>
					<b-form-radio value="continue"
					>{{ $t('ActivityQuestEditor.label-continue-on-next-activity-in-sequence') }}</b-form-radio>
				</b-form-radio-group>
			</b-col>
			<b-col>
				<i18n-input-widget
					v-bind:disabled="value.noBranchBehavior !== 'message' "
					v-bind:label="$t('ActivityQuestEditor.label-insert-message-to-show')"
					tag="textarea"
					id="activity-quest-editor-message-input"
					v-bind:locale="locale"
					v-bind:locale-label="value.message"
					class="mb-2"
				></i18n-input-widget>
			</b-col>
		</b-form-row>
    </b-form-group>
</div>
`;