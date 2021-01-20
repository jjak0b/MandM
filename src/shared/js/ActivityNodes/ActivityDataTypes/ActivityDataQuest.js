import ActivityDataSceneable from "./ActivityDataSceneable.js";

export default class ActivityDataQuest extends ActivityDataSceneable {
	constructor(unparsed) {
		super(unparsed);
		/**
		 *
		 * @type { "continue" | "message" | "nothing" }
		 */
		this.noBranchBehavior = unparsed.noBranchBehavior || "continue";
		this.message = unparsed.message || `${this.i18nCategory}.message`;
	}

	duplicate(locales, activityCategory) {
		let duplicate = super.duplicate(locales, activityCategory);
		duplicate.noBranchBehavior = this.noBranchBehavior;
		duplicate.message = `${duplicate.i18nCategory}.message`;
		locales.push([
			this.message,
			duplicate.message
		]);
		return Object.setPrototypeOf( duplicate, ActivityDataQuest.prototype );
	}

	dispose(params) {
		super.dispose(params);
	}
}