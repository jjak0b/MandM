import {template} from "./InputValueWidgetTemplate.js";


export const component = {
    template: template,
    data() {
        return {
            type: '',
            param: [],
            componentsType:{
                time:"b-time",
                date:"UserWidgetDatepicker"
            },
            temp:null
        }
    },
    watch:{
        'selectType': function(){
            $emit('taketype', type);
        },
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
        },
        rem: function(){
            var position=this.param.indexOf(this.temp,0);
            if(position != -1) {
                this.param.splice(position, 1);
            while (position < this.param.lenght) {
                this.param[position] = this.param[position + 1];
                position++;
            }
            }
        }
    }

}