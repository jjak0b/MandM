/* DOM Widget which handle mission list rendering */
export { component } from "./MissionListWidgetTemplate.js";

export var vm = new Vue({
	el: '#mission-list-widget',
	data: {
		missions: []
	},
	methods: {
		getMission: function (
			/* int */ id
		) {
			if( this.missions.length > 0 ){
				return this.missions[ id ];
			}
			return undefined;
		},
		addMission: function (
			/* Mission*/ mission
		) {
			this.missions.push( mission.data );
		}
	}
});
