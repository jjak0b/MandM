export const template =
`<div>
	<b-modal
		id="addMissionModal"
		v-bind:title="$t('MissionEditorWidget.label-add-new-mission')"
		v-bind:ok-title="$t('shared.label-save')"
		centered
		v-on:ok="add">
		<i18n-input-widget
			v-bind:tag="'input'"
			v-bind:label="$t( 'MissionEditorWidget.label-mission-title' )"
			v-bind:id="'mission-editor-mission-title-' + nextId"
			name="missionTitle"
			type="text"
			required="required"
			v-bind:locale="locale"
			v-bind:locale-label="newMission.title"
		></i18n-input-widget>
		<i18n-input-widget
			v-bind:tag="'textarea'"
			v-bind:label="$t( 'MissionEditorWidget.label-mission-description' )"
			v-bind:id="'mission-editor-mission-description-' + nextId"
			name="missionDescription"
			rows="4"
			v-bind:locale="locale"
			v-bind:locale-label="newMission.description"
		></i18n-input-widget>
	</b-modal>
	
	<div>
		<h3 v-t="'MissionEditorWidget.label-mission-list'" ></h3>
		<list-widget
			v-bind:locale="locale"
			v-bind:localesList="localesList"
			v-bind:items="missionNames"
			v-bind:selected="selectedIndex"
			v-on:move-up="onMoveUp"
			v-on:move-down="onMoveDown"
			v-on:copy="onCopy"
			v-on:paste="onPaste"	
			v-on:delete="onDelete"
			v-on:select="onSelect"
			v-on:add="onAdd"
		></list-widget>
	</div>
</div>`
;


