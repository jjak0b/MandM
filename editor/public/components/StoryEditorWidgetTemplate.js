export const template =
`<div>
	
	<b-form
		v-on:submit.prevent="onFormImportSubmit"
		v-on:reset="onFormImportReset"
	>
		<h2 v-t="'StoryEditor.label-import-story'"></h2>
		<b-form-group
			v-bind:label="$t('StoryEditor.label-select-story-source')"
		>
			<b-row>
				<b-col>
					<b-form-group v-if="!formImport.remoteName"
						v-bind:label="$t('StoryEditor.label-import-story-from-file')"
						label-for="story-editor-widget-form-import-input-file"
						v-bind:state="formImport.validityFile"
						v-bind:invalid-feedback="$t('StoryEditorWidget.label-invalid-json')"
						v-bind:valid-feedback="$t('StoryEditorWidget.label-valid-json')"
					>
						<div class="d-flex">
							<div class="flex-grow-1 align-self-center" >
								<b-form-file
									id="story-editor-widget-form-import-input-file"
									v-model="formImport.file"
									accept="application/json"
									name="data"
									required="required"
									plain
								>
								</b-form-file>
							</div>
							<b-spinner
								v-if="formImport.isLoading"
								label="Loading ..."
								class="m-3 align-self-center"
							></b-spinner>
						</div>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group v-if="!formImport.file"
						v-bind:label="$t('StoryEditor.label-import-story-from-server')"
						label-for="story-editor-widget-form-import-select-story"
						v-bind:state="formImport.validityRemoteName"
						v-bind:invalid-feedback="$t('StoryEditorWidget.label-invalid-unable-get-from-remote')"
						v-bind:valid-feedback="$t('StoryEditorWidget.label-valid-downloaded-from-remote')"
					>
						<div class="d-flex">
							<div class="flex-grow-1 align-self-center" >
								<b-form-select
									id="story-editor-widget-form-import-select-story"
									v-model="formImport.remoteName"
									v-bind:options="remoteStories"
									required="required"
								>
									<template v-slot:first>
										<b-form-select-option
											v-bind:value="null"
											selected="selected"
											disabled="disabled"
											v-t="'shared.label-select-option'"
										></b-form-select-option>
									</template>
								</b-form-select>
							</div>
							<b-spinner
								v-if="formImport.isLoading"
								label="Downloading ..."
								class="m-3 align-self-center"
							></b-spinner>
						</div>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form-group>
		<b-button-group>
			<b-button
				type="submit"
				v-bind:disabled="formImport.isLoading || (formImport.validityFile === false || formImport.validityRemoteName === false)"
				variant="success"
				v-t="'shared.label-import'"
			></b-button>
			<b-button
				type="reset"
				v-bind:disabled="formImport.isLoading"
				variant="warning"
				v-t="'shared.label-reset'"
			></b-button>
		</b-button-group>
	</b-form>
	<b-form
		v-on:submit.prevent="onFormExportSubmit"
	>
		<h2 v-t="'StoryEditor.label-export-story'"></h2>
		<b-form-row>
			<b-col class="d-flex">
				<a
					href=""
					v-on:click="updateStoryURI"
					v-t="'StoryEditor.label-export-story-as-file'"
					class="btn btn-primary align-self-center mx-auto"
					v-bind:class="!value ? 'disabled' : null"
				></a>
			</b-col>
			<b-col>
				<b-form-group
					v-bind:label="$t('StoryEditor.label-upload-story-into-server')"
				>
					<b-form-group
						label-for="story-editor-widget-form-create-input-name"
						v-bind:label="$t('StoryEditor.label-story-name')"
						v-bind:state="formExport.validityName"
						v-bind:valid-feedback="$t('StoryEditor.label-valid-name-available')"
						v-bind:description="$t('StoryEditor.label-create-new-story')"
					>
						<b-form-input
							id="story-editor-widget-form-create-input-name"
							required="required"
							v-model="formExport.name"
							name="name"
						></b-form-input>
						<template v-slot:invalid-feedback
						>
							<span v-t="'StoryEditor.label-invalid-name-already-exists'"></span>
						</template>
					</b-form-group>
					
					<div class="form-group">
						<b-form-checkbox
							v-if="formExport.validityName === false"
							v-model="formExport.validityForm"
							name="replace"
							v-bind:value="true"
							v-bind:unchecked-value="false"
						>{{ $t('StoryEditor.label-replace-existing') }}</b-form-checkbox>
					</div>
	
					<div class="d-flex">
						<b-button-group class="align-self-center">
							<b-button
								type="submit"
								variant="success"
								v-t="'shared.label-upload'"
								v-bind:disabled="!formExportCanSubmit"
							></b-button>
						</b-button-group>
						<b-spinner
							v-if="formExport.isLoading"
							label="Uploading ..."
							class="m-3 align-self-center"
						></b-spinner>
						<div class="m-3 align-self-center"> 
							<span
								v-if="formExport.validityOperation"
								v-t="'shared.status.label-operation-completed-successfully'"
								class="valid-feedback d-inline"
							></span>
							<span
								v-else-if="formExport.validityOperation === false"
								v-t="'shared.status.label-operation-failed'"
								class="invalid-feedback d-inline"
							></span>
						</div>
					</div>
				</b-form-group>
			</b-col>
		</b-form-row>
	</b-form>
	<b-form
		v-on:submit.prevent
	>
		<b-form-group>
			<b-form-row>
				<b-col>
					<div v-for="(localeLabel, key) in gamemodes" >
						<input type="radio" v-bind:id="'mode_'+key" v-bind:value="key" v-model="value.gamemode" name="'gamemode'" aria-describedby="gamemode-description">
						<label v-bind:for="'mode_' + key">{{ $t(localeLabel + '.label' ) }}</label>
					</div>
				</b-col>
				<b-col id="gamemode-description">
					<p v-for="(localeLabel, key) in gamemodes" v-if="value.gamemode == key">{{ $t( localeLabel + '.description' ) }}</p>
				</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</div>`
;
