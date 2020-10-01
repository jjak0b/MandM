export const template =
`
<div
	class="row"
>
	<div
		class="col"
	>
		<div class="form-group">
			<label
				v-bind:for="'StyleURI-value-' + $attrs.id"
			>{{ $t('StyleEditorWidget.label-property-value' ) }}</label>
			<input
				type="url"
				v-bind:id="'StyleURI-value-' + $attrs.id"
				v-bind:list="'StyleURI-datalist-' + $attrs.id"
				v-bind:value="value"
				v-on:input="$emit('input', $event.target.value )"
				class="form-control"
			/>
			<datalist
				v-bind:id="'StyleString-datalist-' + $attrs.id"
			>
				<option
					v-for="defaultValue in acceptedDefaultValues"
					v-bind:value="defaultValue"
				>{{ defaultValue }}</option>
			</datalist>
		</div>
	</div>
</div>
`