export const template =
`
<b-form-datepicker
	v-bind="Object.assign({}, $attrs, localeLabels)"
	v-bind:locale="$i18n.locale"
	v-on="$listeners"
	v-bind:value="value || null"
	v-on:input="$emit('input', $event )"
	
	menu-class="w-100"
	calendar-width="100%"
>
</b-form-datepicker>
`