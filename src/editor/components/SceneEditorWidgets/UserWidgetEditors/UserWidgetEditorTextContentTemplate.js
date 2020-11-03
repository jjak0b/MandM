export const template =
		`
<div>
<section mb-3>
<text-editor
	v-bind:locale="locale"
	v-bind:locale-label="localeLabel"
	v-bind:locales-list="localesList"
	></text-editor>
</section>
<section>
	<h3 v-t="'shared.label-preview'"></h3>
	<text-content
			v-bind:locale-label="localeLabel"
			v-bind:locale="locale"
			v-bind:locales-list="localesList"
		></text-content>
</section>
</div>
`