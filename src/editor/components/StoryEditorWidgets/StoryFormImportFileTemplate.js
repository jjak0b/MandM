export const template =
`
<b-form
	autocomplete="off"
	v-on:submit.prevent="onSubmit"
	v-on:reset="onReset"
>
	<b-form-group
		v-bind:label="$t('StoryEditorWidget.label-select-story-file')"
		label-for="story-editor-widget-form-import-input-file"
		v-bind:state="validity"
		v-bind:invalid-feedback="feedbackInvalid"
		v-bind:valid-feedback="feedbackValid"
	>
		<div class="d-flex">
			<div class="flex-grow-1 align-self-center" >
				<b-form-file
					id="story-editor-widget-form-import-input-file"
					v-model="file"
					accept="application/json"
					name="data"
					required="required"
					plain
				>
				</b-form-file>
			</div>
			<b-spinner
				v-if="isLoading"
				label="Loading ..."
				class="m-3 align-self-center"
			></b-spinner>
		</div>
	</b-form-group>
	<b-button-group>
		<b-button
			type="submit"
			v-bind:disabled="isLoading || validity === false"
			variant="success"
			v-t="'shared.label-import'"
		></b-button>
		<b-button
			type="reset"
			v-bind:disabled="isLoading"
			variant="warning"
			v-t="'shared.label-reset'"
		></b-button>
	</b-button-group>
</b-form>
`;