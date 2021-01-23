import {template} from "./AttributeClassEditorWidgetTemplate.js";
import {component as inputTags} from "../../../shared/components/InputTags.js";
import {getBootstrapClassOptions} from "../../js/bootstrapClasses.js";

export const component = {
	template,
	components: {
		inputTags
	},
	props: {
		label: String,
		value: Array
	},
	data() {
		return {
			options: []
		}
	},
	created() {
		this.options = getBootstrapClassOptions( this.$i18n );
	},
	methods: {
		isClassValid( classname ) {
			return !this.value.includes( classname );
		}
	}
}