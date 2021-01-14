export const template =
`
<grid-widget
	id="scene-editor-grid"
	ref="grid"
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
	
	v-bind:maxRows="$attrs.maxRows"
	v-bind:maxColumns="$attrs.maxColumns"
	v-bind:selectable="$attrs.selectable"
	v-bind:preventFocus="$attrs.gridPreventFocus"
	v-bind:selectable="selectable"
	
	v-bind:value="value"
	v-on:input="$emit('input', $event )"
>
	<slot>
		<template
			#cell-content="{rowIndex, cellIndex, cellData, isFocused, isSelected}"
		>
			<user-widget-viewport
				v-if="cellData.component"
				v-bind:id="cellData.component.id"
				v-bind:tabindex="isFocused ? 0 : -1"
				v-bind:value="cellData.component"
				v-bind:locale="locale"
			></user-widget-viewport>
		</template>
	</slot>
</grid-widget>
`;