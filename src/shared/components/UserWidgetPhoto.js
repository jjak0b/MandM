import {template} from "./UserWidgetPhotoTemplate.js";
import {TypedValue} from "../js/Types/TypedValue.js";


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
            mediaSelected: null,
            mediaType:null
        }
    },

    methods: {
        send(){
            if(this.mediaSelected) {
                this.$emit('change', new TypedValue({type: "File", value: this.mediaSelected}));
            }else{
                alert("Insert a file before continuing");
            }

        },


        onFileChange(e) {
            const file = e.target.files[0];
            this.operation(file);
            this.mediaType=e.target.files[0]["type"];

        },


        operation(file) {
            let fileToBase64 = (file) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);

            });
            fileToBase64(file).then( (uri) => this.mediaSelected = uri)
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