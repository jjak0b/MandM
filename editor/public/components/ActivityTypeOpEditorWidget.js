import {template} from "./ActivityTypeOpEditorWidgetTemplate.js";
import {component as asyncLoadComponentI18nInputWidget} from "./I18nInputWidget.js";
import {component as activityTreeWidgetComponent} from "./ActivityTreeWidget.js";



export const component = {
    template: template,
    props:{

    },
    data:{
        return:{
            gametype :{
                0:"ActivityTypeOpEditorWidget.gametype.quiz",
                1:"ActivityTypeOpEditorWidget.gametype.guess",
                2:"ActivityTypeOpEditorWidget.gametype.find"
            }
        }
    }
}