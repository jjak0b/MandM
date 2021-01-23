export const template =
`
<input-tags
	:label="$t( 'AttributeEditorWidget.label-classes' )"
	:labelTags="$t('AttributeEditorWidget.label-current-classes')" 
	:labelSelect="$t( 'AttributeEditorWidget.label-classes' )"
	:description="$t( 'AttributeEditorWidget.label-add-custom-classes-or-pick-some-from-provided-framework' )"
	:fieldset-label="$t('StyleEditorWidget.bootstrap.label-bootstrap-classes')"
	:fieldset-description="$t('StyleEditorWidget.bootstrap.label-search-and-add-bootstrap-classes')"
	:search-label="$t('StyleEditorWidget.bootstrap.label-search-into-available-classes')"
	:search-description-no-items="$t('shared.label-no-match-found')"
	:options="options"
	:firstSelectOptionLabel="$t('shared.label-select-option')"
	:form-tag-props="{
		value: value,
		placeholder: $t('AttributeEditorWidget.label-placeholder-insert-class'),
		size: 'lg',
		tagPills: true,
		tagVariant: 'secondary',
		separator: ' ,;',
		tagValidator: isClassValid,
		removeOnDelete: true,
		duplicateTagText: $t('AttributeEditorWidget.label-duplicate-classes'),
		addButtonText: $t('shared.label-add'),
		addButtonVariant: 'success'
	}"
	v-on="$listeners"
>
	<template #options-description>
		<a
			href="https://getbootstrap.com/docs/4.5/"
			target="_blank"
			rel="help"
			class="text-wrap"
		>{{ $t( "StyleEditorWidget.bootstrap.label-visit-documentation-for-class-info") }}</a>
	</template>
</input-tags>
`;