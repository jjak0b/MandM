export const template =
		`
<div>
	<template v-if="extremes">
		<span>{{ realMin }}</span>
		<span class="float-right">{{ realMax }}</span>
	</template>
	<b-form-input
		v-bind:min="min"
		v-bind:max="max"
		type="range"
		v-bind="$attrs"
		v-on:change="emitInput">
	</b-form-input>
</div>
`