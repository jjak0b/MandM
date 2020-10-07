
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as singleInput} from "./InputSingleTypeWidget.js";
import {component as inputVal} from "./InputValueWidget.js";


export const component = {
    template: template,
    props: {
        branch: Object,
        }, //The node selected with type Branch
        locale: String,
    data() {
        return {
            data: {
                condition: '',

                params: [],
            },
            functioVal: {
                "value": "ActivityEditorWidget.label-value",
                "variable": "ActivityEditorWidget.label-variable"
            },
            functioValTag: {
                "value": "input-val",
                "variable": "b-form-select"
            },
            section: [
                {
                    value: "$userInput",
                    type: "$userInput",
                    order: 1
                },
                {
                    value: "$userInput",
                    type: "$userInput",
                    order: 2
                },
                {
                    value: "$userInput",
                    type: "$userInput",
                    order: 3
                },
                {
                    value: "$userInput",
                    type: "$userInput",
                    order: 4
                }
            ],
            functionsN: {
                "eq": "ActivityEditorWidget.select-type-func.eq",
                "neq": "ActivityEditorWidget.select-type-func.neq",
                "hasInside": "ActivityEditorWidget.select-type-func.hasInside",
                "isInThere": "ActivityEditorWidget.select-type-func.isInThere",
                "isInRange": "ActivityEditorWidget.select-type-func.isInRange",
            }
        }
    },
            watch: {
                'branch': function () {
                    this.prova = false;
                },
                'val.tag': function () {
                    if (this.val.tag == 'Range') {
                        this.val.type = 'Number';
                    } else {
                        this.val.type = '';
                    }
                }
            },
            methods: {
                // update(arr, isFunction) {
                //     if ((isFunction) && (this.valueTypeSel == '')) {
                //         alert("seleziona tipo condizione");
                //     } else {
                //         var i = 0;
                //         var j = arr.length + 1;
                //         this.val.param = arr.slice(i, j);
                //     }
                // },
                updateFunc(val) {
                    if (this.valueTypeSel) {
                        this.whipe();
                        var i = 0;
                        var j = val.length + 1;
                        this.val.param = val.slice(i, j);
                    }
                },
                whipe() {
                    var i = 0;
                    while (i < this.val.param.lenght) {
                        this.val.param.pop();
                        i++;
                    }
                },
                push() {
                    if (this.branch.data.condition != '') {
                        this.branch.data.params = this.section.slice(0, this.section.lenght);
                        this.$emit('conditions', this.branch);
                    } else {
                        alert("Inserisci condizione");
                    }
                }
            },
            components: {
                'input-val': inputVal,
                'single-input': singleInput
            }
}
