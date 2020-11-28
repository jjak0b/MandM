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
				v-bind:for="'StyleUnit-value-' + $attrs.id"
			>{{ $t('StyleEditorWidget.label-property-value' ) }}</label>
			<input
				type="text"
				v-bind:id="'StyleUnit-value-' + $attrs.id"
				v-bind:list="'StyleUnit-datalist-' + $attrs.id"
				v-model="unitValue"
				class="form-control"
			/>
			<datalist
				v-bind:id="'StyleUnit-datalist-' + $attrs.id"
			>
				<option
					v-for="defaultValue in acceptedDefaultValues"
					v-bind:value="defaultValue"
				>{{ defaultValue }}</option>
			</datalist>
		</div>
	</div>
	<div
		class="col"
	>
		<div
			v-if="isValueNumber"
			class="form-group"
		>
			<label
				v-bind:for="'StyleUnit-unit-' + $attrs.id"
			>{{ $t('StyleEditorWidget.label-property-value' ) }}</label>
			<select
				v-bind:id="'StyleUnit-unit-' + $attrs.id"
				class="form-control"
				v-model="unitName"
			>
				<optgroup v-bind:label="$t('StyleEditorWidget.StyleLengthWidget.units.label_relative')">
					<option
						v-for="unit in units.relatives"
						v-bind:selected="unit == '%' ? 'selected' : undefined"
						v-bind:value="unit"
					>{{ unit }}</option>
				</optgroup>
				<optgroup v-bind:label="$t('StyleEditorWidget.StyleLengthWidget.units.label_absolute')">
					<option
						v-for="unit in units.absolutes"
						v-bind:value="unit"
					>{{ unit }}</option>
				</optgroup>
			</select>
		</div>
	</div>
</div>
`