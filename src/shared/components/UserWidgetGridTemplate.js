export const template =
`
<grid-widget
	v-bind="$attrs"
	v-bind:class="classes"
	v-bind:tabindex="tabindex"
	
	v-bind:grid-data="gridData"
	v-bind:grid-tag="gridTag"
	v-bind:grid-role="gridRole"
	v-bind:grid-class="gridClass"
	v-bind:row-tag="rowTag"
	v-bind:row-role="rowRole"
	v-bind:row-class="rowClass"
	v-bind:cell-tag="cellTag"
	v-bind:cell-role="cellRole"
	v-bind:cell-class="cellClass"
	v-bind:cursor-cell-class="cursorCellClass"
	v-bind:selected-cell-class="selectedCellClass"
	
	v-bind:selectable="selectable"
	v-bind:preventFocus="preventFocus"
	v-bind:useIndexes="useIndexes"
	v-bind:navKey="navKey"
	
	v-bind:value="value ? value.value : null"
>
	<template
		#cell-content="{rowIndex, cellIndex, cellData, isFocused, isSelected}"
	>
		<user-widget-viewport
			v-if="cellData.component"
			v-bind:key="cellData.component.id"
			v-bind:id="'grid-widget-' + rowIndex + '-' + cellIndex + '-' + cellData.component.id"
			v-bind:tabindex="getTabindex( isFocused )"
			v-bind:value="cellData.component"
			v-bind:locale="locale"
			v-on:change="$emit('change')"
		></user-widget-viewport>
	</template>
</grid-widget>
`;