$( "#overlay-container").ready( function() {
	// Calcolo l'altezza di collapse-container dinamicamente e in percentuale dello spazio rimasto disponibile nell'elemento padre, tenendo conto di quanto spazio spazio occupa menu-container
	let menu_container = $("#menu-container")[0];
	$("#collapse-container").height( (100 - ($( menu_container ).height() / $( menu_container ).parent().height() * 100)) + "%" );
});
// TODO