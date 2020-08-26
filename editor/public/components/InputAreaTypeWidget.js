import {template} from "./InputAreaTypeTemplate.js";


export const component = {
    template:template,
    props:{
        test:Number
    },
data(){
        return {
            valuenum:Number,
            valuear:String,
        //     type: String,
        //     svalue: {
        //         text:String,
        //         num:Number
        //     },
            inputT: {
                "text": "ActivityEditorWidget.input-area.text",
                "numb": "ActivityEditorWidget.input-area.numb"
            }
        }
},
    methods:{
        addT:function(){
            if(this.value){
                if(this.type === 'text'){
                    this.list.push(this.value.txt);
                }
            }
        },
        addN:function(){
            if(this.value){
                if(this.type === 'number'){
                    this.list.push(this.value.num);
                }
            }
        }
    }


}