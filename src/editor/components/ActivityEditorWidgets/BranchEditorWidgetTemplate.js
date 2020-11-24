export const template = `
<b-form
	v-on:submit.prevent="onSubmit"
>
<h3
	v-t="'ActivityEditorWidget.label-setup-your-condition'"
></h3>
<p v-t="'ActivityEditorWidget.label-condition-required-to-continue-play-this-story-route'"
></p>

<condition-parameter v-if="branch.condition.function"
	v-bind:value="selfParameter"
	id="activity-editor-branch-parameter-this"
	v-bind:valueAcceptTypes="functionPrototypes[ branch.condition.function ].arguments[ 0 ].accepts"
	v-bind:variableOptions="variableOptions"
	v-bind:sourceTypeOptions="sourceTypeOptions"
	v-bind:function="branch.condition.function"
	v-bind:label="getParameterI18n( 'this' )"
>
</condition-parameter>
<b-form-group
	v-bind:label="$t('ActivityEditorWidget.label-select-condition-to-check')"
	label-for="activity-editor-branch-select-function"
	v-bind:description="$t('ActivityEditorWidget.label-branch-condition-example')"
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
<b-card v-if="branch.condition.function && parameters.length > 1"
>
	<template #header>
        <h5
        	class="mb-0"
        	id="activity-editor-branch-parameters"
        	v-t="'ActivityEditorWidget.label-condition-check-parameters'"
        ></h5>
      </template>
	<b-list-group
		tag="ol"
		aria-labelledby="activity-editor-branch-parameters"
	>
		<b-list-group-item tag="li"
			v-for="(param, index) in parameters"
			v-if="index > 0 "
			:key="branch.condition.function + '_' + index"
		>
			<!-- avoid rendering self parameter 0-->
			<condition-parameter
				v-bind:value="param"
				v-bind:id="'activity-editor-branch-parameter-' + index"
				v-bind:valueAcceptTypes="functionPrototypes[ branch.condition.function ].arguments[ index ].accepts"
				v-bind:variableOptions="variableOptions"
				v-bind:sourceTypeOptions="sourceTypeOptions"
				v-bind:function="branch.condition.function"
				v-bind:label="getParameterI18n( functionPrototypes[ branch.condition.function ].arguments[ index ].name )"
			>
			</condition-parameter>
		</b-list-group-item>
	</b-list-group>
</b-card>

</b-form>
`;