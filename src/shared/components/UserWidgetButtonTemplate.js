export const template =
		`
<span>
	<b-button
		v-on:click="emitInput"
		v-bind:class="classes"
		v-bind:type="type"
		v-bind:size="size"
		v-bind:variant="variant"
		v-bind:pill="shape === 'pill'"
		v-bind:squared="shape === 'squared'"
		v-bind:disabled="disabled"
	>
	{{ getContent() }}
	</b-button>
</span>
`