import {template} from "./InputAreaTypeTemplate.js";


export const component = {
    template:template,
    props:{
        value:null
    },
data(){
        return {
            type:Number,
            inputT: {
                "text": "ActivityEditorWidget.input-area.text",
                "numb": "ActivityEditorWidget.input-area.numb"
            }
        }
}

}