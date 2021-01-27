import {template, templateArray} from "./InputTypedValueWidgetTemplate.js";
import {TypedValue} from "../../shared/js/Types/TypedValue.js";
import Time from "../../shared/js/Types/Time.js";

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
        //  taketype event not currently used, so we allow array with different types
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
        value: TypedValue,
        acceptTypes: {
            type: Array,
            default: function () { return [
                Time.name,
                Date.name,
                String.name,
                Number.name,
                Array.name
            ] }
        },
        context: Object
    },
    data() {
        return {
            componentContext: {
                [Time.name]: {
                    component :"b-time",
                    attrs: {
                        // type: "time"
                    },
                    i18n: {
                        type: 'shared.label-Time',
                        // description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                [Date.name]: {
                    component: "b-datepicker",
                    attrs: {
                        // type: "date"
                    },
                    i18n: {
                        type: 'shared.label-Date',
                        // description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                [String.name]: {
                    component: "b-form-input",
                    attrs: {
                        type: "text"
                    },
                    i18n: {
                        type: "shared.label-Text",
                        // description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                [Number.name]:{
                    component:"b-form-input",
                    attrs: {
                        type: "number"
                    },
                    i18n: {
                        type: "shared.label-Number",
                        // description: "ActivityEditorWidget.tnt-desc"
                    }
                },
                [Array.name]: {
                    component: "input-array",
                    i18n: {
                        type: "shared.label-Array",
                        // description: "ActivityEditorWidget.tnt-desc"
                    }
                }
            },
            typedValue: new TypedValue()
        }
    },
    created() {
        // merge context
        if( this.context ) {
            this.componentContext = Object.assign( this.componentContext, this.context );
        }
    },
    mounted() {
        this.assign( this.value );
    },
    computed: {
        componentDataForType: function () {
            return ( this.typedValue.type && this.componentContext[ this.typedValue.type ] ) ? this.componentContext[ this.typedValue.type ] : null;
        }
    },
    watch: {
        'typedValue.type': function(newVal, oldVal){
            if( newVal != oldVal && oldVal || !newVal ){
                console.log("[InputTypedValueWidget]", "changing value type -> reset value");
                this.$set(this.typedValue, "value", null); // clear value data incompatible with type
            }
        },
        'typedValue.value': function(newVal, oldVal){
            let areEquals = this.typedValue.equals( this.value );
            let isValid = this.isValid(this.typedValue);
            if( !areEquals && isValid ) {
                this.$emit( 'input', new TypedValue( this.typedValue ) );
            }
            else if( areEquals && !isValid ) {
                console.log("[InputTypedValueWidget]", "value type unset -> notify null TypedValue");
                this.$emit('input', null); // invalid data so set null on parent
            }
            // else they are equals and valid, so we don't notify anything
        },
        "value": function (newVal) {
            this.assign( newVal );
        }
    },
    methods:{
        isValid(typedValue) {
            return typedValue && typedValue.type && typedValue.value;
        },
        assign( value ) {
            if( this.typedValue.equals( value ) ) return;

            if( value && value instanceof TypedValue ) {
                console.log("assign", value );
                this.$set(this.typedValue, "type", value.type);
                this.$set(this.typedValue, "value", value.value);
            }
            else {
                console.log("[InputTypedValueWidget]", "invalid TypedValue data -> resetting TypedValue");
                // invalidate data
                this.$set(this.typedValue, "value", null );
            }
        },
        reset() {
            console.log("[InputTypedValueWidget]", "resetting TypedValue");
            this.typedValue = new TypedValue();
            this.$emit( 'input',  null );
        }
    }
}

componentArray.components[ "input-value-widget" ] = component;
component.components[ "input-array" ] = componentArray;