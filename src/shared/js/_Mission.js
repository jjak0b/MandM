export default class Mission {

	constructor(
	/* Story */		story,
	/* Object */	mission_data
	) {

		this.story_owner = story;

		this.actions = null;
		this.quest_name = mission_data.quest_name;
		this.objective_name = mission_data.objective_name;
		this.objective_progress_perc = mission_data.objective_progress_perc;
		this.objective_message_redeem_reward = mission_data.objective_message_redeem_reward;
		this.objective_description = mission_data.objective_description;
		this.objective_hint= mission_data.objective_hint;
		this.objective_hint_label= mission_data.objective_hint_label;
	}

	getActions() { return this.actions; }
}