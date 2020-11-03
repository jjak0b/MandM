export const template =
`
<div>
<div
	id="treeView"
	ref="treeView"
	v-on:focus="redraw()"
	v-on:blur="redraw()"
	v-on:contextmenu="contextMenuHandler($event)"
></div>
<toolbar 
	style="display: none;"
	v-bind:type="currentType"
></toolbar>
</div>
`;