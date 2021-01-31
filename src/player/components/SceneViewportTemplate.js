export const template =
`
<user-widget-viewport
	v-bind:id="value.body.id"
	v-bind:locale="$root.locale"
	v-bind:value="value.body"
	v-on="$listeners"
>
</user-widget-viewport>
`