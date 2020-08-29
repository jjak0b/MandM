
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
    data(){
        return{
            list:[],
            valueAr:null,
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
                    list:[],
                    self: Object,
                    param: Object
                },
                Different: {
                    name: "neq",
                    list:[],
                    locale: String,
                    self: Object,
                    param: Object
                },
                Contains: {
                    name: "hasInside",
                    list:[],
                    locale: String,
                    self: Object,
                    param: Array
                },
                Any: {
                    name: "isThere",
                    list:[],
                    locale: String,
                    self: null,
                    param: Object
                },
                Between: {
                    name: "isInRange",
                    list:[],
                    locale: String,
                    self: Number,
                    param: Number
                }
             }
        }
    },

     methods: {

         addM() {
             if(this.valueAr) {
                 this.functionsType.Match.list.push(this.valueAr);
             }
             },
         addN() {
             if(this.valueAr) {
                 this.functionsType.Different.list.push(this.valueAr);
             }
         },
         addI() {
             if(this.valueAr) {
                 this.functionsType.Contains.list.push(this.valueAr);
             }
         },
         addT() {
             if(this.valueAr) {
                 this.functionsType.Any.list.push(this.valueAr);
             }
         },
         addR() {
             if(this.valueAr) {
                 this.functionsType.Between.list.push(this.valueAr);
             }
         }

    },
    components:{
        'text-area-input': TextAreaIn
    }
}
