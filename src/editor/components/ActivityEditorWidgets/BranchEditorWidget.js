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
        variablesNames: Array
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
                "isAny": "ActivityEditorWidget.select-type-func.isAny",
                "isInRange": "ActivityEditorWidget.select-type-func.isInRange",
                "isGreaterThan": "ActivityEditorWidget.select-type-func.isGreaterThan",
                "isLessThan": "ActivityEditorWidget.select-type-func.isLessThan",
                "contains": "ActivityEditorWidget.select-type-func.contains",
                "isDefined": "ActivityEditorWidget.select-type-func.isDefined",
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
                "score": "shared.label-score"
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

        return data;
    },
    mounted() {
        this.onReset();
    },
    watch: {
        "branch": function (newVal, oldVal) {
            this.onReset();
        },
        "condition.requireHumanEvaluation": function (newVal, oldVal) {
            if( newVal ) {
                // keep self parameter and set default isDefined function
                this.$set( this.condition, "function", "isDefined");
                // required to prevent "condition.function" watcher to wipe array
                this.form.assign = true;

                // keep self parameter
                this.$set(
                    this.condition,
                    "params",
                   [ this.selfParameter ]
                );

                this.condition.negate = false;
                this.$nextTick( () =>  this.form.assign = false );
            }
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
        parametersDisabled() {
            return this.condition.requireHumanEvaluation;
        },
        selfParameter() {
            return this.condition.params[0];
        },
        parameters() {
            if( this.branch && this.condition && this.condition.params )
                return this.condition.params;
            return [];
        },
        variableOptions() {
            let options = [];

            // add system default variables
            this.envVariableNames.forEach( (varName, index) => {
                options.push({
                    text: varName in this.variableLocaleLabels ? this.$t(this.variableLocaleLabels[ varName ]) : this.$t( 'shared.label-variable-name', {name: varName} ),
                    value: varName
                });
            });

            // add local activity variables
            if( this.variablesNames ) {
                this.variablesNames.forEach( (varName, index) => {
                    options.push({
                        text: this.$t( 'shared.label-variable-name', {name: varName} ),
                        value: varName
                    });
                });
            }
            return options;
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
