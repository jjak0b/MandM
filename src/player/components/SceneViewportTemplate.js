export const template =
`
<b-container
>
	<b-row
		v-for="(row, i) in value.grid"
	>
		<b-col
			v-for="(cell, j) in row"
			:sm="cell.colSize"
		>
			<user-widget-viewport
				v-bind:locale="$root.locale"
				v-bind:value="cell.component"
			>
			</user-widget-viewport>
		</b-col>
	</b-row>
</b-container>
`