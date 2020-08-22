export const template =
`<div
	role="gridcell"
	v-bind:class="classes"
	v-bind:tabindex="isSelected ? 0 : -1"
	v-on:click="onFocus"
>
	<div ref="styleEl">
		<component
			v-if="value.component && value.component.options"
			:is="value.component.options"
			v-model="value.component.value"
			v-bind:tabindex="isSelected ? 0 : -1"
		></component>
		<span v-else>&nbsp;</span>
	</div>
</div>`;