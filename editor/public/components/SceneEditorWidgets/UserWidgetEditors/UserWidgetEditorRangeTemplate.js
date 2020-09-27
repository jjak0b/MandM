export const template =
		`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.Range.label-settings') }}</template>
			<b-form-row>
				<b-col>
					<b-form-group
						label-for="user-widget-range-editor-step"
						v-bind:label="$t('UserWidgets.Range.label-step')"
					>
					<b-form-input
						type="number"
						id="user-widget-range-editor-step"
						step="0.5"
						v-model="props.step"
					></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-range-editor-min"
						v-bind:label="$t('UserWidgets.Range.label-min')"
					>
					<b-form-input
						type="number"
						id="user-widget-range-editor-min"
						v-model="props.min"
					></b-form-input>
					</b-form-group>
					<b-form-group
						label-for="user-widget-range-editor-max"
						v-bind:label="$t('UserWidgets.Range.label-max')"
					>
					<b-form-input
						type="number"
						id="user-widget-range-editor-max"
						v-model="props.max"
					></b-form-input>
					</b-form-group>
				</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
<section>
	<h4 v-t="'shared.label-preview'"></h4>
	<user-widget-range
		v-bind="props"
	></user-widget-range>
</section>
</div>
`