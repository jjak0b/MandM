import {template} from "./UserWidgetPhotoTemplate.js";
import ComponentPhoto from "../js/Scene/SceneComponents/ComponentPhoto.js";
import {TypedValue} from "../js/Types/TypedValue.js";


export const component = {
    inheritAttrs: false,
    template: template,
    props: {
        tabindex: [Number,String],
        classes: Array,
        accept: String,
        capture: String
    },
    data() {
        return {
            confirmed: false,
            mediaSelected: null,
            mediaType:null
        }
    },
    computed: {
        realAttrs() {
            let attrs = Object.assign({}, this.$attrs );
            if( "value" in attrs ) {
                this.$delete( attrs, "value" )
            }
            return attrs;
        },
        previewID() {
            return this.$attrs.id + '-preview';
        }
    },
    methods: {
        isMediaType( type ) {
            let mimeBase = this.accept.substring( 0 , this.accept.lastIndexOf( '/' ) + 1 );
            return type && type.startsWith( mimeBase );
        },
        onModalHidden() {
            if (this.mediaSelected && this.confirmed ) {
                this.$emit('input', new TypedValue({type: "File", value: this.mediaSelected}));
                this.$el.dispatchEvent( new Event( "change", {bubbles: true} ) );
            }
            else {
                if( this.$refs && "input" in this.$refs ) {
                    this.$refs.input.form.reset();
                }
                this.confirmed = false;
                this.mediaSelected = null;
            }
        },
        confirm() {
            this.confirmed = true;
        },
        remove() {
            this.confirmed = false;
        },
        onFileChange(e) {
            let file = e.target.files && e.target.files.length > 0 ?  e.target.files[ 0 ] : null;
            // checkValidity() doesn't work properly, so check type manually
            if (file && this.isMediaType( file.type ) ) {
                this.operation( file )
                    .then( () => {
                        this.$bvModal.show( this.previewID );
                    })
                    .catch( (error) => {
                        this.onModalHidden();
                    })
            }
            else {
                this.onModalHidden();
            }
        },
        operation(file) {
            let fileToBase64 = (file) => new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);

            });

            return fileToBase64(file)
                .then((uri) => this.mediaSelected = uri)
                .catch(error => {
                    // result è una string in formato base64
                    if (error instanceof Error) {
                        console.error('Error: ', result.message);
                        return;
                    }
                });
        }
    }
}