export const template =
`
<component
	:key="value.id"
	:is="value.name"
	v-model="value.value"
	v-bind:tabindex="tabindex"
	v-bind="Object.assign( {}, value.attrs, value.props, { class: [] } )"
	v-bind:id="value.props.id || $attrs.id || value.id"
	v-bind:classes="value.props.class"
	:locale="locale"
	:localeLabel="value.i18nCategory"
	v-on:change="$emit('change')"
></component>
`;