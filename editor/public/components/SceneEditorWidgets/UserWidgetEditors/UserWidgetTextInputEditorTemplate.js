export const template =
		`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.TextInput.label-settings') }}</template>
			<b-form-row>
				<b-col>
					<b-form-group
						label-for="user-widget-textInput-editor-placeholder"
						v-bind:label="$t('UserWidgets.TextInput.label-placeholder')"
					>
					<b-form-input
						id="user-widget-textInput-editor-placeholder"
						v-model="props.placeholder"
					></b-form-input>
					</b-form-group>
				</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
<section>
	<h4 v-t="'shared.label-preview'"></h4>
	<user-widget-textInput
		v-bind="props"
	></user-widget-textInput>
</section>
</div>
`