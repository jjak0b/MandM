export const template =
		`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.label-checkbox-settings') }}</template>
				<i18n-input-widget
					tag="input"
					v-bind:label="$t('shared.label-add-element')"
					v-bind:locale="locale"
					v-bind:locale-label="localeLabel">
				</i18n-input-widget>
				<b-button 
				class="m-3 float-right"
				v-on:click="addElement()">
				{{ $t('shared.label-add') }}</b-button>
				</b-form-group>
			<b-form-row>
					<b-col>
						<b-form-group
							label-for="user-widget-checkbox-editor-preview"
							v-bind:label="$t('shared.label-preview')"
						>
							<user-widget-checkbox
								v-bind="props"
								v-bind:locale="locale"
								v-bind:localesList="localesList"
								v-bind:assetId="assetId"
							></user-widget-checkbox>
						</b-form-group>
					</b-col>
					<b-col>	
						<list-widget
							v-bind:locale="locale"
							v-bind:localesList="localesList"
							v-bind:items="props.options"
							v-on:move-up="$emit('move-up', $event)"
							v-on:move-down="$emit('move-down', $event)"
							v-on:copy="$emit('copy', $event)"
							v-on:paste="$emit('paste', $event)"
							v-on:delete="$emit('delete', $event)"
						></list-widget>
					</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
</div>
`