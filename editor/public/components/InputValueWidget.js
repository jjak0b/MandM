import {template} from "./InputValueWidgetTemplate.js";


export const component = {
    template: template,
    props:{
            tag: String,
            type: String,
            param: []
    },
    data() {
        return {
            temp:null,
            arr:[]
        }
    },
    methods:{
        check: function () {
            this.param.pop();
           this.param.push(this.temp);
        },
        wipe:function (){
            var i=0;
            while(i<this.param.length){
                this.param.pop();
            }
        }
    }

}