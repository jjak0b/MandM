export const template =
		`
<div>
<section>
	<h3 v-t="$t('UserWidgets.label-text-input-settings')"></h3>
	<i18n-input-widget
		tag="input"
		v-bind:label="$t('shared.label-placeholder')"
		v-bind:locale="locale"
		v-bind:locale-label="component.i18nCategory">
	</i18n-input-widget>
</section>
<section>
	<h3 v-t="'shared.label-preview'"></h3>
	<user-widget-text-input
		v-bind:localeLabel="component.i18nCategory"
		v-bind:locale="locale"
		v-bind:localesList="localesList"
	></user-widget-text-input>
</section>
</div>
`