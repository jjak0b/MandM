export const template =
`
<b-form
	autocomplete="off"
	v-on:submit.prevent="onSubmit"
	v-on:reset="onReset"
	class="d-flex"
>
	<fieldset>
		<legend v-t="'AssetsManager.label-select-and-upload'"></legend>
			<b-form-group
				v-bind:label="$t('AssetsManager.label-select-media-file')"
				label-for="assets-manager-widget-form-upload-category"
				v-bind:state="validity.category.state"
			>
				<b-form-select
					id="assets-manager-widget-form-upload-category"
					v-model="form.category"
					:options="optionsCategories"
					class="mb-3"
					size="md"
				>
					<template v-slot:first>
						<b-form-select-option
							v-bind:value="null"
							disabled
							v-t="'shared.label-select-option'"
						></b-form-select-option>
					</template>
				</b-form-select>
			</b-form-group>

			<b-form-group v-if="validity.category.state"
				v-bind:label="$t('AssetsManager.label-select-media-file')"
				label-for="assets-manager-widget-form-upload-input-file"
				v-bind:state="validity.file.state"
				v-bind:invalid-feedback="getFeedback( 'file', false )"
				v-bind:valid-feedback="getFeedback( 'file', true )"
			>
				<div class="d-flex">
					<div class="flex-grow-1 align-self-center" >
						<b-form-file
							id="assets-manager-widget-form-upload-input-file"
							v-model="form.file"
							v-bind:accept="acceptMIMETypes[ form.category ].accept"
							name="data"
							required="required"
							plain
						>
						</b-form-file>
					</div>
				</div>
			</b-form-group>
			
			<b-form-group v-if="form.file && validity.file.state === true"
				label-for="assets-manager-upload-form-upload-input-name"
				v-bind:label="$t('AssetsManager.label-asset-name')"
				v-bind:state="validity.name.state"
				v-bind:valid-feedback="getFeedback( 'name', true )"
				v-bind:invalid-feedback="getFeedback( 'name', false )"
				v-bind:description="$t('AssetsManager.label-asset-name-description')"
			>
				<b-input-group
					v-bind:append="fileExtension"
				>
					<b-form-input
						id="assets-manager-upload-form-upload-input-name"
						required="required"
						v-model="form.name"
						name="name"
					></b-form-input>
				</b-input-group>
			</b-form-group>
				
			<div class="form-group" v-if="validity.name.state === false" >
				<b-form-checkbox
					v-model="validity.name.stateOverride"
					name="replace"
					v-bind:value="true"
					v-bind:unchecked-value="false"
				>{{ $t('AssetsManager.label-replace-existing') }}</b-form-checkbox>
			</div>
		</div>
	</fieldset>
	<div class="d-flex align-items-center m-3">
		<div class="d-table" role="group" style="border-spacing: 0.5rem">
			<div class="d-table-row">
				<div class="d-table-cell align-middle">
					<b-button
						type="submit"
						variant="success"
						v-t="'shared.label-upload'"
						v-bind:disabled="!canSubmit"
						class="w-100"
					></b-button>
				</div>
				<div class="d-table-cell align-middle"
					v-if="isLoading"
				>
					<div class="d-flex">
						<b-spinner
							label="Uploading ..."
							class="m-3 align-self-center"
						></b-spinner>
						<b-progress
							v-bind:value="loadingPercentage"
							v-bind:max="100"
							class="m-3 align-self-center"
							height="2rem"
							style="width: 10rem"
							show-progress
							animated
						>
							<b-progress-bar
								v-bind:value="loadingPercentage"
								v-bind:label="loadingPercentage.toFixed(1) + ' %'"
							></b-progress-bar>
						</b-progress>
					</div>
				</div>
				<div class="d-table-cell align-middle" aria-atomic="true" id="assets-manager-upload-form-operation-feedback"> 
					<span
						v-bind:role="validity.operation.state !== null ? 'alert' : null"
						aria-live="assertive"
						class="d-inline"
						v-bind:class="validity.operation.state === true ? 'valid-feedback' : 'invalid-feedback'"
					>{{ getFeedback( 'operation', validity.operation.state ) }}</span>
				</div>
			</div>
			<div class="d-table-row">
				<div class="d-table-cell align-middle">
					<b-button
						type="reset"
						v-bind:disabled="isLoading"
						variant="warning"
						v-t="'shared.label-reset'"
						class="w-100"
					></b-button>
				</div>
			</div>
		</div>
	</div>
</b-form>
`;