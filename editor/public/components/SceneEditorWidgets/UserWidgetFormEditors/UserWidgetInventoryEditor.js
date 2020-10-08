import {template} from "./UserWidgetInventoryEditorTemplate.js";
import {component as InventoryComponent} from "/shared/components/UserWidgetInventory.js";


export const component = {
    template: template,
    components: {
        "inventory-widget": InventoryComponent
    },
    props: {
        props: Object,
    },
    data() {
        return {
            inventory: [
                {value: 'give', text: "UserWidgets.Inventory.label-give"},
                {value: 'take', text: "UserWidgets.Inventory.label-take"}
            ],
            initInv: [],
            tmpvalue: Object,
            inv: {
                num: '',
                id: '',
                name: '',
                desc: '',
                image: Image
            },
            i: 0,
        }

    },
    methods: {
        pushObject() {
            this.initInv.unshift(this.inv);
            this.i++;
        },
        removeInv(element) {
            let tot = this.initInv.length;
            let pos = this.initInv.indexOf(element);
            let array = this.initInv.splice(0, pos - 1);
            array = this.initInv.splice(pos + 1, tot);
            this.initInv = array;
        }
    }
};