export const template =
		`
<div
	v-html="getContent()"
	v-bind:class="classes"
></div>
`