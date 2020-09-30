export const template =
		`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.label-spinbutton-settings') }}</template>
			<b-form-row>
				<b-col>
					<b-form-checkbox
						id="user-widget-spinbutton-editor-wrap"
						v-model="props.wrap"
						switch inline
					>{{ $t('shared.label-wrap') }}</b-form-checkbox>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-spinbutton-editor-step"
						v-bind:label="$t('shared.label-step')"
					>
					<b-form-input
						type="number"
						id="user-widget-spinbutton-editor-step"
						step="0.5"
						v-model="props.step"
					></b-form-input>
					</b-form-group>
				</b-col>
			</b-form-row>
			<b-form-row>
				<b-col>
					<b-form-group
						label-for="user-widget-spinbutton-editor-min"
						v-bind:label="$t('shared.label-min')"
					>
					<b-form-input
						type="number"
						id="user-widget-spinbutton-editor-min"
						v-model="props.min"
					></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-spinbutton-editor-max"
						v-bind:label="$t('shared.label-max')"
					>
					<b-form-input
						type="number"
						id="user-widget-spinbutton-editor-max"
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
	<user-widget-spinbutton
		v-bind="props"
	></user-widget-spinbutton>
</section>
</div>
`