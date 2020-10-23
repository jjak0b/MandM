import {template} from "./UserWidgetEditorCheckboxTemplate.js";
import {component as checkboxComponent} from "/shared/components/UserWidgetCheckbox.js";
import {component as inputVal} from "../../InputValueWidget.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import {component as listWidget} from "/shared/components/AccessibleListWidget.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String,
		localesList: Array,
		nextAssetId: Number
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-checkbox": checkboxComponent,
		'input-val':inputVal,
		'list-widget': listWidget
	},
	computed: {
		localeLabel: function () { return 'assets.checkbox.' + this.assetId + '.' + this.nextValue }
	},
	data() {
		return {
			assetId: this.nextAssetId,
			newElement: "",
			nextValue: 0
		}
	},
	methods: {
		addElement() {
			this.$emit('addElement', this.localeLabel, this.assetId);
			this.nextValue++;
		},
		removeElement(index) {
			this.$emit('removeElement', index);
		},
		getContent(localeLabel) {
			if (this.locale) {
				if (!this.$i18n.te(localeLabel, this.locale)) {
					if (this.$i18n.te(localeLabel, 'en-US')) {
						return this.$i18n.t(localeLabel, 'en-US');
					} else {
						for (const locale of this.localesList) {
							if (this.$i18n.te(localeLabel, locale)) {
								return this.$i18n.t(localeLabel, locale);
							}
						}
					}
				}
				if (this.$i18n.te(localeLabel, this.locale))
					return this.$i18n.t(localeLabel, this.locale);
			}
			return ""
		}
	}
}