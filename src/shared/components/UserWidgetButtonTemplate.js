export const template =
`
<b-button
	v-bind="$attrs"
	v-bind:tabindex="tabindex"
	v-bind:class="classes"
	v-bind:type="type"
	v-bind:size="size"
	v-bind:variant="variant"
	v-bind:pill="shape === 'pill'"
	v-bind:squared="shape === 'squared'"
	v-bind:disabled="disabled"
	v-on:click="emitInput"
>
{{ getContent() }}
</b-button>
`