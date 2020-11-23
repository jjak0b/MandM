export const template =
`
<b-form-group
	class="row"
	v-bind="$attrs"
	v-on="$listeners"
>
	<b-form-group
		class="col"
		v-bind:label="$t('ActivityEditorWidget.label-select-source-of-parameter-value')"
		v-bind:label-for="$attrs.id + '-select-sourceType'"
	>
		<b-form-select
			v-bind:id="$attrs.id + '-select-sourceType'"
			v-model="value.sourceType"
			v-bind:options="sourceTypeOptions"
			required
		>
			<b-form-select-option v-bind:value="null" disabled v-t="'shared.label-select-option'"></b-form-select-option>
		</b-form-select>
	</b-form-group>
	<div v-if="value.sourceType == 'value'"
		class="col"
	>
		<typed-value
			v-bind:acceptTypes="valueAcceptTypes"
			v-model="value.sourceValue"
			required
		></typed-value>
	</div>
	<div v-else-if="value.sourceType == 'variable'"
		class="col"
	>
		<b-form-group
			v-bind:label="$t('ActivityEditorWidget.label-select-a-variable')"
			v-bind:label-for="$attrs.id + '-select-variable'"
		>
			<b-form-select 
				v-bind:id="$attrs.id + '-select-variable'"
				v-bind:options="variableOptions"
				v-model="value.sourceValue"
				required
			></b-form-select>
		</b-form-group>
	</div>
</b-form-group>
`;