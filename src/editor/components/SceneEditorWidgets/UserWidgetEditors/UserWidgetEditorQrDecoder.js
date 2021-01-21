import {template} from "./UserWidgetEditorQrDecoderTemplate.js";
// import ComponentQrDecoder from "../../../../shared/js/Scene/SceneComponents/ComponentQrDecoder.js";
import {component as qrComponent} from "../../../../shared/components/UserWidgetQrDecoder.js";




export const component = {
    template:template,
    props:{
        // component: ComponentQrDecoder
    },
    data(){
        return{
            label:"Inserisci titolo"
        }
    },
    components: {
        "user-widget-qr": qrComponent
    }
}