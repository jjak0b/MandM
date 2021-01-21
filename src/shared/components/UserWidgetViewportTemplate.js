export const template =
`
<component
	:key="value.id"
	:is="value.name"
	v-model="value.value"
	v-bind:tabindex="tabindex"
	v-bind="Object.assign( {}, value.attrs, value.props )"
	v-bind:id="value.props.id || $attrs.id || value.id"
	:name="value.name"
	:locale="locale"
	:localeLabel="value.i18nCategory"
></component>
`;