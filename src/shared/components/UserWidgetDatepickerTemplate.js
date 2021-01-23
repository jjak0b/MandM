export const template =
`
<b-form-datepicker
	v-bind="Object.assign({}, $attrs, localeLabels)"
	v-bind:class="classes"
	v-bind:locale="$i18n.locale"
	v-bind:value="value || null"
	v-on:change="emitInput"
	
	menu-class="w-100"
	calendar-width="100%"
>
</b-form-datepicker>
`