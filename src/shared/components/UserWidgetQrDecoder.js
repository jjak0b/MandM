import {template} from "./UserWidgetQrDecoderTemplate.js";
import {TypedValue} from "../js/Types/TypedValue.js";


export const component = {
    template: template,
    props: {
        label: String,
        locale: String,
    },
    data() {
        return {
            content: null
        }
    },

    methods: {
        getContent(){
            let content = this.$i18n.t( this.label, this.locale );
            if( !content || content === this.label )
                return "";
            else
                return content;
        },
        onDetect(promise) {
            promise
                .then((decodeData) => {
                    let content = decodeData.content;
                    if (content === null) {
                        alert("No qr detected");
                    } else {
                        this.$emit(new TypedValue({type: "String.name", value: content}));
                        alert("lol");
                    }
                })
                .catch((error) => {
                    alert("An error has occured");
                    console.log(error);
                })
        }






//
//
//         onFileChange(e) {
//             const file = e.target.files[0];
//             this.operation(file);
//             this.mediaType=e.target.files[0]["type"];
//
//         },
//
//
//         operation(file) {
//             let fileToBase64 = (file) => new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file);
//                 reader.onload = () => resolve(reader.result);
//                 reader.onerror = error => reject(error);
//
//             });
//             fileToBase64(file).then( (uri) => this.mediaSelected = uri)
//             fileToBase64(file).catch(e => Error(e)).then((result) => {
//                 if (result instanceof Error) {
//                     console.error('Error: ', result.message);
//                     return;
//                 }
// // result è una string in formato base64
//             });
//         }
    }
}