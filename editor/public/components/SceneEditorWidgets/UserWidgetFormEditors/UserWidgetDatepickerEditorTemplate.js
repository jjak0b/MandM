export const template =
`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.Datepicker.label-settings') }}</template>
			<b-form-row>
				<b-col>
					<b-form-checkbox
						v-model="props.readonly"
						switch inline
					>{{ $t('UserWidgets.Datepicker.label-readonly') }}</b-form-checkbox>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-datepicker-editor-start-weekday"
						v-bind:label="$t('UserWidgets.Datepicker.label-start-weekday')"
					>
						<b-form-select
							id="user-widget-datepicker-editor-start-weekday"
							v-model="props.startWeekday"
							v-bind:options="startWeekdays"
						></b-form-select>
					</b-form-group>
				</b-col>
			</b-form-row>
		</b-form-group>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.Datepicker.label-constraints') }}</template>
			<template v-slot:description
			>{{ $t('UserWidgets.Datepicker.description-constraints') }}</template>
			<b-form-row>
				<b-col>
					<b-form-group
						label-for="datepicker-date-min"
						v-bind:label="$t('UserWidgets.Datepicker.label-date-min')"
					>
						<b-form-datepicker
							id="datepicker-date-min"
							v-model="props.min"
							v-bind:max="props.max"
							v-bind:locale="$i18n.locale"
							v-bind:start-weekday="value.startWeekday"
							reset-button="true"
						></b-form-datepicker>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="datepicker-date-max"
						v-bind:label="$t('UserWidgets.Datepicker.label-date-max')"
					>
						<b-form-datepicker
							id="datepicker-date-max"
							v-model="props.max"
							v-bind:min="props.min"
							v-bind:locale="$i18n.locale"
							v-bind:start-weekday="value.startWeekday"
							reset-button="true"
						></b-form-datepicker>
					</b-form-group>
				</b-col>
			</b-form-row>
		</b-form-group>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.Datepicker.label-variants-theme') }}</template>
			<b-form-row>
				<b-col>
					<b-form-group
						label-for="user-widget-datepicker-editor-variant-selected"
						v-bind:label="$t('UserWidgets.Datepicker.label-variant-theme-selected')"
					>
						<b-form-select
							id="user-widget-datepicker-editor-variant-selected"
							v-model="props.selectedVariant"
							v-bind:options="colorVariants"
						>
							<template v-slot:first>
								<b-form-select-option
									selected="selected" 
									:value="null"
									v-t="'shared.label-none'"
								></b-form-select-option>
							</template>
						</b-form-select>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-datepicker-editor-variant-today"
						v-bind:label="$t('UserWidgets.Datepicker.label-variant-theme-today')"
					>
						<b-form-select
							id="user-widget-datepicker-editor-variant-today"
							v-model="props.todayVariant"
							v-bind:options="colorVariants"
						>
							<template v-slot:first>
								<b-form-select-option
									selected="selected" 
									:value="null"
									v-t="'shared.label-none'"
								></b-form-select-option>
							</template>
						</b-form-select>
					</b-form-group>
				</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
<section>
	<h4 v-t="'shared.label-preview'"></h4>
	<user-widget-datepicker
		v-bind:value="value"
		v-bind:locale="locale"
		v-bind="props"
	></user-widget-datepicker>
</section>
</div>
`