export const template =
`
<span>
<output
	v-if="extremes"
	aria-label="min"
>{{ min ? min : '0' }}</output>
<b-form-input
	v-bind="$attrs"
	v-bind:class="classes"
	v-bind:placeholder="getContent()"
	v-bind:value="value ? value.toString() : null"
	v-on:input="emitInput"
	v-bind:type="type"
	v-bind:min="min"
	v-bind:max="max"
	v-bind:step="step"
></b-form-input>
<output
	v-if="extremes"
	aria-label="max"
>{{ max ? max : '100' }}</output>
</span>
`