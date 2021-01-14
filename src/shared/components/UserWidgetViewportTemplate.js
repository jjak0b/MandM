export const template =
`
<component
	:key="value.id"
	:is="value.name"
	v-model="value.value"
	v-bind="Object.assign( {}, value.props, $attrs )"
	:name="value.name"
	:locale="locale"
	:localeLabel="value.i18nCategory"
	v-on="$listeners"
></component>
`;