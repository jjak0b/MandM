import {template} from "./UserWidgetEditorPhotoTemplate.js";
import ComponentPhoto from "../../../../shared/js/Scene/SceneComponents/ComponentPhoto.js";
import {component as photoComponent} from "../../../../shared/components/UserWidgetPhoto.js";

export const component = {
    template:template,
    props:{
        component: ComponentPhoto
    },
    data(){
        return {

        }
    },
    components: {
        "user-widget-photo": photoComponent
    }
}