
import {template} from "./BranchEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";



export const component = {
    template: template,
    props: {
        inputType:{
            "Any":String,
            "Atom":String,
            "Range":String,
            "Function":String
        },
        value:String,
        inputTypes: Object,
        Functions:{
            Match: {
                name: "eq",
                locale:String,
                self: Object,
                param: Object
            },
            Different:{
                name:"neq",
                locale:String,
                self:Object,
                param:Object
            },
            Contains:{
                name: "hasInside",
                locale:String,
                self:Object,
                param:Array
            },
            Any:{
                name: "isThere",
                locale:String,
                self:null,
                param:Object
            },
            Between:{
                name: "isInRange",
                locale:String,
                self:Number,
                param:Number
            }
        }
    },
    components:{
        'i18n-input-widget': asyncLoadComponentI18nInputWidget,
        'activity-tree-widget': activityTreeWidgetComponent
    },

    data(){
        return{

            }

        },
    methods:{
        checktype : function(){

        }

    }



    }
