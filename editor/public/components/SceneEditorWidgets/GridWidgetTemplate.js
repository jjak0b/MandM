export const template =
`
<div
	role="grid"
	v-on:keyup="KeyHandler"
	v-on:keydown="keyPreventHandler"
>
	<row
		v-for="(columns, index) in gridData"
		v-bind:value="columns"
		v-bind:selected="selectedIndex.row == index"
		v-bind:selectedCol="selectedIndex.col"
		v-bind:showCSSGrid="showCSSGrid"
		v-on:setRow="onSetRow( index )"
		v-on:setCol="onSetCol"
		v-on:currentCellData="$emit('input', $event.target.value )"
	></row>
</div>
`;