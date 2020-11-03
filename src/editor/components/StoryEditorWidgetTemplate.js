export const template =
		`<div>
<b-card no-body v-if="!locale">
	<div class="text-center text-muted my-5">
		{{ $t('StoryEditorWidget.label-select-internationalization') }}
	</div>
</b-card>
<b-card no-body v-else>
	<b-card-header id="story-editor-label-tablist">
	 <b-spinner variant="primary" v-if="loading" class="mr-2"></b-spinner>
	{{ $t('StoryEditorWidget.label-story-editor') }}</b-card-header>
	<div class="text-center text-muted my-5" v-if="locale === null">
		{{ $t('StoryEditorWidget.label-select-internationalization') }}
	</div>
	<b-form v-on:submit.stop.prevent="onUpdate" v-else>
		<b-tabs pills card vertical lazy v-model="tabValue" ref="tabs">
			<template v-for="name in names">
				<b-tab v-bind:title="name" v-bind:key="name">
					<div v-if="loading" style="padding-bottom: 25em;"></div>
					<template v-else>
						<b-form-row>
							<h2>{{ value.name }}</h2><hr>
						</b-form-row>
						<b-form-row>
							<b-col cols="4">
								<h3>{{ $t('StoryEditorWidget.label-edit-story') }}</h3>
								<b-form-group
										v-bind:label="$t('StoryEditorWidget.label-story-description')"
										label-for="storyDescriptionInput">
									<b-form-textarea
											id="storyDescriptionInput"
											v-model="value.description">
									</b-form-textarea>
								</b-form-group>
								<b-form-group v-bind:label="$t('StoryEditorWidget.label-gamemode')">
									<b-form-radio-group v-model="value.gamemode">
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
									<b-form-radio-group stacked v-model="value.age">
										<template v-for="(localeLabel, key) in ages">
											<b-form-radio
													name="age"
													v-bind:value="key">
												{{ $t(localeLabel + '.label' ) }}</b-form-radio>
										</template>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col offset="1" cols="5">
								<mission-editor-widget
									id="mission-editor-widget"
									v-model="mission"
									v-bind:missions="value.missions"
									v-bind:locale="locale"
									v-bind:localesList="localesList"
									v-bind:copied-mission="copiedMission"
									v-on:select-mission="selectMission"
									v-on:save-story="onUpdate"
									v-on:copy-mission="copyMission"
								></mission-editor-widget>
							</b-col>
						</b-form-row>
						<b-form-row v-if="value.gamemode === '2'">
							<b-col>
							<story-groups-widget
								class="mt-3"
								v-bind:locale="locale"
								v-bind:localesList="localesList"
								v-bind:missions="value.missions"
								v-bind:groups="value.groups"
							></story-groups-widget>
							</b-col>
						</b-form-row>
						<b-form-row class="mr-5 mb-3 float-right">
							<b-button-toolbar>
								<b-button type="submit" variant="primary" v-bind:disabled="!canUpdate">
									{{ $t('shared.label-save') }}
								</b-button>
								<b-button class="mx-1" variant="secondary" v-on:click="onReload" v-bind:disabled="!canReload">
									{{ $t('StoryEditorWidget.label-reload-from-server') }}
								</b-button>
								<b-button variant="danger" v-on:click="onDelete">
									{{ $t('shared.label-delete') }}
								</b-button>
							</b-button-toolbar>
						</b-form-row>
					</template>
				</b-tab>
			</template>
			<template v-slot:tabs-end>
			  <b-nav-item role="presentation" v-on:click.stop.prevent="onAdd"><b>{{ $t('StoryEditorWidget.label-add-new-story') }}</b></b-nav-item>
			</template>	
			<template v-slot:empty>
			  <div class="text-center text-muted">
				{{ $t('StoryEditorWidget.label-empty-tabs-up') }}<br>
				{{ $t('StoryEditorWidget.label-empty-tabs-down') }}
			  </div>
			</template>
		</b-tabs>
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