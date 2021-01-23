import {template} from "./AttributeClassEditorWidgetTemplate.js";
import {component as inputTags} from "../../../shared/components/InputTags.js";
import {getBootstrapClassOptions} from "../../js/bootstrapClasses.js";

export const component = {
	template,
	components: {
		inputTags
	},
	props: {
		value: Array,
		options: Array
	},
	data() {
		return {
			options: []
		}
	},
	created() {
		if( !this.options ) {
			this.options = getBootstrapClassOptions( this.$i18n );
		}
	},
	methods: {
		isClassValid( classname ) {
			if( !( "class" in this.value ) ) this.$set( this.value, "class", [] );

			return !this.value.class.includes( classname );
		}
	}
}