export const template =
		`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.label-button-settings') }}</template>
			<b-form-row>
				<b-col>
					<i18n-input-widget
							id="editor-button-text"
							tag="input"
							v-bind:label="$t('shared.label-button-text')"
							v-bind:locale="locale"
							v-bind:locale-label="component.i18nCategory">
					</i18n-input-widget>
				</b-col>
				<b-col>
						<b-form-group
							label-for="editor-button-value"
							v-bind:label="$t('shared.label-button-value')"
						>
						<typed-value
							id="editor-button-value"
							v-model="component.props.valueOnClick"
						></typed-value>
					</b-form-group>
				</b-col>
			</b-form-row>
			<b-form-row>
				<b-col>
					<b-form-group
						label-for="editor-button-variant"
						v-bind:label="$t('shared.label-button-variant')"
					>
						<b-form-select
							v-model="component.props.variant"
							v-bind:options="variantOptions"
						></b-form-select>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-checkbox
						id="editor-button-disabled"
						v-model="component.props.disabled"
						name="editor-button-disabled"
					> {{ $t('shared.label-button-disabled') }}
					</b-form-checkbox>				
				</b-col>
			</b-form-row>
			<b-form-row>			
				<b-col>
					<b-form-group
						label-for="editor-button-size"
						v-bind:label="$t('shared.label-button-size')"
					>
						<b-form-radio-group
							id="editor-button-size"
							v-model="component.props.size"
							v-bind:options="sizeOptions"
							name="editor-button-size"
							stacked
						>
						</b-form-radio-group>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="editor-button-shape"
						v-bind:label="$t('shared.label-button-shape')"
					>
						<b-form-radio-group
							id="editor-button-shape"
							v-model="component.props.shape"
							v-bind:options="shapeOptions"
							name="editor-button-shape"
							stacked
						>
						</b-form-radio-group>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="editor-button-type"
						v-bind:label="$t('shared.label-button-type')"
					>
						<b-form-radio-group
							id="editor-button-type"
							v-model="component.props.type"
							v-bind:options="typeOptions"
							name="editor-button-type"
							stacked
						>
					</b-form-radio-group>
					</b-form-group>	
				</b-col>			
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
<section>
	<h4 v-t="'shared.label-preview'"></h4>
		<form
			v-on:submit.prevent.stop
			v-on:reset.prevent.stop
			autocomplete="off"
		>
		<user-widget-button
			v-bind="component.props"
			v-bind:value="component.value"
			v-bind:locale="locale"
			v-bind:localeLabel="component.i18nCategory"
		></user-widget-button>
		</form>
</section>
</div>
`