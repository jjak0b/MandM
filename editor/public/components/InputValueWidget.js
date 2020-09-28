import {template} from "./InputValueWidgetTemplate.js";
// import {component as datePickerEditorComponent} from "datePickerEditorComponent"

export const component = {
    template: template,
    components:{
        // "user-widget-editor-datepicker": datePickerEditorComponent
    },
    data() {
        return {
            componentsTag: {
                Time: {
                    name:"b-time",
                    attrs:"time"
                },
                Date: {
                    name:"b-form-input",
                    attrs:"date"
                },
                Text: {
                   name: "b-form-input",
                    attrs:"text"
                },
                Number:{
                    name:"b-form-input",
                attrs: "number"
            }
            },
            type: '',
            param: [],
            arrayType:'',
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