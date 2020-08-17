export const template =
`
<div class="row">
	<div class="col">
		<label
			v-bind:for="'inputRange_' + name"
		>{{ $t( labelRange ) }}</label>
		<input
			v-bind:id="'inputRange_' + name"
			type="range"
			v-bind:name="name"
			v-bind:min="min"
			v-bind:max="max"
			v-bind:step="step"
			v-model="value"
		/>
	</div>
	<div class="col">
		<label
			v-bind:for="'inputNumber_' + name"
		>{{ $t( labelNumber ) }}</label>
		<input
			v-bind:id="'inputNumber_' + name"
			type="number"
			v-bind:name="name"
			v-bind:min="min"
			v-bind:max="max"
			v-bind:step="step"
			v-model="value"
		/>
	</div>
</div>
`;