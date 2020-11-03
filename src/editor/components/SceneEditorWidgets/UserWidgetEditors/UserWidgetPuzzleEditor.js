import {template} from "./UserWidgetPuzzleEditorTemplate.js";
import {component as mediaFormImage} from "../UserWidgetEditors/UserWidgetEditorMediaPlayer/UserWidgetEditorMediaPlayerImageAreaTabPanel.js"
import {component as puzzleComponent} from "../../../../shared/components/UserWidgetPuzzle.js";

export const component = {
    template: template,
    prop:{
        locale:String,
        props:Object
    },
    data(){
        return{

        }
    },
    components:{
        "media-image": mediaFormImage,
        "user-widget-puzzle": puzzleComponent
    }
};