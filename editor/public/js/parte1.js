var agg= new Vue({
    el:'#agg',
    methods: {
        aggiungi:function (){
           if (data.selected.has_children){
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

$(".demoqr").qrcode({
    text:'https://www.jqueryscript.net'
});