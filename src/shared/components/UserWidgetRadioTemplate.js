export const template =
		`
<b-form-radio-group>
	<b-form-radio
		v-for="option in options"
		v-bind:value="option.title">
		{{ getContent(option.title) }}
	</b-form-radio>
</b-form-radio-group>
`