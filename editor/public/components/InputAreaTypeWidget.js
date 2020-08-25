import {template} from "./InputAreaTypeTemplate.js";


export const component = {
    template:template,
    prop:{
        list: Array,
        value: Object,
        type: String
    },
data(){
        return {
            inputT: {
                "text": "ActivityEditorWidget.input-area.text",
                "numb": "ActivityEditorWidget.input-area.numb"
            }
        }
},


}