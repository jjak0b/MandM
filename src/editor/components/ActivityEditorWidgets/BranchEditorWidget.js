import {template} from "./BranchEditorWidgetTemplate.js";
import {component as conditionParameterComponent} from "./BranchEditor/BranchEditorParameterWidget.js";
import ActivityDataBranch from "../../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataBranch.js";
import {ConditionParameter} from "../../../shared/js/Branch/ConditionParameter.js";
import {BranchCondition} from "../../../shared/js/Branch/BranchCondition.js";

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
                assign: false
            },
            condition: new BranchCondition(null,),
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

        // build options for the select
        for (const functionsKey in data.functionPrototypes) {
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
    mounted() {
        this.onReset();
    },
    watch: {
        "branch": function (newVal, oldVal) {
            this.onReset();
        },
        "condition.function": function (value, oldVal) {

            if( this.form.assign ) {
                console.log("skipping for assign");
                return;
            }


            if( value && value != oldVal ) {
                let params = new Array( this.functionPrototypes[ value ].arguments.length );
                for (let i = 0; i < params.length; i++) params[ i ] = new ConditionParameter();

                this.$set(
                    this.condition,
                    "params",
                    params
                );
                console.log("update function parameters",this.condition, params );
            }
            else {
                this.$set(
                    this.condition,
                    "params",
                    []
                );

                console.log("clear function parameters",this.condition );
            }

        }
    },
    computed:{
        selfParameter() {
            return this.condition.params[0];
        },
        parameters() {
            if( this.branch && this.condition && this.condition.params )
                return this.condition.params;
            return [];
        }
    },
    methods: {
        assign( dataBranch ) {
            this.form.assign = true;
            let copy = JSON.parse( JSON.stringify( dataBranch.condition ) );
            this.condition = new BranchCondition( copy );
            this.$nextTick( () => this.form.assign = false );
        },
        getParameterI18n( name ) {
            if( !(name in this.parametersLocaleLabels) ) {
                name = "parameter";
            }
            return this.$t( this.parametersLocaleLabels[ name ] );
        },
        onSubmit(event) {
            console.log("a");
            this.$set( this.branch, "condition", this.condition );
            this.onReset( event );
        },
        onReset( event ) {
            this.form.assign = true;
            this.condition = new BranchCondition({function:null, params: [], rewardPoints:0 } );
            this.$nextTick( () => this.assign( this.branch ) );
        }
    }
}
