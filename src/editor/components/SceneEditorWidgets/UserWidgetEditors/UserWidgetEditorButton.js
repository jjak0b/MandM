import {template} from "./UserWidgetEditorButtonTemplate.js";
import {component as buttonComponent} from "../../../../shared/components/UserWidgetButton.js";
import ComponentButton from "../../../../shared/js/Scene/SceneComponents/ComponentButton.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import {component as typedValueWidget} from "../../../../editor/components/InputTypedValueWidget.js";

export const component = {
	template: template,
	props: {
		component: ComponentButton,
		locale: String
	},
	data() {
		return {
			variantOptions: [
				{ value: 'primary', text: this.$t('shared.label-primary') },
				{ value: 'secondary', text: this.$t('shared.label-secondary') },
				{ value: 'success', text: this.$t('shared.label-success') },
				{ value: 'danger', text: this.$t('shared.label-danger') },
				{ value: 'warning', text: this.$t('shared.label-warning') },
				{ value: 'info', text: this.$t('shared.label-info') },
				{ value: 'light', text: this.$t('shared.label-light') },
				{ value: 'dark', text: this.$t('shared.label-dark') },
				{ value: 'outline-primary', text: this.$t('shared.label-outline-primary') },
				{ value: 'outline-secondary', text: this.$t('shared.label-outline-secondary') },
				{ value: 'outline-success', text: this.$t('shared.label-outline-success') },
				{ value: 'outline-danger', text: this.$t('shared.label-outline-danger') },
				{ value: 'outline-warning', text: this.$t('shared.label-outline-warning') },
				{ value: 'outline-info', text: this.$t('shared.label-outline-info') },
				{ value: 'outline-light', text: this.$t('shared.label-outline-light') },
				{ value: 'outline-dark', text: this.$t('shared.label-outline-dark') }
			],
			typeOptions: [
				{ value: 'button', text: this.$t('shared.label-button') },
				{ value: 'submit', text: this.$t('shared.label-submit') },
				{ value: 'reset', text: this.$t('shared.label-reset') },
			],
			sizeOptions: [
				{ value: null, text: this.$t('shared.label-default') },
				{ value: 'sm', text: this.$t('shared.label-small') },
				{ value: 'lg', text: this.$t('shared.label-large') },
			],
			shapeOptions: [
				{ value: null, text: this.$t('shared.label-default') },
				{ value: 'pill', text: this.$t('shared.label-pill') },
				{ value: 'squared', text: this.$t('shared.label-squared') },
			]
		}
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-button": buttonComponent,
		"typed-value": typedValueWidget
	}
}