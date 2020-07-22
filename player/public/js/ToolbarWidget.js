// TODO Move this code to a more appropriate place
$("#overlay-container").ready(() => {
	// Calcolo l'altezza di collapse-container dinamicamente e in percentuale dello spazio rimasto disponibile
	// nell'elemento padre, tenendo conto di quanto spazio spazio occupa menu-container
	let menuContainer = $("#menu-container")[0];
	$("#collapse-container").height( (100 - ($( menuContainer ).height() / $( menuContainer ).parent().height() * 100)) + "%" );
});
