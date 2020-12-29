import {template} from "./UserWidgetPhotoTemplate.js";

export const component = {
    template: template,
    props: {
        valueType: Object
        //Side:String
        //type:File.name
        //value:Object

    },
    data() {
        return {
            mediaSelected: File

        }


    },
    methods: {

        operation(file) {
            let fileToBase64 = (file) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
            fileToBase64(file).catch(e => Error(e)).then((result) => {
                if (result instanceof Error) {
                    console.error('Error: ', result.message);
                    return;
                }
// result è una string in formato base64
            });
        }
    }
}