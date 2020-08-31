import {template} from "./InputAreaTypeTemplate.js";


export const component = {
    template:template,
    props:{
        inty:Number,
        values:null
    },
data(){
        return {
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
}
}