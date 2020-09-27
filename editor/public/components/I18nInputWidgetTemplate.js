export const template =
`
<b-form-group
	role="region"
	v-bind:aria-label="$t('i18n.label')"
	class="i18n-editable-group bg-info text-white px-2 rounded"
	v-bind:id="$attrs.id"
	v-bind:label="$attrs.label"
	v-bind:label-for="$attrs.id + '_' +tag"
	v-bind:invalid-feedback="$attrs.invalidFeedback"
	v-bind:valid-feedback="$attrs.validFeedback"
	v-bind:state="$attrs.state"
	v-bind:description="$attrs.description || '!'"
>
	<component
		v-bind="$attrs"
		v-bind:id="$attrs.id + '_' + tag"
		v-bind:is="componentName"
		v-on="$listeners"
		v-on:input="notifyValue( 'input', $event )"
		v-bind:disabled="isDisabled"
		v-bind:value="getContent()"
	></component>
	<template v-slot:description>
		<div class="text-light">
			<p v-if="$attrs.description" class="text-justify">{{ $attrs.description }}</p>
			<span class="d-flex" role="presentation" aria-atomic="true">
				<span class="flex-grow-1">
					<span class="glyphicon glyphicon-flag" role="img" :aria-label="$tc('shared.i18n.label-locale', '')"></span>
					{{ I18nUtils.i18nCodes[ locale ] ? I18nUtils.i18nCodes[ locale ].nativeName : $t('shared.i18n.label-no-locale') }}
				</span>
				<span class="text-wrap" v-t="'i18n.label-description-region'"></span>
			</span>
		</div>
	</template>
</b-form-group>
`;