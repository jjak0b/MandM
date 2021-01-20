export const template =
`
<b-form-input
	v-bind:placeholder="getContent()"
	v-on:change="emitInput">
</b-form-input>
`