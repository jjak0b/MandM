import {template} from "./UserWidgetInventoryEditorTemplate.js";
import {component as InventoryComponent} from "/shared/components/UserWidgetInventory.js";


export const component = {
    template: template,
    components:{
      "inventory-widget": InventoryComponent
    },
    props:{
        props: Object,
    },
    data() {
        return {
            inventory: [
                {value:'give', text:"UserWidgets.Inventory.label-give"},
                {value:'take', text:"UserWidgets.Inventory.label-take"}
            ]
        }

        }
    }