export const template =
		`
<b-form-radio-group>
	<b-form-radio v-for="option in options" v-bind:value="option">{{ getContent(option) }}</b-form-radio>
</b-form-radio-group>
`