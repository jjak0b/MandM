export const template =
		`
<b-form-spinbutton
	v-bind="data"
	v-bind:class="classes"
	v-on:change="emitInput">
</b-form-spinbutton>
`