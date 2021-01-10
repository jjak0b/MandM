import {i18n} from "../../shared/js/i18n.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";
import {template} from "./EvaluatorTemplate.js";
import {component as evaluatorChat } from "./EvaluatorChatWidget.js";

export const component = {
	el: '#main',
	template: template,
	i18n: i18n,
	components: {
		evaluatorChat
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
			readyPromise: null,
			chatsData: {
				mySelf: {
					id: null,
					name: this.$t( "ChatWidget.label-myself" ),
					nameForReceiver: this.$t( "ChatWidget.label-Helper" ),
				},
				players: {}
			},
			fetchTimeout: 1 * 1000,
			globalStorySettings: {
				isRunning: false,
				startSecondsCountDown: 0,
			}
		}
	},
	methods: {
		startStory() {
			this.globalStorySettings.isRunning = null;

			$.ajax({
				method: "POST",
				url: `/stories/${this.selectedStory}/start`,
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify({
					countDown: this.globalStorySettings.startSecondsCountDown
				})
			})
				.done( ( data, textStatus, jqXHR) => {
					this.globalStorySettings.isRunning = true;
					this.$bvToast.toast(
						this.$t("Evaluator.label-story-starting"),
						{
							title: this.$tc("Evaluator.label-story-starting"),
							appendToast: true,
							noAutoHide: false,
							variant: "success"
						}
					)
				})
				.fail( ( jqXHR, textStatus, errorThrown ) => {
					switch ( jqXHR.status ) {
						case 405 : // method not allowed -> story already runnning
							this.globalStorySettings.isRunning = true;
							this.$bvToast.toast(
								this.$t("Evaluator.errors.label-story-already-active"),
								{
									title: this.$t("Evaluator.errors.label-error"),
									appendToast: true,
									noAutoHide: false,
									variant: "warning"
								}
							)
							break;
						default:
							this.globalStorySettings.isRunning = false;
							this.$bvToast.toast(
								this.$t("Evaluator.errors.label-unable-to-start-story"),
								{
									title: this.$t("Evaluator.errors.label-error"),
									appendToast: true,
									noAutoHide: false,
									variant: "danger"
								}
							);
							break
					}
				})
		},
		stopStory() {
			this.globalStorySettings.isRunning = null;

			$.ajax({
				url: `/stories/${this.selectedStory}/stop`,
				method: "POST"
			})
				.done( ( data, textStatus, jqXHR) => {
					this.$bvToast.toast(
						this.$t("Evaluator.label-story-end"),
						{
							title: this.$tc("Evaluator.label-story-ending"),
							appendToast: true,
							noAutoHide: false,
							variant: "success"
						}
					)
					this.globalStorySettings.isRunning = false;
				})
				.fail( ( jqXHR, textStatus, errorThrown ) => {
					switch ( jqXHR.status ) {
						case 405 : // method not allowed -> story already stopped
							this.globalStorySettings.isRunning = false;
							this.$bvToast.toast(
								this.$t("Evaluator.errors.label-story-already-ended"),
								{
									title: this.$t("Evaluator.errors.label-error"),
									appendToast: true,
									noAutoHide: false,
									variant: "warning"
								}
							)
							break;
						default:
							this.globalStorySettings.isRunning = true;
							this.$bvToast.toast(
								this.$t("Evaluator.errors.label-unable-to-stop-story"),
								{
									title: this.$t("Evaluator.errors.label-error"),
									appendToast: true,
									noAutoHide: false,
									variant: "danger"
								}
							);
							break
					}
				})
		},
		initDataChatForPlayer( playerID ) {

			if( !("players" in this.chatsData ))
				this.$set( this.chatsData, "players", {} );

			if( !(playerID in this.chatsData.players ) ) {
				this.$set( this.chatsData.players, playerID, {
					status: {
						online: false,
						invite: false
					}
				});
			}
		},
		getPlayerChatData(playerID) {
			this.initDataChatForPlayer( playerID );
			return this.chatsData.players[ playerID ];
		},
		fetchDataForPlayerChat( playerID ) {
			if( !playerID ) return Promise.reject( playerID );

			this.initDataChatForPlayer( playerID );
			let playerChatData = this.getPlayerChatData(playerID);

			let promiseParts = {
				status: Promise.resolve( $.get( `/player/chat/${playerID}/status/`) )
			}

			return promiseParts.status
				.then( response => {
					playerChatData.status = response;
				})
				.catch( (error) => {
					console.error( "[Chat]","Unable to fetch status", "cause:", error );
				})
		},
		fetchDataOfChats() {
			let promiseChatId = Promise.resolve( $.get( "/player/chat/") );

			promiseChatId
				.then( (response) => {
					this.chatsData.mySelf.id = response[ 0 ];
				})
				.catch( error => {
					console.error( "[Chat]", "Unable to fetch chat data for my session id", "cause:", error );
				})

			for (const playerID in this.sessions) {
				this.fetchDataForPlayerChat( playerID )
					.catch( error => {
						console.error( "[Chat]", "Unable to fetch chat data for session", playerID );
					})
			}
		},
		getMissionTitle( missionId ) {
			// TODO: read from story
			return this.$t(`assets.mission.${missionId}.title`);
		},
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
		},
		fetchAll() {
			this.updateSessions();
			this.fetchDataOfChats();
		},
		getIconChatProps( playerID ) {
			let playerChat = this.getPlayerChatData( playerID );
			let props = {};
			if( playerChat.status) {
				if( playerChat.status.online ) {
					props.animation = null;
					props.variant = "success";
					props.icon = "chat-fill";
				}
				else if( playerChat.status.invite ) {
					props.animation = "fade";
					props.variant = "warning";
					props.icon = "chat-dots";
				}
				else {
					props.animation = null;
					props.variant = null;
					props.icon = "chat";
				}
			}

			return props;
		},
		enablePlayerChat( playerID, enable ) {
			let playerChat = this.getPlayerChatData( playerID );

			// update temp locally
			playerChat.status.online = !!enable;
			if( enable ) {
				playerChat.status.invite = false;
			}
			else {
				playerChat.status.invite = false;
			}

			// update on server
			$.ajax({
				method: "post",
				url: `/player/chat/${playerID}/status`,
				contentType: "application/json",
				data: JSON.stringify( playerChat.status )
			});
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
				this.fetchAll();
				this.interval = setInterval(this.fetchAll, 2500);
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