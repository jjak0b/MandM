import Mission from './_Mission.js';

export default class Story {

	constructor(
	/* Object */ data
	) {
		let self = this;
		this.missions = [];
		this.name = data.name;
		this.description = data.description;
		this.gamemode = data.gamemode; /*  */
		this.age = data.age;

		if( data.missions ) {
			data.missions.forEach((data_mission) => {
				self.addMission(self, data_mission);
			});
		}
	}

	addMission(
	/*Object */ data,
	/*int*/ 	index
	) {
		let mission = new Mission( this, data );
		if( Number.isInteger( index ) ) {
			this.missions.splice( index, 0, mission );
		}
		else {
			this.missions.push( mission );
		}
	}
}
Story.ENUM_GAMEMODE = Object.freeze({
	"SOLO":1, 		/* 1 player */
	"GROUPS":2, 	/* 2-5 players */
	"CLASSES":3,	/* 15-25 players */
});