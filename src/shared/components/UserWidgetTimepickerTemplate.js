export const template =
		`
<b-form-timepicker
	v-bind="data"
	v-bind:class="classes"
	v-bind:locale="$i18n.locale"
	v-bind:placeholder="getContent()"
	v-on:input="editValue"
	v-on:hidden="emitInput"
	menu-class="w-100"
	calendar-width="100%"
>
</b-form-timepicker>
`