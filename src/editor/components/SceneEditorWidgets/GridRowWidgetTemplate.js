export const template =
`
<div
	role="row"
	class="row no-gutters">
	<column
		v-for="(column, index) in value"
		v-bind:locale="locale"
		v-bind:value="column"
		v-bind:target="target"
		v-bind:coords="[rowIndex, index]"
		v-bind:showCSSGrid="showCSSGrid"
		v-bind:locales-list="localesList"
		v-on:setCursor="$emit('setCursor', $event)"
		v-bind:i18nCategory="i18nCategory"
	></column>
</div>
`;