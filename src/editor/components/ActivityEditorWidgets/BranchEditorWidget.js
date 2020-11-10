
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "../i18nWidgets/I18nInputWidget.js";

import {component as singleInput} from "../InputSingleTypeWidget.js";
import {component as inputVal} from "../InputValueWidget.js";
import ActivityDataBranch from "../../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataBranch.js";

export const component = {
    template: template,
    props: {
        branch: ActivityDataBranch,
        funs:Object,
         //The node selected with type Branch
        locale: String,
    },
    data() {
        return {
            data: {
                condition: '',
                params: [],
                acceptTypes:[]
            },
            funz:{
                type:'',
                val:''
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
                    value: "notDefined",
                    type: "notDefined",
                    order: 1
                },
                {
                    value: "notDefined",
                    type: "notDefined",
                    order: 2
                },
                {
                    value: "notDefined",
                    type: "notDefined",
                    order: 3
                },
                {
                    value: "notDefined",
                    type: "notDefined",
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
    computed:{

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
                pushType(i, element){
                    let object=this.funz;
                    this.funz.type=element;
                    this.data.params[i]=object;
                },
                whipe() {
                    var i = 0;
                    while (i < this.val.param.lenght) {
                        this.val.param.pop();
                        i++;
                    }
                },
                //Push is used to implement the array into the data objects, wich contains the type of condition and the array
                //to contain the params of said condition
                push() {
                    if (this.data.condition !== '') {
                        var i=0;
                        while ( i < this.section.length){
                            this.data.params.push(this.section[i]);
                            i++;
                        }
                        if(this.data.params && this.branch.params !== this.data.params) {
                            this.$emit('conditions', this.data);
                            alert("parameters overided");
                        }
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
