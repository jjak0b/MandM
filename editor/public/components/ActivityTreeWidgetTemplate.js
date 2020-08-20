export const template =
`
<div>
<div
	id="treeView"
	ref="treeView"
	v-on:focus="redraw()"
	v-on:blur="redraw()"
></div>
<toolbar style="display: none;"></toolbar>
</div>
`;