export const template =
		`
<div>
<section>
	<b-form
		autocomplete="off"
		@submit.prevent.stop
	>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.label-' + inputData.type + '-input-settings') }}</template>
			<b-form-row>
				<b-col v-if="inputData.type === 'text' || inputData.type === 'number'">
					<b-form-group
						label-for="user-widget-number-input-editor-placeholder"
						v-bind:label="$t('shared.label-placeholder')"
					>
					<i18n-input-widget
							id="text-input-placeholder"
							tag="input"
							v-bind:label="$t('shared.label-placeholder')"
							v-bind:locale="locale"
							v-bind:locale-label="component.i18nCategory">
					</i18n-input-widget>
					</b-form-group>
				</b-col>
			</b-form-row>
			<b-form-row  v-if="inputData.type === 'range' || inputData.type === 'number'">
				<b-col>
					<b-form-group
						label-for="user-widget-number-input-editor-min"
						v-bind:label="$t('shared.label-min')"
					>
					<b-form-input
						type="number"
						id="user-widget-number-input-editor-min"
						v-model="inputData.min"
					></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-number-input-editor-max"
						v-bind:label="$t('shared.label-max')"
					>
					<b-form-input
						type="number"
						id="user-widget-number-input-editor-max"
						v-model="inputData.max"
					></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-number-input-editor-step"
						v-bind:label="$t('shared.label-step')"
					>
					<b-form-input
						type="number"
						id="user-widget-number-input-editor-step"
						step="0.5"
						v-model="inputData.step"
					></b-form-input>
					<b-form-checkbox
						 v-if="inputData.type === 'range'"
						id="user-widget-range-editor-show-extremes"
						v-model="inputData.extremes"
						switch inline
					>{{ $t('UserWidgets.label-show-extremes') }}</b-form-checkbox>
					</b-form-group>
				</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
<section>
	<h4 v-t="'shared.label-preview'"></h4>
	<user-widget-input
		v-bind:localeLabel="component.i18nCategory"
		v-bind:locale="locale"
		v-bind="inputData"
	></user-widget-input>
</section>
</div>
`