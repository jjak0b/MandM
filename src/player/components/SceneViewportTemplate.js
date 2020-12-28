export const template =
`
<b-container

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
				v-on="$listeners"
			>
			</user-widget-viewport>
		</b-col>
	</b-row>
</b-container>
`