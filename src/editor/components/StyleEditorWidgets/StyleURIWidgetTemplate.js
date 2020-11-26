export const template =
`
<div
	class="row"
>
	<div
		class="col"
	>
		<b-form-group
			v-bind:label="$t('StyleEditorWidget.label-property-value' )"
			v-bind:label-for="'StyleURI-value-' + $attrs.id"
		>
			<b-input-group class="mt-3">
				<b-input-group-prepend>
					<assets-manager-browser
						v-bind:force-filter="['images']"
						v-bind:id="'StyleURI-asset-value-' + $attrs.id"
						v-bind:aria-controls="'StyleURI-value-' + $attrs.id"
						v-bind:value="selectedAsset"
						v-on:input="onInputAsset"
						v-bind:button-only="true"
					>
					</assets-manager-browser>
				</b-input-group-prepend>
				<b-form-input
					v-bind:id="'StyleURI-value-' + $attrs.id"
					v-bind:list="'StyleURI-datalist-' + $attrs.id"
					v-bind:value="valueInput"
					v-on:input="onInputText"
				>
				</b-form-input>
				<datalist
					v-bind:id="'StyleURI-datalist-' + $attrs.id"
				>
					<option
						v-for="defaultValue in acceptedDefaultValues"
						v-bind:value="defaultValue"
					>{{ defaultValue }}</option>
				</datalist>
			</b-input-group>
		</b-form-group>
	</div>
</div>
`