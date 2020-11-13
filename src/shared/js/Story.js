import Mission from './Mission.js';
import StyleData from "./StyleData/StyleData.js";

export default class Story {

	constructor(
	/* Object */ unparsed
	) {

		this.dependencies = unparsed && unparsed.dependencies ? unparsed.dependencies : {
			locales: {},
			captions: [],
			videos: [],
			audios: [],
			images: [],
			stylesheets: []
		};

		this.public = unparsed ? unparsed.public : true;
		this.name =  unparsed ? unparsed.name : "";
		this.description = unparsed ? unparsed.description : "";
		this.age = unparsed ? unparsed.age : "";
		this.gamemode = unparsed ? unparsed.gamemode : "";
		this.groups = unparsed ? unparsed.groups : [];

		this.missions = unparsed ? unparsed.missions : [];
		for (let i = 0; i < this.missions.length; i++) {
			this.missions[ i ] = new Mission( this.missions[ i ] );
		}

		this.style = new StyleData( unparsed && unparsed.style ? unparsed.style : null );
	}
}

Story.ENUM_GAMEMODE = Object.freeze({
	"SOLO":1, 		/* 1 player */
	"GROUPS":2, 	/* 2-5 players */
	"CLASSES":3,	/* 15-25 players */
});