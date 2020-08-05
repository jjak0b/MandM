export const template =
`<input
	v-if="tag == 'input'"
	v-bind="$attrs"
	v-on="$listeners"
	v-on:input="notifyValue( 'input', $event.target.value )"
	v-bind:disabled="isDisabled"
	v-bind:value="isDisabled ? '' : $t( localeLabel )"
>
<textarea
	v-else-if="tag == 'textarea'"
	v-bind="$attrs"
	v-on="$listeners"
	v-on:input="notifyValue( 'input', $event.target.value )"
	v-bind:disabled="isDisabled"
	v-bind:value="isDisabled ? '' : $t( localeLabel )"
></textarea>
<label
	v-else-if="tag == 'label'"
	v-bind="$attrs"
	v-on="$listeners"
	v-html="isDisabled ? '' : $t( localeLabel )"
></label>
<select
	v-else-if="tag == 'select'"
	v-bind="$attrs"
	v-on="$listeners"
	v-bind:disabled="locale ? false : true"
	v-on:input="notifyValue( 'change', $event.target.value )"
>
	<option v-for="(label, key) in localeDataRef" v-bind:value="key">{{ label }}</option>
</select>
`;