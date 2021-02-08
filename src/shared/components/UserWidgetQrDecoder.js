import {template} from "./UserWidgetQrDecoderTemplate.js";
import {TypedValue} from "../js/Types/TypedValue.js";


export const component = {
    inheritAttrs: false,
    template: template,
    props: {
        tabindex: [Number,String],
        classes: Array,
        value: Object,
        id: String,
        label: String,
        errorMessage: Object,
    },
    data() {
        return {
            content: null,
            useStream: true,
            isLoading: false
        }
    },
    methods: {
        handleChange(e) {
            //i can't stop change event from qr-code widget tag for a third party component bug, so stop event here
            if( e && e.target != this.$el ) {
                e.stopPropagation();
            }
        },
        onInit(promise) {
            this.isLoading = true;
            return promise
                .then( ( result ) => {
                    // successfully initialized
                    let capabilities = result.capabilities;
                })
                .catch( (error) => {
                    // write all error types for reference purpose
                    switch( error.name ) {
                        case 'NotAllowedError': // user denied camera access permission
                        case 'NotFoundError':  // no suitable camera device installed
                        case 'NotSupportedError':  // page is not served over HTTPS (or localhost)
                        case 'InsecureContextError':
                        case 'StreamApiNotSupportedError': // browser seems to be lacking features
                        case 'NotReadableError': // maybe camera is already in use
                        case 'OverconstrainedError': // did you requested the front camera although there is none?
                            this.useStream = false;
                            break;
                        default:
                            console.error( "[UserWidgetQrDecoder]", "Unhandled error occurred", error);
                            this.useStream = false;
                            break;
                    }
                })
                .finally( () => {
                    this.isLoading = false;
                })
        },
        getContentOf( localeLabel ){
            let content = this.$i18n.t( localeLabel, this.locale );
            if( !content || content === localeLabel )
                return "";
            else
                return content;
        },
        onDetect(promise) {
            promise
                .then((decodeData) => {
                    let content = decodeData.content;
                    console.log( "[UserWidgetQrDecoder]",`Detected: "${content}"` );
                    if (content === null) {
                        this.$bvToast.toast(
                            this.getContentOf( this.errorMessage.body ),
                            {
                                id: this.errorMessage.id,
                                title: this.getContentOf( this.errorMessage.title ),
                                autoHideDelay: 20000,
                                variant: 'danger'
                            }
                        );
                        this.$emit('input', null );
                    }
                    else {
                        this.$emit('input', new TypedValue({type: String.name, value: content}));
                        console.warn( "n", content );
                        this.$el.dispatchEvent( new Event('change', { bubbles: true }) );
                    }
                })
                .catch((error) => {
                    console.error("[UserWidgetQrDecoder]", "onDetect error occurred: ", error);
                    this.$bvToast.toast(
                        this.getContentOf( this.errorMessage.body ),
                        {
                            id: this.errorMessage.id,
                            title: this.getContentOf( this.errorMessage.title ),
                            autoHideDelay: 20000,
                            variant: 'danger'
                        }
                    );
                });
        }
    }
}