export const template =
`
<b-form-datepicker
	v-bind="Object.assign({}, data, localeLabels)"
	v-bind:class="classes"
	v-bind:locale="$i18n.locale"
	v-on:input="editValue"
	v-on:hidden="emitInput"
	
	menu-class="w-100"
	calendar-width="100%"
>
</b-form-datepicker>
`