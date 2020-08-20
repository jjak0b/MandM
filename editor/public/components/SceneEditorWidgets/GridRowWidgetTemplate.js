export const template =
`
<div
	role="row"
	class="row">
	<column
		v-for="(column, index) in value"
		v-bind:value="column"
		v-bind:selected="selected && selectedCol == index"
		v-bind:showCSSGrid="showCSSGrid"
		v-on:setCol="setCurrentIndex( index )"
		v-on:currentCellData="$emit($event)"
	></column>
</div>
`;