export const template =
`<div>
<b-card no-body>
	<b-card-header id="story-editor-label-tablist">{{ $t('StoryEditorWidget.label-story-editor') }}</b-card-header>
	<b-form v-on:submit.stop.prevent="onSubmit">
		<b-tabs pills card vertical lazy v-model="tabValue" ref="tabs">
			<template v-for="name in names">
				<b-tab v-bind:title="name">
					<b-skeleton-wrapper v-bind:loading="loading">
					<b-form-group
							v-bind:label="$t('StoryEditorWidget.label-story-description')"
							label-for="storyDescriptionInput">
						<b-form-textarea
								id="storyDescriptionInput"
								v-model="editStory.description">
						</b-form-textarea>
					</b-form-group>
					<b-form-group v-bind:label="$t('StoryEditorWidget.label-gamemode')">
						<b-form-radio-group v-model="editStory.gamemode">
							<template v-for="(localeLabel, key) in gamemodes">
								<b-form-group v-bind:label-for="'gamemode_' + key" v-bind:description="$t(localeLabel + '.description' )">
									<b-form-radio
											name="gamemode"
											v-bind:value="key">
										{{ $t(localeLabel + '.label' ) }}</b-form-radio>
								</b-form-group>
							</template>
						</b-form-radio-group>
					</b-form-group>
					<b-form-group v-bind:label="$t('StoryEditorWidget.label-age')">
						<b-form-radio-group stacked v-model="editStory.age">
							<template v-for="(localeLabel, key) in ages">
								<b-form-radio
										name="age"
										v-bind:value="key">
									{{ $t(localeLabel + '.label' ) }}</b-form-radio>
							</template>
						</b-form-radio-group>
					</b-form-group>
					</b-skeleton-wrapper>
				</b-tab>
			</template>
			<template v-slot:tabs-end>
			  <b-nav-item role="presentation" v-on:click.prevent="onAdd"><b>Add</b></b-nav-item>
			</template>	
			<template v-slot:empty>
			  <div class="text-center text-muted">
				{{ $t('StoryEditorWidget.label-empty-tabs-up') }}<br>
				{{ $t('StoryEditorWidget.label-empty-tabs-down') }}
			  </div>
			</template>
		</b-tabs>
		<b-form-row class="mr-5 mb-3 float-right">
			<b-button-toolbar>
				<b-button class="mx-1" type="submit" variant="primary">
					{{ $t('shared.label-save') }}
				</b-button>
				<b-button type="reset" variant="danger">
					{{ $t('shared.label-reset') }}
				</b-button>
			</b-button-toolbar>
		</b-form-row>
	</b-form>
</b-card>
<b-modal 
	id="addModal"
	v-bind:title="$t('StoryEditorWidget.label-add-new-story')"
	v-bind:ok-title="$t('shared.label-save')"
	centered
	v-on:show="resetModal"
	v-on:ok="saveModal">
	<b-form v-on:submit.stop.prevent>
		<b-form-group
				v-bind:label="$t('StoryEditorWidget.label-story-name')"
				label-for="storyNameInput">
			<b-form-input
					id="storyNameInput"
					v-model="newStory.name">
			</b-form-input>
		</b-form-group>
		<b-form-group
				v-bind:label="$t('StoryEditorWidget.label-story-description')"
				label-for="storyDescriptionInput">
			<b-form-textarea
					id="storyDescriptionInput"
					v-model="newStory.description">
			</b-form-textarea>
		</b-form-group>
		<b-form-group v-bind:label="$t('StoryEditorWidget.label-gamemode')">
			<b-form-radio-group v-model="newStory.gamemode">
				<template v-for="(localeLabel, key) in gamemodes">
					<b-form-group v-bind:label-for="'add_gamemode_' + key" v-bind:description="$t(localeLabel + '.description' )">
						<b-form-radio
								v-bind:id="'add_gamemode_' + key"
								name="gamemode"
								v-bind:value="key">
							{{ $t(localeLabel + '.label' ) }}</b-form-radio>
					</b-form-group>
				</template>
			</b-form-radio-group>
		</b-form-group>
		<b-form-group v-bind:label="$t('StoryEditorWidget.label-age')">
			<b-form-radio-group stacked v-model="newStory.age">
				<template v-for="(localeLabel, key) in ages">
					<b-form-radio
							v-bind:id="'add_age_' + key"
							name="age"
							v-bind:value="key">
						{{ $t(localeLabel + '.label' ) }}</b-form-radio>
				</template>
			</b-form-radio-group>
		</b-form-group>
	</b-form>
</b-modal>
</div>`
;
