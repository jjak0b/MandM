export const template =
		`
<div>
	<b-form-input style="border: none; "
		v-on:input="setContent"
		v-bind:value="getContent()">
	</b-form-input>
</div>
`