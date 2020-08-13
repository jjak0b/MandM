
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";



export const component = {
    template: template,
    props: {
        value: Object,
        inputTypes: {
            "Any": " BranchEditorWidget.input-type.any",
            "Atom": "BranchEditorWidget.input-type.atom",
            "Range": "BranchEditorWidget.input-type.range",
            "Function": "BranchEditorWidget.input-type.function"
        },
        locale: String
        },
    components:{
        'i18n-input-widget': asyncLoadComponentI18nInputWidget,
        'activity-tree-widget': activityTreeWidgetComponent
    },

    data(){
        return{
            functionsType: {
                Match: {
                    name: "eq",
                    locale: String,
                    self: Object,
                    param: Object
                },
                Different: {
                    name: "neq",
                    locale: String,
                    self: Object,
                    param: Object
                },
                Contains: {
                    name: "hasInside",
                    locale: String,
                    self: Object,
                    param: Array
                },
                Any: {
                    name: "isThere",
                    locale: String,
                    self: null,
                    param: Object
                },
                Between: {
                    name: "isInRange",
                    locale: String,
                    self: Number,
                    param: Number
                }
            }
        }

        },
    methods:{
        checktype : function(){

        }

    }



    }
