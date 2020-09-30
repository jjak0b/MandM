import {template, templateArray} from "./InputValueWidgetTemplate.js";

export var  component = null,
            componentArray = null;

componentArray = {
    inheritAttrs: false,
    template: templateArray,
    components: {

    },
    props: {
        value: Array,
    },
    data() {
        return {
            type: null,
            tmpValue: null,
            buffer: [],
            selectedIndex: 0
        }
    },
    computed: {
        bufferOptions: function () {
            let array = new Array( this.buffer.length );
            this.buffer.forEach( (value, i) => {
                array[ i ] = {
                    value: i,
                    text: value
                }
            });
            return array;
        }
    },
    watch: {
        "value": function (newVal) {
            if( newVal )
                this.buffer = newVal;
            else
                this.buffer = [];
            this.selectedIndex = null;
        },
        "type": function (newVal) {
            this.wipeBuffer();
        }
    },
    methods: {
        add() {
            this.buffer.push( this.tmpValue );
            this.$emit('input', this.buffer );
        },
        move( index, offset ) {
            let newIndex = index + offset;
            if( 0 <= newIndex && newIndex < this.buffer.length ) {
                this.buffer.splice( newIndex, 0, this.buffer.splice( index, 1 )[0] );
            }
        },
        wipeBuffer() {
            this.selectedIndex = null;
            while( this.buffer && this.buffer.length > 0 )
                this.buffer.pop();
        }
    }
};

component = {
    template: template,
    components:{
    },
    props: {
        value: Object,
        acceptTypes: {
            type: Array,
            default: [
                "Time",
                "Date",
                "Text",
                "Number",
                "Array"
            ]
        },
        context: Object
    },
    data() {
        return {
            componentContext: {
                Time: {
                    component :"b-time",
                    attrs: {
                        type: "time"
                    },
                    i18n: {
                        type: 'shared.label-Time',
                        description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                Date: {
                    component: "b-datepicker",
                    attrs: {
                        type: "date"
                    },
                    i18n: {
                        type: 'shared.label-Date',
                        description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                Text: {
                    component: "b-form-input",
                    attrs: {
                        type: "text"
                    },
                    i18n: {
                        type: "shared.label-Text",
                        description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                Number:{
                    component:"b-form-input",
                    attrs: {
                        type: "number"
                    },
                    i18n: {
                        type: "shared.label-Number",
                        description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                Array: {
                    component: "input-array",
                    i18n: {
                        type: "shared.label-Array",
                        description: "ActivityEditorWidget.tnt-desc"
                    }
                }
            },
            typedValue: {
                type: null,
                value: null
            }
        }
    },
    created() {
        // merge context
        if( this.context ) {
            this.componentContext = Object.assign( this.componentContext, this.context );
        }
    },
    computed: {
        componentDataForType: function () {
            return ( this.typedValue.type && this.componentContext[ this.typedValue.type ] ) ? this.componentContext[ this.typedValue.type ] : null;
        }
    },
    watch: {
        'typedValue.type': function(newVal, oldVal){
            if( newVal != oldVal ){
                this.$emit('taketype', newVal);
                this.wipe();
            }
        },
        'typedValue.value': function(newVal, oldVal){
            console.log("emitting", this.typedValue );
            this.$emit( 'input', this.typedValue );
        },
        "value": function (newVal) {
            this.$set( this.typedValue, "type", newVal.type );
            this.$set( this.typedValue, "value", newVal.value );
        }
    },
    methods:{

        wipe:function () {
            this.$set( this.typedValue, "value", null );
            this.$emit( 'input', this.typedValue );
        }
    }
}

componentArray.components[ "input-value-widget" ] = component;
component.components[ "input-array" ] = componentArray;