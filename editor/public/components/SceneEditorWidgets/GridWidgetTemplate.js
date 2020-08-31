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
		v-bind:target="cursor"
		v-bind:rowIndex="index"
		v-bind:showCSSGrid="showCSSGrid"
		v-on:setCursor="onSetCursor"
		v-on:currentCellData="$emit('input', $event.target.value )"
	></row>
</div>
`;