import StoryPlayer from "./StoryPlayer.js";
import {CameraWidget} from "./CameraWidget.js";
import Story from "/shared/js/Story.js";


var storyPlayer = new StoryPlayer();
// temp
storyPlayer.loadStory( { gamemode: Story.ENUM_GAMEMODE.SOLO } );
var objective_default_data1 = {
	quest_name:					 	"Nome quest 1",
	objective_name:				 	"Nome obiettivo",
	objective_progress_perc:		50,
	objective_message_redeem_reward:"Ottieni la ricompensa",
	objective_description:		  	"Breve descrizione dell'obiettivo, <br>che sicuramente sarà molto importante per capire cosa deve fare il giocatore",
	objective_hint:				 	"Questo &eacute; un possibile consiglio fornito dall'autore della storia, che pu&oacute; fornire un aiuto al giocatore se ha difficolt&aacute;",
	objective_hint_label:		   	"Mi serve aiuto"
};

var objective_default_data2 = {
	quest_name:						"Nome quest 2",
	objective_name:					"Nome obiettivo",
	objective_progress_perc:		20,
	objective_message_redeem_reward:"Ottieni la ricompensa",
	objective_description:			"Breve descrizione dell'obiettivo, <br>che sicuramente sarà molto importante per capire cosa deve fare il giocatore",
	objective_hint:					"Questo &eacute; un possibile consiglio fornito dall'autore della storia, che pu&oacute; fornire un aiuto al giocatore se ha difficolt&aacute;",
	objective_hint_label:			"Mi serve aiuto"
};

var addmission1 = {
	actionType: "addMission",
	data: objective_default_data1
};
var addmission2 = {
	actionType: "addMission",
	data: objective_default_data2
};

setTimeout( function() {
	storyPlayer.eventLister.dispatchEvent( new CustomEvent (
		addmission1.actionType,
		{ detail: addmission1 }
	));
}, 1000 );

setTimeout( function() {
	storyPlayer.eventLister.dispatchEvent( new CustomEvent (
		addmission1.actionType,
		{ detail: addmission2 }
	));
}, 1500 );

/* init popover */
$(function () {
	$('[data-toggle="popover"]').popover();
});