export const template =
`<div
	role="gridcell"
	v-bind:class="classes"
	v-bind:tabindex="isSelected ? 0 : -1"
	v-on:click="onFocus"
>
<!-- Here there should be a '<component :is="value.component"></component>' vue tag -->
<button class="btn bt-primary" v-bind:tabindex="isSelected ? 0 : -1">&nbsp;</button>
</div>`;