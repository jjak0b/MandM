export const template =
`
<b-form
	v-on:submit.prevent="onSubmit"
>
	<b-form-group
		v-bind:label="$t('StoryEditor.label-upload-story-into-server')"
	>
		<b-form-group
			label-for="story-editor-widget-form-create-input-name"
			v-bind:label="$t('StoryEditor.label-story-name')"
			v-bind:state="validityName"
			v-bind:valid-feedback="$t('StoryEditor.label-valid-name-available')"
			v-bind:description="$t('StoryEditor.label-create-new-story')"
		>
			<b-form-input
				id="story-editor-widget-form-create-input-name"
				required="required"
				v-model="name"
				name="name"
			></b-form-input>
			<template v-slot:invalid-feedback
			>
				<span v-t="'StoryEditor.label-invalid-name-already-exists'"></span>
			</template>
		</b-form-group>
		
		<div class="form-group">
			<b-form-checkbox
				v-if="validityName === false"
				v-model="validityForm"
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
					v-bind:disabled="!canSubmit"
				></b-button>
			</b-button-group>
			<b-spinner
				v-if="isLoading"
				label="Uploading ..."
				class="m-3 align-self-center"
			></b-spinner>
			<div class="m-3 align-self-center"> 
				<span
					v-if="validityOperation"
					v-t="'shared.status.label-operation-completed-successfully'"
					class="valid-feedback d-inline"
				></span>
				<span
					v-else-if="validityOperation === false"
					v-t="'shared.status.label-operation-failed'"
					class="invalid-feedback d-inline"
				></span>
			</div>
		</div>
	</b-form-group>
</b-form>
`