export const template =
`<div
	role="gridcell"
	v-bind:class="classes"
	v-bind:tabindex="selected ? 0 : -1"
	v-on:click="$emit('setCol')"
>
<!-- Here there should be a '<component :is="value.component"></component>' vue tag -->
<button class="btn bt-primary" v-bind:tabindex="selected ? 0 : -1">&nbsp;</button>
</div>`;