
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as TextAreaIn} from "./InputAreaTypeWidget.js";
import {component as test} from "./InputValueWidget.js";


export const component = {
    template: template,
    props: {
        value: Object, //The node selected with type Branch
        },
    data() {
        return {
            valmin:Number,
            valmax:Number,
            valueTypeSel:Object,
            valuef: String,
            val:{
                tag: '',
                param: [],
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
        update(arr){
          var i=0;
          var j=arr.length+1;
          this.val.param=arr.slice(i,j);
        },
         whipe(){
             var i=0;
             while(i<this.val.param.lenght){
                 this.val.param.pop();
                 i++;
             }
         },
         advise(val, tipe) {
            if (val) {
               this.whipe();
                    this.val.param.push(val);
                    this.val.tag=tipe;
                    console.info("[ActivityEditor]", "added", val);
                }else{
                    console.info("[ActivityEditor]", "insert a value");
                }
            },
         mimax(){
             if(this.valmin && this.valmax) {
                 this.whipe();
                 this.val.param.push(this.valmin);
                 this.val.param.push(this.valmax);
             }else{
                 alert('Inserire min e max');
             }
           },
         addA(val) {
             if (this.valueAr) {
                 if (val.name === 'hasInside') {
                     val.param.push(this.valueAr);
                 } else {
                     val.param.value = this.valueAr;
                 }
                 console.info("[ActivityEditor]", "Inserito");
             } else {
                 console.info("[ActivityEditor]", "insert a value");
             }
         },
         remA(val) {
             if(val.list.length != 0) {
                 val.list.pop();
             }
         },
         insert(val){
           this.val.type=val;
         }
    },
    components:{
        'input-val':test,
        'text-area-input': TextAreaIn
    }
}
