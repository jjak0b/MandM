export const template =
`
<b-form-select>
	<b-form-select-option
		v-for="option in options"
		v-bind:value="option.title">
		{{ getContent(option.title) }}
	</b-form-select-option>
</b-form-select>
`