export const template =
`<div>
	<b-modal
		id="addMissionModal"
		v-bind:title="$t('MissionEditorWidget.label-add-new-mission')"
		v-bind:ok-title="$t('shared.label-save')"
		centered
		v-on:ok="addMission">
		<i18n-input-widget
			v-bind:tag="'input'"
			v-bind:label="$t( 'MissionEditorWidget.label-mission-title' )"
			id="mission-editor-mission-title"
			name="missionTitle"
			type="text"
			required="required"
			v-bind:locale="locale"
			v-bind:locale-label="newMission.title"
		></i18n-input-widget>
		<i18n-input-widget
			v-bind:tag="'textarea'"
			v-bind:label="$t( 'MissionEditorWidget.label-mission-description' )"
			id="mission-editor-mission-description"
			name="missionDescription"
			rows="4"
			v-bind:locale="locale"
			v-bind:locale-label="newMission.description"
		></i18n-input-widget>
	</b-modal>
	
	<div>
		<b-row v-if="value" class="mb-3">
			<b-col>
				<b-row>
					<b-col>
						<i18n-input-widget
							v-bind:label="$t('MissionEditorWidget.label-mission-description')"
							id="selected-mission-description"
							tag="textarea"
							v-bind:locale="locale"
							v-bind:locale-label="value.description">
						></i18n-input-widget>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<list-widget
					v-bind:title="$t('MissionEditorWidget.label-mission-list')"
					v-bind:locale="locale"
					v-bind:localesList="localesList"
					v-bind:items="missions"
					v-bind:selected="selectedIndex"
					v-bind:disable="true"
					v-on:move-up="onMoveUpMission"
					v-on:move-down="onMoveDownMission"
					v-on:copy="onCopyMission"
					v-on:paste="onPasteMission"	
					v-on:delete="onDeleteMission"
					v-on:select="onSelectMission"
					v-on:add="onAddMission"
					v-on:enable="onEnableMission"
				></list-widget>
			</b-col>
		</b-row>
	</div>
</div>`
;


