
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";
import {component as singleInput} from "./InputSingleTypeWidget.js";
import {component as inputVal} from "./InputValueWidget.js";


export const component = {
    template: template,
    props: {
        value: Object, //The node selected with type Branch
        locale:String
        },
    data() {
        return {
            valmin:Number,
            valmax:Number,
            prova:'',
            valuef: String,
            val:{
                tag: '',
                param: [],
                type: ''
        },
            valueAr: null,
            inputTypes: {
                "any": "ActivityEditorWidget.input-type.any",
                "atom": "ActivityEditorWidget.input-type.atom",
                "range": "ActivityEditorWidget.input-type.range",
                "function": "ActivityEditorWidget.input-type.function"
            },
            functioVal: {
                "Value": "ActivityEditorWidget.label-value",
                "Variable": "ActivityEditorWidget.label-variable"
            },
            functioValTag:{
                "Value":"input-val",
                "Variable":"b-form-select"
            },
            section:[
                {
                    type:String,
                    value:''
                },
                {
                    type:String,
                    value:''
                },
                {
                    value:'',
                    type:String
                },
                {
                    value:'',
                    type:String
                }
            ],
            functionsN:{
              "eq": "ActivityEditorWidget.select-type-func.eq",
                "neq": "ActivityEditorWidget.select-type-func.neq",
                "hasInside": "ActivityEditorWidget.select-type-func.hasInside",
                "isInThere": "ActivityEditorWidget.select-type-func.isInThere",
                "isInRange": "ActivityEditorWidget.select-type-func.isInRange",
            },
            functionsType: {
                eq: {
                    name: "Match",
                    locale: String,
                    list: [],
                    self: Object,
                    param: Object
                },
                neq: {
                    name: "Different",
                    list: [],
                    locale: String,
                    self: Object,
                    param: Object
                },
                hasInside: {
                    name: "Contains",
                    list: [],
                    locale: String,
                    self: Object,
                    param: Array
                },
                isInThere: {
                    name: "Any",
                    list: [],
                    locale: String,
                    self: null,
                    param: Object
                },
                isInRange: {
                    name: "Between",
                    list: [],
                    locale: String,
                    self: Number,
                    param: Number
                }
            }
        }
    },
    watch:{
        'val.tag':function(){
            if(this.val.tag == 'Range'){
                this.val.type='Number';
            }else {
                this.val.type = '';
            }
        }
    },
     methods: {
        update(arr, isFunction){
            if((isFunction) && (this.valueTypeSel=='')){
                alert("seleziona tipo condizione");
            }else {
                var i = 0;
                var j = arr.length + 1;
                this.val.param = arr.slice(i, j);
            }
        },
         updateFunc(val){
            if(this.valueTypeSel){
                this.whipe();
                var i=0;
                var j=val.length+1;
                this.val.param=val.slice(i,j);
            }
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
             if((this.valmin) && (this.valmax)) {
                 this.whipe();
                 this.val.param.push(this.valmin);
                 this.val.param.push(this.valmax);
                 this.val.type='Number';
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
         },
         placeType(val){
           this.val.type=val;
         },
         placeSingle(val){
            this.whipe();
            this.val.param.push(val);
         }
    },
    components:{
        'input-val':inputVal,
        'single-input': singleInput
    }
}
