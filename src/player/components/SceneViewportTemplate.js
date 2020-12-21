export const template =
`
<section class="container">
<div
	class="row"
	v-for="(row, i) in value.grid"
>
	<div
		class="col"
		v-for="(cell, j) in row"
	>
		<user-widget-viewport
			v-bind:locale="$root.locale"
			v-bind:value="cell.component"
		>
		</user-widget-viewport>
	</div>
</div>
</section>
`