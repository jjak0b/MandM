import {template} from "./UserWidgetEditorQrDecoderTemplate.js";
import ComponentQrDecoder from "../../../../shared/js/Scene/SceneComponents/ComponentQRDecoder.js";
import {component as qrComponent} from "../../../../shared/components/UserWidgetQrDecoder.js";
import {component as asyncLoadComponentI18nInputWidget} from "../../i18nWidgets/I18nInputWidget.js";


export const component = {
    template:template,
    props:{
        component: ComponentQrDecoder,
        locale: String
    },
    components: {
        'i18n-input-widget': asyncLoadComponentI18nInputWidget,
        "user-widget-qr": qrComponent
    },
    data() {
        return {
            previewDecodedValue: null
        }
    },
    methods: {


    }
}