import {template} from "./UserWidgetEditorPhotoTemplate.js";
import ComponentPhoto from "../../../../shared/js/Scene/SceneComponents/ComponentPhoto.js";
import {component as photoComponent} from "../../../../shared/components/UserWidgetPhoto.js";

export const component = {
    template:template,
    props:{
        component: ComponentPhoto
    },
    data(){
        return{
        // typedValue:{
        //     type:"select",
        //     value:Object,
        //     cap:"enviroment"
        // },
        typeOfCapture:[
            {value: "select", text:"Select type of media to capture", disabled:true},
            {value: "image/*", text:"Foto"},
            {value: "video/*", text:"Video" },
            {value: "audio/*", text:"Audio"}
        ],
            side:[
                {text:"User", value:"user"},
                {text:"Enviroment",value:"enviroment"}
            ]
        }
    },
    components: {
        "user-widget-photo": photoComponent
    }
}