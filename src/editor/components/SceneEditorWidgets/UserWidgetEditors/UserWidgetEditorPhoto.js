import {template} from "./UserWidgetEditorPhotoTemplate.js";
import {component as photoComponent} from "../../../../shared/components/UserWidgetPhoto.js";

export const component = {
    template:template,
    prop:{
        props: Object,
        value: Object,
    },
    data(){
        return{
        typedValue:{
            type:String,
            value:Object
        }
        }
    },
    components: {
        "user-widget-photo": photoComponent
    }
}