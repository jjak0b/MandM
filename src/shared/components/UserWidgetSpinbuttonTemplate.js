export const template =
		`
<b-form-spinbutton
	v-bind="$attrs"
	v-bind:class="classes"
	v-on:change="emitInput">
</b-form-spinbutton>
`