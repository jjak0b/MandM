export const template =
`
<component
	:key="value.id"
	:is="value.name"
	:value="value.value"
	v-bind:tabindex="tabindex"
	v-bind="value.props"
	:name="value.name"
	:locale="locale"
	:localeLabel="value.i18nCategory"
	v-on="$listeners"
></component>
`;