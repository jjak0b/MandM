export const template =
`<div
	role="gridcell"
	v-bind:class="value.colSize > 0 ? 'col-' + value.colSize : 'col' "
	v-bind:tabindex="selected ? 0 : -1"
	v-on:click="$emit('setCol')"
	v-bind:style="style"
>
<!-- Here there should be a '<component :is="value.component"></component>' vue tag -->
<button class="btn bt-primary" v-bind:tabindex="selected ? 0 : -1">&nbsp;</button>
</div>`;