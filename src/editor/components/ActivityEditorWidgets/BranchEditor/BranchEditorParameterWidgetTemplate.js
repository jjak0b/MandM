export const template =
`
<b-form-group
	v-bind="$attrs"
	v-on="$listeners"
>
<b-form-row>
	<b-col
		sm
	>
		<b-form-group
			v-bind:label="$t('ActivityEditorWidget.label-select-source-of-parameter-value')"
			v-bind:label-for="$attrs.id + '-select-sourceType'"
		>
			<b-form-select
				v-bind:id="$attrs.id + '-select-sourceType'"
				v-model="value.sourceType"
				v-bind:options="sourceTypeOptions"
				required
			>
				<template #first>
					<b-form-select-option v-bind:value="null" disabled v-t="'shared.label-select-option'"
					></b-form-select-option>
				</template>
			</b-form-select>
		</b-form-group>
	</b-col>
	<b-col
		sm
	>
		<div v-if="value.sourceType == 'value'"
		>
			<b-form-group
				v-bind:label="$t('DataEditorWidget.label-create-value-you-need')"
			>
				<typed-value
					v-bind:id="$attrs.id + '-field-value'"
					v-bind:acceptTypes="valueAcceptTypes"
					v-model="value.sourceValue"
				></typed-value>
			</b-form-group>
		</div>
		<div v-else-if="value.sourceType == 'variable'"
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
				>
					<template #first>
						<b-form-select-option v-bind:value="null" disabled v-t="'shared.label-select-option'"
						></b-form-select-option>
					</template>
				</b-form-select>
			</b-form-group>
		    
		</div>
	</b-col>
</b-form-row>
</b-form-group>
`;