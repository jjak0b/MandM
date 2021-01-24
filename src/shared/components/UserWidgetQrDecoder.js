import {template} from "./UserWidgetQrDecoderTemplate.js";
import {TypedValue} from "../js/Types/TypedValue.js";


export const component = {
    template: template,
    props: {
        value: Object,
        id: String,
        label: String,
        errorMessage: Object,
    },
    data() {
        return {
            content: null
        }
    },
    methods: {
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
                })
        }
    }
}