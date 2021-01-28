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
			>{{ $t('UserWidgets.Timepicker.label-settings') }}</template>
			<b-form-row>
				<b-col>
					<i18n-input-widget
						id="timepicker-editor-placeholder"
						tag="input"
						v-bind:label="$t('shared.label-placeholder')"
						v-bind:locale="locale"
						v-bind:locale-label="component.i18nCategory">
					</i18n-input-widget>
				</b-col>
				<b-col>
					<b-form-row>
						<b-col>
							<b-form-checkbox
						v-model="component.props.data.showSeconds"
						switch inline
					>{{ $t('UserWidgets.Timepicker.label-show-seconds') }}</b-form-checkbox>
						</b-col>
					</b-form-row>
					<b-form-row>
						<b-col>
							<b-form-checkbox
						v-model="component.props.data.nowButton"
						switch inline
					>{{ $t('UserWidgets.Timepicker.label-now-button') }}</b-form-checkbox>
						</b-col>
					</b-form-row>
					<b-form-row>
						<b-col>
							<b-form-checkbox
						v-model="component.props.data.resetButton"
						switch inline
					>{{ $t('UserWidgets.Timepicker.label-reset-button') }}</b-form-checkbox>
						</b-col>
					</b-form-row>
				</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
<section>
	<h4 v-t="'shared.label-preview'"></h4>
	<user-widget-timepicker
		v-bind:locale="locale"
		v-bind:localeLabel="component.i18nCategory"
		v-bind:data="component.props.data"
		v-bind:value="component.value"
	></user-widget-timepicker>
</section>
</div>
`