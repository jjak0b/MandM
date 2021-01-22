export const template =
		`
<div>
<template v-if="extremes">
		<span>{{ min ? min : '0' }}</span>
		<span class="float-right">{{ max ? max : '100' }}</span>
</template>
<b-form-input
	v-bind:placeholder="getContent()"
	v-on:change="emitInput($event, type)"
	v-bind:type="type"
	v-bind:min="min"
	v-bind:max="max"
	v-bind:step="step"
></b-form-input>
</div>
`