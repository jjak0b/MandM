export const template =
`
<b-form
	v-on:submit.prevent="onSubmit"
	v-on:reset="onReset"
>
	<b-form-group
		v-bind:label="$t('StoryEditorWidget.label-story-to-import')"
		label-for="story-editor-widget-form-import-select-story"
		v-bind:state="validity"
		v-bind:invalid-feedback="feedbackInvalid"
		v-bind:valid-feedback="feedbackValid"
	>
		<div class="d-flex">
			<div class="flex-grow-1 align-self-center" >
				<b-form-select
					id="story-editor-widget-form-import-select-story"
					v-model="name"
					v-bind:options="names"
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
				v-if="isLoading"
				label="Downloading ..."
				class="m-3 align-self-center"
			></b-spinner>
		</div>
	</b-form-group>
	<b-button-group>
		<b-button
			type="submit"
			v-bind:disabled="isLoading"
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
`