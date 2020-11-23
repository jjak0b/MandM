
import {template} from "../BranchEditor/BranchEditorParameterWidgetTemplate.js";
import {ConditionParameter} from "../../../../shared/js/Branch/ConditionParameter.js";
import {component as typedValueComponent} from "../../InputValueWidget.js";

export const component = {
	template: template,
	components: {
		"typed-value": typedValueComponent
	},
	props: {
		function: String,
		value: ConditionParameter,
		sourceTypeOptions: Array,
		valueAcceptTypes: Array,
		variableOptions: Array
	},
	data() {
		return {

		}
	}
}