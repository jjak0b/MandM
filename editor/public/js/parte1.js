var agg= new Vue({
    el:'#agg',
    methods: {
        aggiungi:function (){
           if (is_parent($('#container').selected)){
alert("daddy");
           }
        }
    }
})

var rem= new Vue({
    el:'#rem',
    methods:{
        rimuovi:function(){
            delete_node($('#container').selected);
        }
    }
})

$(button).addEventListener("click", aggiungi);