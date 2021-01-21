import {template} from "./UserWidgetQrDecoderTemplate.js";
import {TypedValue} from "../js/Types/TypedValue.js";


export const component = {
    template: template,
    props: {
        label:String,
    },
    data() {
        return {
            content:null
        }
    },

    methods: {
        async onDetect (promise) {
            try {
                const {
                    imageData,    // raw image data of image/frame
                    content,      // decoded String or null
                    location      // QR code coordinates or null
                } = await promise

                if (content === null) {
                    alert("No qr detected");
                } else {
                   this.content=content;
                }
            } catch (error) {
                alert("An error has occured");
                console.log(error);
            }
        }
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