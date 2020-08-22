export const template =
`
<div
	role="row"
	class="row no-gutters">
	<column
		v-for="(column, index) in value"
		v-bind:value="column"
		v-bind:target="target"
		v-bind:coords="[rowIndex, index]"
		v-bind:showCSSGrid="showCSSGrid"
		v-on:setCursor="$emit('setCursor', $event)"
		v-on:currentCellData="$emit($event)"
	></column>
</div>
`;