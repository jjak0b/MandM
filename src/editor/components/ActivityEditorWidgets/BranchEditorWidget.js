import {template} from "./BranchEditorWidgetTemplate.js";
import ActivityDataBranch from "../../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataBranch.js";
import {ConditionParameter} from "../../../shared/js/Branch/ConditionParameter.js";
import {component as conditionParameterComponent} from "./BranchEditor/BranchEditorParameterWidget.js";

export const component = {
    template: template,
    props: {
        branch: ActivityDataBranch,
        locale: String,
    },
    components: {
        'condition-parameter': conditionParameterComponent,
    },
    data() {
        let data = {
            form: {
                validity: false,
            },

            functionPrototypes: ActivityDataBranch._functions,
            envVariableNames: ActivityDataBranch._variables,
            functionLocaleLabels: {
                "equals": "ActivityEditorWidget.select-type-func.eq",
                "isAny": "ActivityEditorWidget.select-type-func.isInThere",
                "isInRange": "ActivityEditorWidget.select-type-func.isInRange",
            },
            parametersLocaleLabels: {
                "this":"ActivityEditorWidget.parameters.label-element-to-check",
                "that":"ActivityEditorWidget.parameters.label-that-element-to-compare",
                "elements":"ActivityEditorWidget.parameters.label-elements-to-check",
                "min":"ActivityEditorWidget.parameters.label-min-value",
                "max":"ActivityEditorWidget.parameters.label-max-value",
                "parameter": "ActivityEditorWidget.parameters.label-parameter",
            },
            variableLocaleLabels: {
                "userInput": "ActivityEditorWidget.select-type-var.label-user-input",
            },
            sourceTypeLocaleLabels: {
                value: "ActivityEditorWidget.label-value",
                variable: "ActivityEditorWidget.label-variable"
            },
            sourceTypeOptions: [
                // {
                //    text: "localized",
                //    value: "paramSourceType"
                // }
            ],
            functionOptions: [
                // {
                //    text: "localized",
                //    value: "functionKey"
                // }
            ],
            variableOptions: [
                // {
                //    text: "localized",
                //    value: "variableName"
                // }
            ]
        };

        console.log( "functions", data.functionPrototypes );
        // build options for the select
        for (const functionsKey in data.functionPrototypes) {
            console.log( "func", functionsKey );
            data.functionOptions.push({
                text: functionsKey in data.functionLocaleLabels ? this.$t(data.functionLocaleLabels[ functionsKey ]) : `unlocalized function ${functionsKey}`,
                value: functionsKey
            });
        }

        for (const sourceType in data.sourceTypeLocaleLabels) {
            data.sourceTypeOptions.push({
                text: sourceType in data.sourceTypeLocaleLabels ? this.$t(data.sourceTypeLocaleLabels[ sourceType ]) : `unlocalized source type ${sourceType}`,
                value: sourceType
            });
        }

        data.envVariableNames.forEach( (varName, index) => {
            data.variableOptions.push({
                text: varName in data.variableLocaleLabels ? this.$t(data.variableLocaleLabels[ varName ]) : `unlocalized variable ${varName}`,
                value: varName
            });
        });

        return data;
    },
    watch: {
        "branch.condition.function": function (value) {
            let params = new Array( this.functionPrototypes[ value ].arguments.length );
            for (let i = 0; i < params.length; i++) params[ i ] = new ConditionParameter();

            this.$set(
                this.branch.condition,
                "params",
                params
            );
            console.log("update function parameters",this.branch.condition, params );
        }
    },
    computed:{
        selfParameter() {
            return this.branch.condition.params[0];
        },
        parameters() {
            if( this.branch && this.branch.condition && this.branch.condition.params )
                return this.branch.condition.params;
            return [];
        }
    },
    methods: {
        getParameterI18n( name ) {
            if( !(name in this.parametersLocaleLabels) ) {
                name = "parameter";
            }
            return this.$t( this.parametersLocaleLabels[ name ] );
        },
        onSubmit(event) {
            let valid = false;
            if( this.branch.condition.function in this.functionPrototypes ) {
                let funcArguments = this.functionPrototypes[this.branch.condition].arguments;
                for (let i = 0; i < funcArguments.length; i++) {
                    funcArguments[ i ].accepts.includes( this.branch.condition.params[ i ].type )
                }
            }
            return valid;
        }

    }
}
