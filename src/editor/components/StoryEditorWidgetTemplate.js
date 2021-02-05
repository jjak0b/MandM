export const template =
		`
<div>
<div>
	<b-form v-on:submit.stop.prevent="updateStoryOnServer">
		<b-tabs pills card vertical lazy v-model="tabValue" ref="tabs">
			<template v-for="name in names">
				<b-tab v-bind:title="name" v-bind:key="name">
					<div
						v-if="loading === true || loading === false"
						class="mb-3"
					>
						<span
							role="status"
							aria-live="polite"
							
						>
							<span v-if="loading">
								<b-spinner
									role="img"
									aria-hidden="true"
									variant="primary"
								></b-spinner> {{ $t( 'shared.label-loading-resources' ) }}
							</span>
							<span
								v-else-if="loading === false"
							>{{ $t( 'shared.label-loading-completed' ) }}</span>
						</span>
					</div>
					<section
						v-if="!loading"
						aria-labelledby="story-editor-widget-section-h"
					>
						<b-row>
							<b-col>
								<h1
									class="text-center"
									id="story-editor-widget-section-h"
								>{{ value.name }}</h1>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="4">
								<section
									aria-labelledby="story-editor-widget-section-edit-h"
								>
									<h2
										id="story-editor-widget-section-edit-h"
									>{{ $t('StoryEditorWidget.label-edit-story') }}</h2>
								<i18n-selector-widget
									class="mx-3 my-4"
									id="i18n-selector-widget"
									v-bind:locale="locale"
									v-bind:locales-list="localesList"
									v-on:set-locale="$emit( 'update:locale', $event )"
								></i18n-selector-widget>
								<div aria-live="polite" >
									<b-form-checkbox switch
										class="mt-3"
										size="lg"
										id="publicStory"
										v-model="value.public">
										{{ $t('StoryEditorWidget.label-story-public') }}
									</b-form-checkbox>
									<a
										v-if="value.public && value.gamemode !== '2'"
										v-bind:href="playStoryURL"
										target="_blank"
										class="d-flex flex-column text-center"
									>
										<strong
											id="story-editor-widget-qr"
										>{{ $t('StoryEditorWidget.label-use-this-link-or-scan-this-qrcode-to-play') }}</strong>
										<qrcode
											class="mx-auto"
											v-bind:value="playStoryURL"
											v-bind:aria-label="$t('shared.label-qr-code')"
										></qrcode>
									</a>
								</div>
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
								</section>
							</b-col>
							<b-col >
								<mission-editor-widget
									id="mission-editor-widget"
									v-model="mission"
									v-bind:story="value"
									v-bind:missions="value.missions"
									v-bind:locale="locale"
									v-bind:localesList="localesList"
									v-bind:copied-mission="copiedMission"
									v-on:select-mission="selectMission"
									v-on:save-story="updateStoryOnServer"
									v-on:copy-mission="copyMission"
								></mission-editor-widget>
							</b-col>
						</b-row>
						<b-row v-if="value.gamemode === '2'">
							<b-col>
							<story-groups-widget
								class="mt-3"
								v-bind:locale="locale"
								v-bind:localesList="localesList"
								v-bind:missions="value.missions"
								v-bind:groups="value.groups"
								v-bind:public="value.public"
								v-bind:url="playStoryURL"
							></story-groups-widget>
							</b-col>
						</b-row>
						<b-row class="mr-5 mb-3 float-right">
							<b-col>
							<div
								class="mb-3"
							>
								<span
									role="status"
									aria-live="polite"
								>
									<span v-if="operationLoading">
										<b-spinner
											role="img"
											aria-hidden="true"
											variant="primary"
										></b-spinner> {{ $t( 'shared.label-loading' ) }}
									</span>
									<span
										v-else-if="operationLoading === false"
									>{{ $t( 'shared.status.label-operation-success' ) }}</span>
									<span
										v-else-if="operationLoading === null"
									>{{ $t( 'shared.status.label-operation-failed' ) }}</span>
								</span>
							</div>
							<b-button-toolbar>
								<b-button type="submit" variant="primary" :disabled="operationLoading" >
									{{ $t('shared.label-save') }}
								</b-button>
								<b-button class="mx-1" variant="info" :disabled="operationLoading" v-on:click="showDupModal">
									{{ $t('shared.label-duplicate') }}
								</b-button>
								<b-button class="mx-1" variant="secondary" :disabled="operationLoading" v-on:click="reloadStoryFromServer">
									{{ $t('StoryEditorWidget.label-reload-from-server') }}
								</b-button>
								<b-button variant="danger" :disabled="operationLoading" v-on:click="deleteStory">
									{{ $t('shared.label-delete') }}
								</b-button>
							</b-button-toolbar>
							</b-col>
						</b-row>
					</section>
				</b-tab>
			</template>
			<template v-slot:tabs-end>
			  <b-nav-item role="presentation" v-on:click.stop.prevent="$bvModal.show('addModal')"><b>{{ $t('StoryEditorWidget.label-add-new-story') }}</b></b-nav-item>
			</template>	
			<template v-slot:empty>
			  <div class="text-center text-muted">
				{{ $t('StoryEditorWidget.label-empty-tabs-up') }}<br>
				{{ $t('StoryEditorWidget.label-empty-tabs-down') }}
			  </div>
			</template>
		</b-tabs>
	</b-form>
</div>

<b-modal 
	id="duplicateModal"
	v-bind:title="$t('StoryEditorWidget.label-add-new-story')"
	v-bind:ok-title="$t('shared.label-save')"
	centered
	v-on:show="resetModal"
	v-on:ok="saveDupModal">
	<b-form v-on:submit.stop.prevent>
		<b-form-group
				v-bind:label="$t('StoryEditorWidget.label-story-name')"
				label-for="storyNameInput">
			<b-form-input
					id="storyNameInput"
					v-model="newStory.name">
			</b-form-input>
		</b-form-group>
	</b-form>
</b-modal>
<b-modal 
	id="addModal"
	v-bind:title="$t('StoryEditorWidget.label-add-new-story')"
	v-bind:ok-title="$t('shared.label-save')"
	centered
	v-on:show="resetModal"
	v-on:ok="onOkModal"
>	
	<form
		ref="newStoryForm"
		v-on:submit.prevent.stop="onModalSubmit"
		autocomplete="off"
	>
		<b-form-group
			v-bind:label="$t('StoryEditorWidget.label-story-name')"
			label-for="storyNameInput"
			v-bind:state="newStoryForm.name.state"
			
			:invalid-feedback="$t('shared.label-invalid-name-already-exists')"
		>
			<b-form-input
				required
				type="text"
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
		<div class="mb-2">
			<label
				for="story-editor-widget-new-locale"
			>{{ $t( 'StoryEditorWidget.label-select-internationalization' ) }}</label>
			<b-form-select
				id="story-editor-widget-new-locale"
				v-model="newStoryLocale"
				required
			>
				<b-form-select-option
					v-for="(lang, code) in I18nUtils.i18nCodes"
					v-bind:value="code"
				>{{ lang.englishName }} [ {{code}} ]</b-form-select-option>
			</b-form-select>
		</div>
		<b-form-group
			v-bind:label="$t('StoryEditorWidget.label-gamemode')"
		>
			<b-form-radio-group v-model="newStory.gamemode"
				required
			>
				<template v-for="(localeLabel, key) in gamemodes">
					<b-form-group
						v-bind:label-for="'add_gamemode_' + key" v-bind:description="$t(localeLabel + '.description' )" 
					>
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
						v-bind:value="key"
					>{{ $t(localeLabel + '.label' ) }}</b-form-radio>
				</template>
			</b-form-radio-group>
		</b-form-group>
		<input
			ref="newStoryFormSubmit"
			type="submit"
			hidden
			aria-hidden="true"
		>
	</form>
</b-modal>
</div>`
;
