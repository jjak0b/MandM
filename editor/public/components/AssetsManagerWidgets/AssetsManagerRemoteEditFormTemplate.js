export const template =
`
<b-form>
	<b-form-group
		v-bind:label="$t('AssetsManager.label-select-asset')"
		label-for="assets-manager-widget-input-asset"
		v-bind:valid-feedback="validity.feedback.valid"
		v-bind:invalid-feedback="validity.feedback.invalid"
		v-bind:state="validity.state"
	>
		<b-input-group class="mt-3">
			<b-input-group-prepend>
				<assets-manager-browser
					id="assets-manager-widget-browser-delete"
					v-model="selectedAsset"
					button-only="true"
				>
				</assets-manager-browser>
			</b-input-group-prepend>
			<b-form-input
				id="assets-manager-widget-input-asset"
				v-bind:value="selectedAsset"
				v-on:keydown.prevent
				readonly
			></b-form-input>
		</b-input-group>
	</b-form-group>
	<b-button-group>
		<b-button
			disabled="!canDelete"
			variant="danger"
			v-t="'shared.label-delete'"
		></b-button>
	</b-button-group>
</b-form>
`