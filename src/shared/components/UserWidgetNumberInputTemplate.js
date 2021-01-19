export const template =
		`
<b-form-input
	type="number"
	v-bind="$attrs"
	v-on:change="emitInput">
</b-form-input>
`