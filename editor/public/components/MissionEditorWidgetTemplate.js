export const template =
`<div>
	<b-card no-body aria-labelledby="mission-editor-label-tablist">
		<b-card-header id="mission-editor-label-tablist">{{ $t('MissionEditorWidget.label-mission-list') }}</b-card-header>
		<b-tabs card vertical
			v-on:input="load($event)"
		>
			<b-tab
				v-for="(mission, index) in missions"
				:key="'mission-' + index"
			>
				<template v-slot:title>
					<span>{{ $t(mission.title, locale) }}</span>
				</template>
				<b-form
					autocomplete="off"
				>
					<div class="btn-group">
						<b-button
							variant="danger"
							v-on:click="remove( index )"
							v-t="'shared.label-remove'"
						></b-button>
					</div>
					<hr>
					<i18n-input-widget
						v-bind:tag="'input'"
						v-bind:label="$t( 'MissionEditorWidget.label-mission-title' )"
						id="mission-title"
						name="missionTitle"
						type="text"
						required="required"
						v-bind:locale="locale"
						v-bind:locale-label="mission.title"
						v-bind:placeholder="missionPlaceholderTitle"
					></i18n-input-widget>
					<i18n-input-widget
						v-bind:label="$t( 'MissionEditorWidget.label-mission-description' )"
						v-bind:tag="'textarea'"
						id="mission-description"
						name="missionDescription"
						rows="4"
						v-bind:locale="locale"
						v-bind:locale-label="mission.description"
					></i18n-input-widget>
				</b-form>
			</b-tab>
			
			<!-- New Tab Button  -->
			<template v-slot:tabs-end>
				<b-nav-item
					role="presentation"
					v-on:click.prevent="add" href="#"
				><b>{{ $t('shared.label-add') }}</b></b-nav-item>
			</template>
	
			<!-- Render this if no tabs -->
			<template v-slot:empty>
				<div
					id="mission-editor-empty-description"
					class="text-center text-muted"
				>
					{{ $tc('shared.label-missions', missions.length) }}<br>
					{{ $t('MissionEditorWidget.label-add-mission-to-edit') }}
				</div>
			</template>
		</b-tabs>
	</b-card>
</div>`
;


