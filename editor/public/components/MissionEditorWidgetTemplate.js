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
			v-bind:locale-label="'assets.mission.' + nextId + '.title'"
			v-bind:placeholder="missionPlaceholderTitle"
		></i18n-input-widget>
		<i18n-input-widget
			v-bind:tag="'textarea'"
			v-bind:label="$t( 'MissionEditorWidget.label-mission-description' )"
			v-bind:id="'mission-editor-mission-description-' + nextId"
			name="missionDescription"
			rows="4"
			v-bind:locale="locale"
			v-bind:locale-label="'assets.mission.' + nextId + '.description'"
		></i18n-input-widget>
	</b-modal>
	
	<div class="mb-5 pb-5">
		<h3 v-t="'MissionEditorWidget.label-mission-list'" ></h3>
		<list-widget
			v-bind:locale="locale"
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
	
	<b-card class="mt-5" v-if="value">
		<b-form v-on:submit.stop.prevent="">
			<h3 v-t="'MissionEditorWidget.label-selected-mission'" ></h3>
			<i18n-input-widget
				v-bind:tag="'input'"
				v-bind:label="$t( 'MissionEditorWidget.label-mission-title' )"
				v-bind:id="'mission-editor-mission-title-' + selectedId"
				name="missionTitle"
				type="text"
				required="required"
				v-bind:locale="locale"
				v-bind:locale-label="'assets.mission.' + selectedId + '.title'"
				v-bind:placeholder="missionPlaceholderTitle"
			></i18n-input-widget>
			<i18n-input-widget
				v-bind:tag="'textarea'"
				v-bind:label="$t( 'MissionEditorWidget.label-mission-description' )"
				v-bind:id="'mission-editor-mission-description-' + selectedId"
				name="missionDescription"
				rows="4"
				v-bind:locale="locale"
				v-bind:locale-label="'assets.mission.' + selectedId + '.description'"
			></i18n-input-widget>
		</b-form>
	</b-card>
</div>`
;


