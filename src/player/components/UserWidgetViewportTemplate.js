export const template =
`
<component
	:key="value.id"
	:is="value.name"
	:value="value.value"
	v-bind="value.props"
	:locale="locale"
	:localeLabel="value.i18nCategory"
	v-on:input="$emit('input', $event )"
></component>
`;