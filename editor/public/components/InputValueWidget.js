import {template} from "./InputValueWidgetTemplate.js";


export const component = {
    template: template,
    data() {
        return {
            val: {
                tag: String,
                param: []
            },
            temp:null
        }
    },
    methods:{
        check: function () {
            this.val.param.pop();
           this.val.param.push(this.temp);
        }
    }
}