export const template =
`
<b-form-group
	role="region"
	v-bind="$attrs"
	v-bind:aria-label="$t('i18n.label')"
	v-bind:description="$attrs.description || '&nbsp;'"
	class="i18n-editable-group bg-info text-white px-2 rounded"
>
	<!--
		if not set, we force set "description" attribute as "&nbsp" (Empty),
		otherwise b-form-group won't add the aria-describedby attribute linked to "description" slot
	-->
	<slot
		v-bind:locale="locale"
		v-bind:id="$attrs['label-for']"
	>
	</slot>
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