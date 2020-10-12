export const template =
`
<i18n-region
	v-bind:locale="locale"
	v-bind:label="$attrs.label"
	v-bind:label-for="$attrs.id"
	v-bind:invalid-feedback="$attrs['invalid-feedback']"
	v-bind:valid-feedback="$attrs['valid-feedback']"
	v-bind:state="$attrs.state"
	v-bind:description="$attrs.description || null"
>
	<component
		v-bind="$attrs"
		v-bind:id="$attrs.id"
		v-bind:is="componentName"
		v-on="$listeners"
		v-on:input="notifyValue( 'input', $event )"
		v-bind:disabled="isDisabled"
		v-bind:value="getContent()"
	></component>
</i18n-region>
`;