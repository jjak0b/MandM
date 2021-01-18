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
	v-on="$listeners"
	style="display: none;"
	v-bind:type="currentType"
	v-bind:copiedActivity="copiedActivity"
	v-bind:grabbedActivity="grabbedActivity"
	v-bind:active="computedActive"
></toolbar>
</div>
`;