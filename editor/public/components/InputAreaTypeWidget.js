import {template} from "./InputAreaTypeTemplate.js";


export const component = {
    template:template,
    prop:{
        list: Array,
        value: Object,
        type: String //FIXME: Error tells me that this variable is not defined
    },
data(){
        return {
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