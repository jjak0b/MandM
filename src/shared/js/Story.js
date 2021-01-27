import Mission from './Mission.js';
import StyleData from "./StyleData/StyleData.js";
import {Asset} from "./Asset.js";

export default class Story {

	constructor(
	/* Object */ unparsed
	) {

		this.dependencies = unparsed && unparsed.dependencies ? unparsed.dependencies : {
			locales: {},
			/**
			 * @type { {asset: Asset, count: Number}[] }
			 */
			captions: [],
			/**
			 * @type { {asset: Asset, count: Number}[] }
			 */
			videos: [],
			/**
			 * @type { {asset: Asset, count: Number}[] }
			 */
			audios: [],
			/**
			 * @type { {asset: Asset, count: Number}[] }
			 */
			images: [],
			/**
			 * @type { {asset: Asset, count: Number}[] }
			 */
			stylesheets: []
		};

		this.public = unparsed ? unparsed.public : false;
		this.name =  unparsed ? unparsed.name : "";
		this.description = unparsed ? unparsed.description : "";
		this.age = unparsed ? unparsed.age : "";
		this.gamemode = unparsed ? unparsed.gamemode : "";
		this.groups = unparsed && unparsed.groups ? unparsed.groups : [];

		for (const category in this.dependencies) {
			if (category === "locales") continue;
			/**
			 * @type { {asset: Asset, count: Number}[] }
			 */
			let assetsEntries = this.dependencies[category];
			assetsEntries.forEach((entry) => entry.asset = new Asset( entry.asset, null, null ) );
		}
		this.missions = unparsed && unparsed.missions ? unparsed.missions : [];
		for (let i = 0; i < this.missions.length; i++) {
			this.missions[ i ] = new Mission( this.missions[ i ] );
		}

		this.style = new StyleData( unparsed && unparsed.style ? unparsed.style : null );
		this.utility = unparsed && unparsed.utility ? unparsed.utility : {
			qrCodes: []
		}
	}

	duplicate( locales ) {
		let unparsedStory = JSON.parse(JSON.stringify(this));
		delete unparsedStory.missions;
		let duplicateStory = new Story( unparsedStory );
		duplicateStory.name = "";
		if (this.missions) {
			duplicateStory.missions = new Array( this.missions.length );
			for (let i = 0; i < this.missions.length; i++) {
				duplicateStory.missions[i] = this.missions[i].duplicate(locales, 'assets' );
				duplicateStory.replaceMissionInGroups(this.missions[i], duplicateStory.missions[i]);
			}
		}
		return duplicateStory;
	}

	replaceMissionInGroups( oldMission, newMission ) {
		let oldId = oldMission.id;
		let newId = newMission.id;
		if (this.groups) {
			for ( const groupIndex in this.groups ) {
				for ( const missionIndex in this.groups[groupIndex] ) {
					if ( this.groups[groupIndex][missionIndex].id === oldId ) {
						this.groups[groupIndex][missionIndex].id = newId;
						this.groups[groupIndex][missionIndex].title = newMission.title;
					}
				}
			}
		}
	}
}

Story.ENUM_GAMEMODE = Object.freeze({
	"SOLO":1, 		/* 1 player */
	"GROUPS":2, 	/* 2-5 players */
	"CLASSES":3,	/* 15-25 players */
});