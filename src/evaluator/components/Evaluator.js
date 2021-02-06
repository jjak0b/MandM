import {i18n, getLanguagesArraySet } from "../../shared/js/i18n.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";
import {template} from "./EvaluatorTemplate.js";
import {component as evaluatorChat } from "./EvaluatorChatWidget.js";
import {TypedValue} from "../../shared/js/Types/TypedValue.js";
import {getMIMEFromDataURL} from "../../shared/js/FileUtility.js";

export const component = {
	el: '#main',
	template: template,
	i18n: i18n,
	components: {
		evaluatorChat
	},
	data() {
		let self = this;
		return {
			storyNames: [],
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
					id: 1,
					name: {
						toString() {
							return self.$t("ChatWidget.label-myself");
						}
					},
					nameForReceiver: "ChatWidget.label-Helper",
				},
				players: {}
			},
			fetchTimeout: 1 * 1000,
			selectedSession: null,
			sessionName: null,
			storySettings: {},
			stuckData: {},
			humanEvaluationData: {},
			collapseData: {},
			editScoreData: null,
			leaderboardFields: [
				{ key: 'name', sortable: true },
				{ key: 'totalScore', sortable: true },
				{ key: 'totalTime', sortable: true },
				{ key: 'averageActivityTime', sortable: true }
			],
			oldLeaderboard: {}
		}
	},
	computed: {
		getLeaderboard: function () {
			if ( this.selectedStory ) {
				if ( this.storySettings[this.selectedStory].isRunning ) {
					return this.leaderboard;
				}
				else {
					return this.oldLeaderboard;
				}
			}
			return {}
		},
		leaderboard: function () {
			let story = this.selectedStory;
			let name;
			let leaderboard = [];
			for ( const session in this.sessions) {
				if ( story in this.sessions[session] ) {
					if ( 'totalScore' in this.sessions[session][story] ) {

						name = session;
						if ( 'name' in this.sessions[session] ) {
							name = this.sessions[session].name;
						}

						let totalTime = 0;
						let activityCountForTime = 0;
						for( const missionID in this.sessions[session][story] ) {
							let mission = this.sessions[session][story][ missionID ];
							for (const activityID in mission) {
								let activity = mission[ activityID ];
								if( activity.start && activity.end ) {
									let startTime = new Date(activity.start);
									let endTime = new Date(activity.end);
									let time = endTime - startTime;

									totalTime += time;
									activityCountForTime ++;
								}
							}
						}

						let totalDateTime = new Date( totalTime );
						let averageDateTime = new Date( activityCountForTime > 0 ? Math.floor( totalTime / activityCountForTime ) : 0 );
						leaderboard.push({
							name: name,
							totalScore: this.sessions[session][story].totalScore,
							totalTime: `${ totalDateTime.getUTCHours() }h ${totalDateTime.getUTCMinutes()}m ${totalDateTime.getUTCSeconds()}s`,
							averageActivityTime: `${ averageDateTime.getUTCHours() }h ${averageDateTime.getUTCMinutes()}m ${averageDateTime.getUTCSeconds()}s`
						});
					}
				}
			}
			return leaderboard;
		}
	},
	methods: {
		downloadGameData() {
			let exportName = 'Game-' + new Date().toLocaleDateString();
			let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify( this.getLeaderboard, null, 4 ) );
			let downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute("href",     dataStr);
			downloadAnchorNode.setAttribute("download", exportName + ".json");
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
		},
		toggleCollapse(sessionName, story, mission, activity) {
			let id;

			this.onSelectMission(story);

			if (!this.collapseData[sessionName].visible) {
				id = 'player-accordion-' + sessionName;
				this.$emit('bv::toggle::collapse', id);
			}
			this.$nextTick(() => {
				if (!this.collapseData[sessionName][story][mission].visible) {
					id = 'collapse-player-' + sessionName + '-mission-' + mission;
					this.$emit('bv::toggle::collapse', id);
				}
				this.$nextTick(() => {
					this.$refs[`${sessionName}${story}${mission}${activity}`][0].focus();
				})

			})
		},
		toggleStuckCollapse(sessionName) {
			if (this.stuckData.hasOwnProperty(sessionName) && this.stuckData[sessionName].stuck === true ) {

				let story = this.stuckData[sessionName].story;
				let mission = this.stuckData[sessionName].mission;
				let activity = this.stuckData[sessionName].activity;

				this.toggleCollapse( sessionName, story, mission, activity );
			}
		},
		toggleHumanEvaluationCollapse(sessionName) {
			if ( this.humanEvaluationData.hasOwnProperty(sessionName)
				 && this.humanEvaluationData[sessionName].requireHumanEvaluation === true ) {

				let story = this.humanEvaluationData[sessionName].story;
				let mission = this.humanEvaluationData[sessionName].mission;
				let activity = this.humanEvaluationData[sessionName].activity;

				this.toggleCollapse( sessionName, story, mission, activity );
			}
		},
		getActivityBorderVariant(session, story, mission, activity) {
			if ( this.stuckData[session] && this.stuckData[session].stuck === true ) {
				if ( this.stuckData[session].story === story
					 && this.stuckData[session].mission === mission
					 && this.stuckData[session].activity === activity ) {
					return 'danger'
				}
			}
			return 'info'
		},
		showSessionModal( session ) {
			this.selectedSession = session;
			this.$bvModal.show('evaluatorModal');
		},
		showScoreModal( sessionName, selectedStory, missionId, activityId ) {
			this.editScoreData = {
				session: sessionName,
				story: selectedStory,
				mission: missionId,
				activity: activityId,
				score: this.sessions[sessionName][selectedStory][missionId][activityId].score
			}
			this.$nextTick( () => {
				this.$bvModal.show('scoreModal');
			} )
		},
		setActivityValuation(sessionName, data) {
			$.ajax({
				method: "post",
				url: `/player/log/${sessionName}/?valuated=true`,
				data: JSON.stringify(data),
				contentType: "application/json"
			})
		},
		setActivityScore() {
			let data = this.editScoreData;
			$.ajax({
				method: "post",
				url: `/player/log/${data.session}/?score=${data.score}`,
				data: JSON.stringify(data),
				contentType: "application/json"
			}).done(() => {
				console.log(`[Evaluator] Changed the score of activity ${data.activity} of session ${data.session} to ${data.score}`)
				if ( data.session in this.humanEvaluationData
						&& this.humanEvaluationData[data.session].story === data.story
						&& this.humanEvaluationData[data.session].mission === data.mission
						&& this.humanEvaluationData[data.session].activity === data.activity ) {
						this.setActivityValuation( data.session, this.humanEvaluationData[data.session]);
				}
			}).fail( () => {
				console.log(`[Evaluator] Failed to change the score of activity ${data.activity} of session ${data.session} to ${data.score}`)
			}).always( () => {
				this.editScoreData = null;
			});
		},
		setSessionName() {
			if (this.selectedSession && this.sessionName) {
				$.ajax({
					method: "post",
					url: `/player/log/${this.selectedSession}/?name=${this.sessionName}`
				}).done(() => {
					console.log(`[Evaluator] Renamed session ${this.selectedSession} with ${this.sessionName}`)
				}).fail( () => {
					console.log(`[Evaluator] Failed to rename session ${this.selectedSession} with ${this.sessionName}`)
				}).always( () => {
					this.sessionName = null;
				});
			}
		},
		startStory() {
			this.storySettings[this.selectedStory].isRunning = null;

			$.ajax({
				method: "POST",
				url: `/stories/${this.selectedStory}/start`,
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify({
					countDown: this.storySettings[this.selectedStory].startSecondsCountDown
				})
			})
				.done( ( data, textStatus, jqXHR) => {
					this.storySettings[this.selectedStory].isRunning = true;
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
							this.storySettings[this.selectedStory].isRunning = true;
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
							this.storySettings[this.selectedStory].isRunning = false;
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
			this.storySettings[this.selectedStory].isRunning = null;

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
					this.storySettings[this.selectedStory].isRunning = false;
					this.resetSessions(this.selectedStory);
					this.oldLeaderboard = this.leaderboard;
				})
				.fail( ( jqXHR, textStatus, errorThrown ) => {
					switch ( jqXHR.status ) {
						case 405 : // method not allowed -> story already stopped
							this.storySettings[this.selectedStory].isRunning = false;
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
							this.storySettings[this.selectedStory].isRunning = true;
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
			if ( this.$te(`assets.mission.${missionId}.title`, this.locale) )
				return this.$t(`assets.mission.${missionId}.title`);
			else
				return this.$t("shared.label-unnamed-mission");
		},
		getActivityTitle( missionId, activityId ) {
			// TODO: read from story
			if ( this.$te(`assets.mission.${missionId}.activity.${activityId}.title`, this.locale) )
				return this.$t(`assets.mission.${missionId}.activity.${activityId}.title`);
			else
				return this.$t("shared.label-unnamed-activity");
		},
		updateActiveStories() {
			for (const session in this.sessions) {

				if (!(session in this.collapseData)) {
					this.$set(this.collapseData, session, { visible: false });
				}

				for (const story in this.sessions[session]) {

					if (!(story in this.activeStories)) {
						this.updateStoryLocale(story)
						this.$set(this.activeStories, story, []);
					}

					if (!(story in this.collapseData[session])) {
						this.$set(this.collapseData[session], story, {});
					}

					for (const mission in this.sessions[session][story]) {
						if (mission !== 'totalScore') {
							if (!this.activeStories[story].includes(mission)) {
								this.activeStories[story].push(mission);
							}

							if (!(mission in this.collapseData[session][story])) {
								this.$set(this.collapseData[session][story], mission, {visible: false});
							}
						}
					}
				}
			}
		},
		updateStoryLocale(story) {
			if ( story !== 'totalScore') {
				I18nUtils.fetchLocales(`/stories/` + story, getLanguagesArraySet())
				.then(response => {
					for (const locale in response) {
						this.$i18n.mergeLocaleMessage(locale, response[locale]);
					}
				})
			}
		},
		updateHumanEvaluationStatus() {
			let onStory, onMission, onActivity, maxTime;

			for ( const player in this.sessions ) {
				if ( !this.humanEvaluationData.hasOwnProperty( player ) ) {
					this.humanEvaluationData[player] = {
						requireHumanEvaluation: false,
						story: null,
						mission: null,
						activity: null,
					}
				}

				if ( this.humanEvaluationData[player].requireHumanEvaluation ) {

					onStory = this.humanEvaluationData[player].story;
					onMission = this.humanEvaluationData[player].mission;
					onActivity = this.humanEvaluationData[player].activity;

					if (this.sessions[player].hasOwnProperty(onStory)) {
						if (this.sessions[player][onStory].hasOwnProperty(onMission)) {
							if (this.sessions[player][onStory][onMission].hasOwnProperty(onActivity)) {
								if (!this.sessions[player][onStory][onMission][onActivity].hasOwnProperty('valueToEvaluate')) {
									this.humanEvaluationData[player].requireHumanEvaluation = false;
								}
							}
						}
					}
				}

				if ( !this.humanEvaluationData[player].requireHumanEvaluation ) {

					for (const story in this.sessions[player]) {
						for (const mission in this.sessions[player][story]) {
							for (const activity in this.sessions[player][story][mission]) {

								if (this.sessions[player][story][mission][activity].hasOwnProperty('valueToEvaluate')) {

									this.humanEvaluationData[player].requireHumanEvaluation = true;
									this.humanEvaluationData[player].story = story;
									this.humanEvaluationData[player].mission = mission;
									this.humanEvaluationData[player].activity = activity;

									this.$bvToast.toast(
											`${this.$t("shared.label-the-activity")} 
												${this.getActivityTitle( mission, activity )} 
												${this.$t("Evaluator.label-requires-human-evaluation")}`,
											{
												title: this.$t("Evaluator.label-human-evaluation-required"),
												appendToast: true,
												noAutoHide: true,
												variant: "danger"
											}
									)

								}
							}
						}
					}
				}
			}
		},
		updateStuckStatus() {
			let onStory, onMission, onActivity, maxTime;
			let currentTime, activityStartTime, difference, name;
			for ( const player in this.sessions ) {

				if ( !this.stuckData.hasOwnProperty( player ) ) {
					this.stuckData[player] = {
						stuck: false,
						story: null,
						mission: null,
						activity: null,
					}
				}

				if ( this.stuckData[player].stuck ) {

					onStory = this.stuckData[player].story;
					onMission = this.stuckData[player].mission;
					onActivity = this.stuckData[player].activity;

					if (this.sessions[player].hasOwnProperty(onStory)) {
						if (this.sessions[player][onStory].hasOwnProperty(onMission)) {
							if (this.sessions[player][onStory][onMission].hasOwnProperty(onActivity)) {
								if (this.sessions[player][onStory][onMission][onActivity].hasOwnProperty('end')) {
									this.stuckData[player].stuck = false;
								}
							}
						}
					}
				}

				if ( !this.stuckData[player].stuck ) {

					for (const story in this.sessions[player]) {
						for (const mission in this.sessions[player][story]) {
							for (const activity in this.sessions[player][story][mission]) {

								if (this.sessions[player][story][mission][activity].hasOwnProperty('start')) {
									if (!this.sessions[player][story][mission][activity].hasOwnProperty('end')) {

										currentTime = new Date();
										activityStartTime = new Date(this.sessions[player][story][mission][activity]['start']);
										difference = (currentTime - activityStartTime);

										if ( this.selectedStory in this.storySettings
											 && (difference > (this.storySettings[this.selectedStory].stuckTime * 60000))) {

											this.stuckData[player].stuck = true;
											this.stuckData[player].story = story;
											this.stuckData[player].mission = mission;
											this.stuckData[player].activity = activity;

											name = this.sessions[player].name ? this.sessions[player].name : player
											this.$bvToast.toast(
													`${name} ${this.$t("Evaluator.label-is-stuck")}` ,
													{
														title: this.$tc("Evaluator.label-player-status"),
														appendToast: true,
														noAutoHide: true,
														variant: "danger"
													}
											)
										}
									}
								}
							}
						}
					}
				}
			}
		},
		resetSessions( story ) {
			for ( const session in this.sessions ) {
				if ( story in this.sessions[session] ) {

					$.ajax({
						method: "post",
						url: `/player/log/${session}/reset/?story=${story}`
					});
				}
			}
		},
		updateSessions() {
				$.get( `/player/log` ).then( (response) => {
					this.sessions = response;
					this.updateActiveStories();
					this.updateStuckStatus();
					this.updateHumanEvaluationStatus();
				})
		},
		onSelectMission(story, mission) {
			this.selectedStory = story;
			this.selectedMission = mission;
		},
		fetchAll() {
			this.fetchStoryNames();
			this.updateSessions();
			this.fetchDataOfChats();
		},
		fetchStoryStatus() {
			for ( const story of this.storyNames ) {

				if ( !(story in this.storySettings) ) {
					this.$set( this.storySettings, story, {
						isRunning: false,
						startSecondsCountDown: 0,
						stuckTime: 5
					} )
				}

				$.get(`/stories/${story}/status`, {
					dataType: "json"
				}).done( (data) => {
					this.storySettings[story].isRunning = data.isActive;
				} ).fail( () => {
					console.log(`Failed to update the status of story ${story}`)
				})

			}
		},
		fetchStoryNames() {
			return $.get( "/stories/", {
				dataType: "json"
			})
				.done( (data) => {
					this.storyNames = data;
					this.fetchStoryStatus();
				})
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
		},
		isDataURLOfType( dataURL, type ) {
			return getMIMEFromDataURL(dataURL).startsWith(type);
		},
		getEvaluationText( valueToEvaluate ) {
			if ( valueToEvaluate.sourceType === 'value' ) {
				let typedValue = new TypedValue( valueToEvaluate.sourceValue );
				return `${this.$t('Evaluator.label-evaluate-the-activity-based-on-this-value')}: ${typedValue.toString()}`
			}
			else if ( valueToEvaluate.sourceType === 'variable' && valueToEvaluate.sourceValue === 'score' ) {
				return this.$t('Evaluator.label-evaluate-activity-based-on-total-score')
			}
		},
		getItemsForInputTable( object ) {
			let items = [];
			let requireHumanEvaluation = '';
			let valueToEvaluate = null;

			if ( 'valueToEvaluate' in object && object.valueToEvaluate.sourceType === 'variable' ) {
				valueToEvaluate = object.valueToEvaluate;
			}

			for (const objectKey in object.input) {
				requireHumanEvaluation = '';
				let typedValue = new TypedValue( object.input[objectKey] );
				if ( valueToEvaluate && valueToEvaluate.sourceValue === objectKey ) {
					requireHumanEvaluation = 'Evaluator.label-evaluate-the-activity-based-on-this-value'
				}
				items.push({
					variableName: objectKey,
					type: typedValue.type,
					value: typedValue.toString(),
					requireHumanEvaluation: requireHumanEvaluation
				});
			}
			return items;
		}
	},
	created() {

			this.isLoading = true;
			this.loadingInfoLocaleLabel = "shared.label-loading";

			console.log("[EvaluatorVM]", "Start downloading story");
			let promsInit = [
				I18nUtils.fetchLocales( "/shared/", getLanguagesArraySet() ),
				I18nUtils.fetchLocales( "./", getLanguagesArraySet() ),
			];

			this.loadingProgress = 0;
			let updateProgress = (percentage) => {
				this.loadingProgress = percentage;
			}
			this.readyPromise = allProgress(promsInit, updateProgress)
			.then((responses) => {
				let localesMessagesShared = responses[0];
				let localesMessagesEvaluator = responses[1];
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