import {template} from "./InputValueWidgetTemplate.js";


export const component = {
    template: template,
    props:{
            type: String
    },
    data() {
        return {
            param: [],
            componentsType:{
                time:"b-time",
                date:"UserWidgetDatepicker"
            },
            temp:null
        }
    },
    watch:{
      'type': function(){
          this.wipe();
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