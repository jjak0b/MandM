export const template =
`
<component
	:is="value.name"
	:value="value.value"
	:class="value.class"
	:id="value.id"
	v-bind="value.props"
	:locale="locale"
	:localeLabel="value.i18nCategory"
	v-on:input="$emit('input', $event )"
></component>
`;