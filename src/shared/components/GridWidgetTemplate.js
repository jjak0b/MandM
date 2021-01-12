export const template =
`
<!-- https://www.w3.org/TR/wai-aria-practices/#gridNav -->
<component
	v-bind:is="gridTag"
	v-bind:role="gridRole"
	v-bind:class="gridClass"
	v-on:keyup="KeyHandler"
	v-on:keydown="keyPreventHandler"
	v-bind:aria-rowcount="gridData.length"
>
	<component
		v-for="(rowCells, rowIndex) in gridData"
		v-bind:key="$attrs.id + '-' + rowIndex"
		v-bind:is="rowTag"
		v-bind:role="rowRole"
		v-bind:aria-rowindex="rowIndex+1"
		v-bind:class="rowClass"
	>
		<component
			v-for="(cellData, cellIndex) in rowCells"
			v-bind:ref="'cell-' + rowIndex + '-' + cellIndex" 
			v-bind:key="$attrs.id + '-' + rowIndex + '-' + cellIndex"
			v-bind:is="cellTag"
			v-bind:role="cellRole"
			v-bind:aria-colindex="cellIndex+1"
			v-bind:class="cellClass"
			v-bind:tabindex="isCellFocused( rowIndex, cellIndex ) ? 0 : -1"
			v-on:click="handleOnCellSelect( $event, [ rowIndex, cellIndex ] )"
			v-on:keyup.enter="handleOnCellSelect( $event, [ rowIndex, cellIndex ] )"
			v-bind:aria-selected="isCellSelected( rowIndex, cellIndex )"
		>
			<slot
				name="cell-content"
				v-bind="{rowIndex, cellIndex, cellData, isFocused: isCellFocused( rowIndex, cellIndex ), isSelected: isCellSelected( rowIndex, cellIndex ) }"
			>&nbsp;</slot>
		</component>
	</component>
</component>
`;