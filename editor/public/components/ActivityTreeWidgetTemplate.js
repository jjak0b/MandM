export const template =
`
<div
	id="treeView"
	ref="treeView"
	v-on:focus="redraw()"
	v-on:blur="redraw()"
></div>
`;