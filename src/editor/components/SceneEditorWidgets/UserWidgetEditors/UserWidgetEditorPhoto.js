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
            value:Object,
            description:"{{ $t('UserWidgets.label-photo-text')}}",
            cap:String
        },
        typeOfCapture:[
            {value: "image/*", text:"Foto", selected:true},
            {value: "video/*", text:"Video" },
            {value: "audio/*", text:"Audio"}
        ]


        }
    },
    components: {
        "user-widget-photo": photoComponent
    }
}