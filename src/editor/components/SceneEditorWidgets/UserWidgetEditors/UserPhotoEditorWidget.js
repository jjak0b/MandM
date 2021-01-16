import {template} from "./UserPhotoEditorWidgetTemplate.js";

export const component = {
    template:template,
    prop:{
        User:Object
    },
    data:{
        typedValue:{
            type:String,
            value: Object

        }
    }
}