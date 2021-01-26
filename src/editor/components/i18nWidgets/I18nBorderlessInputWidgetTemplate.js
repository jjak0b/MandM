export const template =
		`
	<b-form-input style="border: none; "
		v-bind:tabindex="tabindex"
		v-on:input="setContent"
		v-bind:value="getContent()">
	</b-form-input>
`