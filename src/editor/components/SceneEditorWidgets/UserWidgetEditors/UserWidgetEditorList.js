import {template} from "./UserWidgetEditorListTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";
import {component as listWidget} from "../../../../shared/components/AccessibleListWidget.js";
import {I18nUtils} from "../../../../shared/js/I18nUtils.js";
import {component as typedValueWidget} from "../../../../editor/components/InputTypedValueWidget.js";
import { component as listComponent } from "../../../../shared/components/UserWidgetList.js";
import {TypedValue} from "../../../../shared/js/Types/TypedValue.js";

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		component: Object
	},
	components: {
		'i18n-input-widget': asyncLoadComponentI18nInputWidget,
		'list-widget': listWidget,
		'typed-value': typedValueWidget,
		"user-widget-list": listComponent
	},
	data() {
		return {
			label: null,
			value: null,
			state: true
		}
	},
	methods: {
		resetAddForm() {
			this.label = this.component.i18nCategory + '.element.' + I18nUtils.getUniqueID();
			this.value = null;
		},
		onAdd() {
			this.resetAddForm();
			this.$bvModal.show('addElementModal');
		},
		addElement() {
			if (!this.$refs.form.checkValidity()) return;

			if (! ('options' in this.component.props)) {
				this.$set( this.component.props, 'options', [] );

			}

			let item = new TypedValue( this.value );
			this.component.props.options.push({title: this.label, value: item});
			this.$nextTick(() => {
				this.$bvModal.hide('addElementModal')
			})
		},
		removeElement(index) {
			this.component.props.options.splice( index, 1 );
		},
		moveUpListElement( index ) {
			if (index !== 0) {
				this.component.props.options.splice(
						index - 1,
						0,
						this.component.props.options.splice(index, 1)[0]
				)
			}
		},
		moveDownListElement( index ) {
			this.component.props.options.splice(
					index+1,
					0,
					this.component.props.options.splice(index, 1)[0]
			)
		},
		copyListElement( index ) {
			this.copiedItem = JSON.parse(JSON.stringify(this.component.props.options[index]))
		},
		pasteListElement( index ) {
			if ( this.copiedItem ) {
				let obj;
				let value;
				let labelArray = this.copiedItem.title.split('.');
				labelArray[labelArray.length - 1] = I18nUtils.getUniqueID();
				let label = labelArray.join('.');
				for (const locale of this.localesList) {
					value = this.$t(this.copiedItem.title, locale);
					obj = I18nUtils.buildObjectFromLabel(label, value);
					this.$i18n.mergeLocaleMessage(locale, obj);
				}
				if (index === this.component.props.options.length - 1) index++;
				this.component.props.options.splice(index, 0, {title: label})
			}
		}
	}
}