export const template =
`
<b-container
	v-on="$listeners"
>
	<b-row
		v-for="(row, i) in value.grid"
		:key="'row_' + i"
	>
		<b-col
			v-for="(cell, j) in row"
			:key="'cell_' + cell.component.id"
			:sm="cell.colSize"
		>
			<user-widget-viewport
				v-bind:locale="$root.locale"
				v-bind:value="cell.component"
				v-on:input="$emit('input', $event )"
			>
			</user-widget-viewport>
		</b-col>
	</b-row>
</b-container>
`