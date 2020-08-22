
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as TextAreaIn} from "./InputAreaTypeWidget.js";


export const component = {
    template: template,
    props: {
        value: String, //Type of input selected in radio
        valuef: String,
        items:Array,
        valueAr:'valore',
        valueT:String
        },
    data(){
        return{
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
                    self: Object,
                    param: Object
                },
                Different: {
                    name: "neq",
                    locale: String,
                    self: Object,
                    param: Object
                },
                Contains: {
                    name: "hasInside",
                    locale: String,
                    self: Object,
                    param: Array
                },
                Any: {
                    name: "isThere",
                    locale: String,
                    self: null,
                    param: Object
                },
                Between: {
                    name: "isInRange",
                    locale: String,
                    self: Number,
                    param: Number
                }
             }
        }
    },
     // methods: {
     //     save() {
     //         let func = this.valoreAr;
     //         if( !func ) {
     //             func = {};
     //             this.items.push( func );
     //             func.valore = func;
     //             // this.$emit( "inc-Id" );
     //             // mission.title = this.localeTitle;
     //             // mission.description = this.localeDescription;
     //             console.log( "registered new mission: ", func );
     //         }
     //
     //         // set new Id, so new locale data will be available
     //         console.log( "Set new ID: " , func  );
     //     }
     // },
    components:{
        'text-area-input': TextAreaIn
    }
}
