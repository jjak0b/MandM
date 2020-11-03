export const template =
		`
<b-form-checkbox-group>
	<b-form-checkbox v-for="option in options" v-bind:value="option">{{ getContent(option) }}</b-form-checkbox>
</b-form-checkbox-group>
`