
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as TextAreaIn} from "./InputAreaTypeWidget.js";



export const component = {
    template: template,
    props: {
        value: String, //Type of input selected in radio
        valuef: String,
        valueT:String,
        type:String,
        test:Number,
        valueTypeSel:Object,
        valuear:String,
        valueSel:Array
        },
    data() {
        return {
            val:{
                tag: '',
                value: [],
                type: ''
        },
            valueAr: null,
            inputTypes: {
                "Any": "ActivityEditorWidget.input-type.any",
                "Atom": "ActivityEditorWidget.input-type.atom",
                "Range": "ActivityEditorWidget.input-type.range",
                "Function": "ActivityEditorWidget.input-type.function"
            },
            functioVal: {
                "Array": "ActivityEditorWidget.input-func-value.array",
                "Value": "ActivityEditorWidget.input-func-value.value",
                "Variable": "ActivityEditorWidget.input-func-value.variable"
            },
            functionsType: {
                Match: {
                    name: "eq",
                    locale: String,
                    list: [],
                    self: Object,
                    param: Object
                },
                Different: {
                    name: "neq",
                    list: [],
                    locale: String,
                    self: Object,
                    param: Object
                },
                Contains: {
                    name: "hasInside",
                    list: [],
                    locale: String,
                    self: Object,
                    param: Array
                },
                Any: {
                    name: "isThere",
                    list: [],
                    locale: String,
                    self: null,
                    param: Object
                },
                Between: {
                    name: "isInRange",
                    list: [],
                    locale: String,
                    self: Number,
                    param: Number
                }
            }
        }
    },

     methods: {

        advise() {
            if (this.valueAr) {
                this.val.value.push(this.valueAr);
                console.info("[ActivityEditor]", "added", this.valueAr);
            }else{
                console.info("[ActivityEditor]", "insert a value")
            }
            },
         addA(val) {
             if(this.valueAr) {
                 val.list.push(this.valueAr);
             }
             },
         remA(val) {
             if(val.list.length != 0) {
                 val.list.pop();
             }
         }

    },
    components:{
        'text-area-input': TextAreaIn
    }
}
