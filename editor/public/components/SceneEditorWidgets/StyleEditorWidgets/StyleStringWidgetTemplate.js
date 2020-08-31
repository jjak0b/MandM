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
				v-bind:for="'StyleString-value-' + $attrs.id"
			>{{ $t('StyleEditorWidget.label-property-value' ) }}</label>
			<input
				type="text"
				v-bind:id="'StyleString-value-' + $attrs.id"
				v-bind:list="'StyleString-datalist-' + $attrs.id"
				v-model="value"
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