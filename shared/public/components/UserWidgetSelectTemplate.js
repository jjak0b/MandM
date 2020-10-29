export const template =
`
<b-form-select>
	<b-form-select-option v-for="option in options" v-bind:value="option">{{ getContent(option) }}</b-form-select-option>
</b-form-select>
`