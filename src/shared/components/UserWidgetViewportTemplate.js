export const template =
`
<component
	:key="value.id"
	:is="value.name"
	v-bind:value="value.value"
	v-bind:tabindex="tabindex"
	v-bind="value.props"
	v-bind:id="value.props.id || $attrs.id || value.id"
	:name="value.name"
	:locale="locale"
	:localeLabel="value.i18nCategory"
	v-on="$listeners"
></component>
`;