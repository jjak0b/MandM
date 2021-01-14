export const template = `
<b-form
	v-on:submit.prevent="onSubmit"
	v-on:reset.prevent="onReset"
>
    <h3
	    v-t="'ActivityEditorWidget.label-setup-your-condition'"
    ></h3>
    <p v-t="'ActivityEditorWidget.label-condition-required-to-continue-play-this-story-route'"
    ></p>
<b-form-group  v-if="condition"
    v-bind:label="$t('ActivityEditorWidget.label-point-assignment')"
	label-for="activity-editor-branch-point-assignment"
	>
		            <b-form-input
		            id="activity-editor-branch-point-assignment"
                    type="number"
                    v-model.number="condition.rewardPoints"
                    >
                    </b-form-input>
		    </b-form-group>
    <condition-parameter v-if="condition && condition.function"
	    :key="condition.function + '_0'"
	    v-bind:value="selfParameter"
	    id="activity-editor-branch-parameter-this"
	    v-bind:valueAcceptTypes="functionPrototypes[ condition.function ].arguments[ 0 ].accepts"
	    v-bind:variableOptions="variableOptions"
	    v-bind:sourceTypeOptions="sourceTypeOptions"
	    v-bind:function="condition.function"
	    v-bind:label="getParameterI18n( 'this' )"
    >
    </condition-parameter>
		
    <b-form-group v-if="condition"
	    v-bind:label="$t('ActivityEditorWidget.label-select-condition-to-check')"
	    label-for="activity-editor-branch-select-function"
	    v-bind:description="$t('ActivityEditorWidget.label-branch-condition-example')"
    >
	<b-form-select
		id="activity-editor-branch-select-function"
		v-bind:options="functionOptions"
		v-model="condition.function"
		required
	>
		<template #first>
			<b-form-select-option v-bind:value="null" disabled v-t="'shared.label-select-option'"
			></b-form-select-option>
		</template>
	</b-form-select>
</b-form-group>
<b-card v-if="condition && condition.function && parameters.length > 1"
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
			:key="condition.function + '_' + index"
		>
			<!-- avoid rendering self parameter 0-->
			<condition-parameter
				v-bind:value="param"
				v-bind:id="'activity-editor-branch-parameter-' + index"
				v-bind:valueAcceptTypes="functionPrototypes[ condition.function ].arguments[ index ].accepts"
				v-bind:variableOptions="variableOptions"
				v-bind:sourceTypeOptions="sourceTypeOptions"
				v-bind:function="condition.function"
				v-bind:label="getParameterI18n( functionPrototypes[ condition.function ].arguments[ index ].name )"
			>
			</condition-parameter>
		</b-list-group-item>
	</b-list-group>
</b-card>
<b-button-toolbar>
    <b-button-group
    	role="toolbar"
    	class="mx-1"
    >
		<b-button
			type="submit"
			variant="success"
			v-t="'shared.label-save'"
		></b-button>
		<b-button
			type="reset"
			variant="danger"
			v-t="'shared.label-reset'"
		></b-button>
    </b-button-group>
</b-button-toolbar>
</b-form>
`;