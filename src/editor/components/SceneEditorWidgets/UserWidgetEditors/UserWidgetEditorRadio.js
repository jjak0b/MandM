import {template} from "./UserWidgetEditorRadioTemplate.js";
import {component as radioComponent} from "../../../../shared/components/UserWidgetRadio.js";
import {component as inputVal} from "../../InputValueWidget.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import {component as listWidget} from "../../../../shared/components/AccessibleListWidget.js";
import {I18nUtils} from "../../../../shared/js/I18nUtils.js";

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String,
		localesList: Array,
		i18nCategory: String
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		"user-widget-radio": radioComponent,
		'input-val':inputVal,
		'list-widget': listWidget
	},
	computed: {
		localeLabel: function () { return this.i18nCategory + '.radio.' + this.id + '.element.' + this.elementId }
	},
	data() {
		return {
			id: I18nUtils.getUniqueID(),
			elementId: I18nUtils.getUniqueID()
		}
	},
	methods: {
		onAdd() {
			this.elementId = I18nUtils.getUniqueID();
			this.$bvModal.show('addRadioModal');
		},
		addElement() {
			this.$emit('addElement', this.localeLabel, this.assetId);
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