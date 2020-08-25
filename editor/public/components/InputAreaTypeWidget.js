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


}