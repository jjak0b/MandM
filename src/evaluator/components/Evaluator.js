import {i18n} from "../../shared/js/i18n.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";
import {template} from "./EvaluatorTemplate.js";

export const component = {
	el: '#main',
	template: template,
	i18n: i18n,
	components: {

	},
	data() {
		return {
			loadingProgress: 0,
			loadingInfoLocaleLabel: "shared.label-loading",
			isLoading: false,
			/**
			 * @type Promise
			 */
			locale: i18n.locale,
			sessions: null,
			activeStories: {},
			interval: null,
			selectedStory: null,
			selectedMission: null,
			readyPromise: null
		}
	},
	methods: {
		updateActiveStories() {
			for (const session in this.sessions) {
				for (const story in this.sessions[session]) {
					if (!(story in this.activeStories)) {
						this.updateStoryLocale(story)
						this.$set(this.activeStories, story, []);
					}
					for (const mission in this.sessions[session][story]) {
						if (!this.activeStories[story].includes(mission)) {
							this.activeStories[story].push(mission);
						}
					}
				}
			}
		},
		updateStoryLocale(story) {
			I18nUtils.fetchLocales(`/stories/` + story, [i18n.locale, i18n.fallbackLocale])
			.then(response => {
				for (const locale in response) {
					this.$i18n.mergeLocaleMessage(locale, response[locale]);
				}
			})
		},
		updateSessions() {
				$.get( `/player/log` ).then( (response) => {
					this.sessions = response;
					this.updateActiveStories();
				})
		},
		onSelectMission(story, mission) {
			this.selectedStory = story;
			this.selectedMission = mission;
		}
	},
	created() {

			this.isLoading = true;
			this.loadingInfoLocaleLabel = "shared.label-loading";

			console.log("[EvaluatorVM]", "Start downloading story");
			let promsInit = [
				I18nUtils.fetchLocales("/shared/", [i18n.locale, i18n.fallbackLocale]),
				I18nUtils.fetchLocales("./", [i18n.locale, i18n.fallbackLocale])
			];

			this.loadingProgress = 0;
			let updateProgress = (percentage) => {
				this.loadingProgress = percentage;
			}
			this.readyPromise = allProgress(promsInit, updateProgress)
			.then((responses) => {
				let localesMessagesShared = responses[2];
				let localesMessagesEvaluator = responses[3];
				console.log("[EvaluatorVM]", "Story downloading complete");
				console.log("[EvaluatorVM]", "Start downloading story assets");

				console.log("[EvaluatorVM]", "Init i18n messages for current locale and fallback");
				for (const locale in localesMessagesShared) {
					this.$i18n.mergeLocaleMessage(locale, localesMessagesShared[locale]);
				}

				for (const locale in localesMessagesEvaluator) {
					this.$i18n.mergeLocaleMessage(locale, localesMessagesEvaluator[locale]);
				}

				this.loadingInfoLocaleLabel = "Evaluator.label-loading-resources";

			})
			.catch((error) => {
				this.$bvToast.toast(
						this.$t("Evaluator.errors.label-unable-to-load-resources"),
						{
							title: this.$t("Evaluator.errors.label-error"),
							appendToast: true,
							noAutoHide: true,
							variant: "danger"
						}
				)
				console.error("[EvaluatorVM]", "Unable to fetch assets", error);
				return error;
			})
			.then(() => {
				// From here we have all stuffs we need to run the story

				return new Promise((resolve) => {
					setTimeout(() => this.$nextTick(() => {
						this.isLoading = false;
						console.log("[EvaluatorVM]", "story assets download complete");
						// just let finish the loading animation
						resolve();
					}), 1000);
				})
			})
		},
	mounted() {
		this.readyPromise
			.then( () => {
				this.updateSessions();
				this.interval = setInterval(this.updateSessions, 2500);
			})
	}
}

function allProgress(proms, progress_cb) {
	let d = 0;
	progress_cb(0);
	for (const p of proms) {
		p.then(()=> {
			d ++;
			progress_cb( 100 * (d / proms.length ) );
		});
	}
	return Promise.all(proms);
}