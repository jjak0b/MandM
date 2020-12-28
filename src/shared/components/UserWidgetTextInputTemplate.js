export const template =
		`
<b-form-input
	v-bind:placeholder="getContent()"
	v-on:input="emitInput">
</b-form-input>
`