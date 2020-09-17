import {template} from "./InputAreaTypeTemplate.js";

export const component = {
    template:template,
data(){
        return {
            value:null,
            type:Number,
            inputT: {
                "text": "ActivityEditorWidget.input-area.text",
                "numb": "ActivityEditorWidget.input-area.numb"
            }
        }
}

}