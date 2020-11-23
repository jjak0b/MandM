export const template = `
<b-form
	v-on:submit.prevent="onSubmit"
	v-on:input=""
>
<b-form-group>
	<condition-parameter
		v-bind:value="selfParameter"
		id="activity-editor-branch-parameter-this"
		v-bind:valueAcceptTypes="functionPrototypes[ branch.condition.function ].arguments[ 0 ].accepts"
		v-bind:variableOptions="variableOptions"
		v-bind:sourceTypeOptions="sourceTypeOption"
		v-bind:function="branch.condition.function"
		v-bind:label="getParameterI18n( 'this' )"
	>
	</condition-parameter>
</b-form-group>
<b-form-group
	v-bind:label="$t('ActivityEditorWidget.label-select-condition-to-check')"
	label-for="activity-editor-branch-select-function"
>
	<b-form-select
		id="activity-editor-branch-select-function"
		v-bind:options="functionOptions"
		v-model="branch.condition.function"
		required
	>
		<template #first>
			<b-form-select-option v-bind:value="null" disabled v-t="'shared.label-select-option'"
			></b-form-select-option>
		</template>
	</b-form-select>
</b-form-group>
<b-form-group
	v-if="branch.condition.function && parameters.length > 0 "
	v-bind:label="$t('ActivityEditorWidget.label-condition-check-parameters')"
>
	<condition-parameter
		v-for="(param, index) in parameters"
		v-if="index > 0"
		:key="branch.condition.function + '_' + index"
		v-bind:value="param"
		v-bind:id="'activity-editor-branch-parameter-' + index"
		v-bind:valueAcceptTypes="functionPrototypes[ branch.condition.function ].arguments[ index ].accepts"
		v-bind:variableOptions="variableOptions"
		v-bind:sourceTypeOptions="sourceTypeOption"
		v-bind:function="branch.condition.function"
		v-bind:label="getParameterI18n( functionPrototypes[ branch.condition.function ].arguments[ index ].name )"
	>
	</condition-parameter>
</b-form-group>
</b-form>
`;