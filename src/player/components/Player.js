import {i18n} from "../../shared/js/i18n.js";
import Player from	"../js/Player.js"
import Story from "../../shared/js/Story.js";
import {CacheSystem} from "../../shared/js/CacheSystem.js";
import {I18nUtils} from "../../shared/js/I18nUtils.js";
import {template} from "./PlayerTemplate.js";
import {component as playerViewport} from "./PlayerViewport.js";
import {component as playerChatWidget} from "./PlayerChatWidget.js";
import {clock, wait} from "../../shared/js/Timers.js";

export const component = {
	el: '#main',
	template: template,
	i18n: i18n,
	components: {
		playerChatWidget,
		playerViewport
	},
	data() {
		return {
			player: Player.getInstance(),
			cacheSystem: null,
			loadingProgress: 0,
			loadingInfoLocaleLabel: "shared.label-loading",
			errorMessage: null,
			isLoading: false,
			/**
			 * @type Promise
			 */
			readyPromise: null,
			locale: i18n.locale,
			selectedPage: 0,
			storyStatus: {
				isActive: false,
				startTime: null,
			},
			startGame: {
				startGameDeferred: new $.Deferred(),
				isRunning: false,
				secondsCountDown: -1,
				timerTimeoutHandler: null,
				timerIntervalHandler: null
			},
			fetchTimeout: 5 * 1000,
			fetchAllIntervalHandler: null,
			timerLoopHandler: null,
		}
	},
	computed: {
		isGameStarted() {
			// startGameDeferred is not reactive, so use also isActive to update this computed
			return this.storyStatus.isActive && this.startGame.isRunning && this.startGame.startGameDeferred.state() === "resolved";
		},
		shouldShowWaiting() {
			return !this.isGameStarted && this.startGame.secondsCountDown < 0;
		},
		shouldShowCountDown() {
			return !this.isGameStarted && this.startGame.secondsCountDown > 0;
		},
		startingSecondsRemaining() {
			if( this.storyStatus.startTime ) {
				let timeDiff = Date.parse( this.storyStatus.startTime ) - Date.now();
				return Math.floor( timeDiff / 1000 );
			}
			else {
				return null;
			}
		}
	},
	created() {
		this.isLoading = true;

		let url = new URL( window.location.href );
		let storyName = url.searchParams.get( "story" );
		let team = url.searchParams.get("team");

		console.log( "[PlayerVM]", "Start downloading story" );
		let promsInit = [
			this.player.init( storyName, team ),
			this.player.fetchStory(),
			I18nUtils.fetchLocales( "/shared/", [ i18n.locale, i18n.fallbackLocale ] ),
			I18nUtils.fetchLocales( "./", [ i18n.locale, i18n.fallbackLocale ] ),
		];
		let updateProgress = (percentage) => {
			this.loadingProgress = percentage;
		}

		this.readyPromise = new Promise( (resolveReady, rejectReady) => {
			// assets depends on the result of system init promise
			let dependenciesPromise = new Promise( (resolveDependencies, rejectDependencies) => {
				// the system init promise handler
				let promisePlayer = new Promise( (resolvePlayer, rejectPlayer ) => {

					this.loadingProgress = 0;
					this.loadingInfoLocaleLabel = "shared.label-loading";
					allProgress( promsInit, updateProgress )
						.then( (responses) => {

							let resultLoadPlayer = responses[0];
							let resultFetchStory = responses[1];
							let localesMessagesShared = responses[ 2 ];
							let localesMessagesPlayer = responses[ 3 ];

							console.log( "[PlayerVM]", "Story and System fetch complete" );
							console.log( "[PlayerVM]", "Init i18n messages for current locale and fallback" );

							for (const locale in localesMessagesShared) {
								this.$i18n.mergeLocaleMessage( locale, localesMessagesShared[ locale ] );
							}

							for (const locale in localesMessagesPlayer) {
								this.$i18n.mergeLocaleMessage( locale, localesMessagesPlayer[ locale ] );
							}

							this.cacheSystem = new CacheSystem();
							this.cacheSystem.init()
								.then( () => {
									console.log( "[PLayer VM] Init cache system successfully" );
								})
								.catch( (error) => {
									console.warn( "[PLayer VM] Unable to init cache system", "continue with offline cache unavailable,", "reason:", error );
								})
								// Fetch story's dependencies
								.finally( resolvePlayer );
						})
						.catch(( error ) => { // handle error specific of Player
							if( error && error instanceof Error ) {
								if( error.message === "NO_STORY") {
									this.errorMessage = "Player.errors.label-no-story"
								}
								else if( error.message === "FORBIDDEN_STORY") {
									this.errorMessage = "Player.errors.label-story-forbidden"
								}
								else if( error.message === "INVALID_STORY") {
									this.errorMessage = "Player.errors.label-story-not-found"
								}
							}
							console.error( "[PLayer VM] Unable to init system, reason:", error );
							rejectPlayer( error );
						});
				});

				promisePlayer
					.then( (responses) => {
						console.log( "[PlayerVM]", "Start downloading story assets" );

						let promisesDependencies = [
							I18nUtils.fetchLocales( "" + this.player.storyURL, [ i18n.locale, i18n.fallbackLocale ] )
						];
						promisesDependencies = promisesDependencies.concat( this.player.fetchAssets() );

						this.loadingProgress = 0;
						this.loadingInfoLocaleLabel = "Player.label-loading-resources";
						resolveDependencies(
							allProgress( promisesDependencies, updateProgress )
						);
					})
					.catch( rejectDependencies )
			});

			dependenciesPromise
			.then( (responses) => {

				// From here we have all stuffs we need to run the story

				let localesMessagesAuthored = responses[ 0 ];
				for (const locale in localesMessagesAuthored) {
					this.$i18n.mergeLocaleMessage( locale, localesMessagesAuthored[ locale ] );
				}

				console.log( "[PlayerVM]", "story assets download complete" );
				// Init custom stylesheet for the story
				if( this.player.story.style ) {
					let head = document.getElementsByTagName('head')[0];

					// add stylesheet URL
					if( this.player.story.style.assets && this.player.story.style.assets.length ) {
						console.log( "[PlayerVM]", "Init custom file stylesheets" );
						for (let i = 0; i < this.player.story.style.assets.length; i++) {
							let asset = this.player.story.style.assets[ i ];

							let link = document.createElement('link');
							link.setAttribute( "id", "author-stylesheet-" + i );
							link.setAttribute('rel', 'stylesheet');
							link.setAttribute('type', 'text/css');
							link.setAttribute('href', asset.getURL() );
							head.appendChild(link);
						}
					}

					// write into style tag the custom CSS rules
					if( this.player.story.style.rules && this.player.story.style.rules.length > 0 ) {
						console.log( "[PlayerVM]", "Init custom stylesheet content" );
						let styleElement = document.createElement( "style");
						styleElement.setAttribute( "id", "author-style");
						let content = "\n";
						for (const styleRule of this.player.story.style.rules ) {
							content += styleRule.toString() + "\n";
						}
						styleElement.innerHTML = content;
						head.appendChild(styleElement);
					}
				}
				return Promise.resolve();
			})
			.then( () => {
				let promise = new Promise( (resolve) => {
					this.loadingProgress = 100;
					setTimeout( () => this.$nextTick( () => {
						this.isLoading = false;
						console.log( "[PlayerVM]", "story install complete" );
						// just let finish the loading animation
						resolve();
					}),1000 );
				})
					.then( resolveReady )
			})
			.catch( (error) => {
				this.$bvToast.toast(
					this.$t("Player.errors.label-unable-to-load-resources"),
					{
						title: this.$t("Player.errors.label-error"),
						appendToast: true,
						noAutoHide: true,
						variant: "danger"
					}
				)
				console.error( "[PlayerVM]", "Unable to fetch assets", error );
				rejectReady(error);
			});
		});
	},
	mounted() {
		this.readyPromise
			.then( () => {
				this.initStory()
					.then( () => {
						this.fetchAll();
						this.fetchAllIntervalHandler = setInterval( this.fetchAll, this.fetchTimeout );
						this.startGame.startGameDeferred
							.done( () => {
								this.player.startStory();
							})
							.fail( (error) => {
								console.error( "[PlayerVM]", "Unable to start story, reason:", error );
							})
					})
					.catch( (error) => {
						console.error( "[PlayerVM]", "Unable to init story, reason:", error );
					})
			})
			.catch((error) => {
				console.error( "[PlayerVM]", "Unable to init Player with story, reason:", error );
			});
	},
	beforeDestroy() {
		clearInterval( this.fetchAllIntervalHandler );
	},
	methods: {
		fetchAll() {
			return Promise.all([
				this.fetchStoryStatus()
			])
		},
		fetchStoryStatus() {
			if( !this.player.story || !this.player.storyURL ) return;

			return $.get( {
				url: `${this.player.storyURL}/status`,
				dataType: "json",
			})
				.done( ( newStoryStatus, textStatus, jqXHR) => {

					let shouldTryToStartGame = false;
					// if startTime are different
					if( !(this.storyStatus.startTime === newStoryStatus.startTime && this.storyStatus.isActive && newStoryStatus.isActive ) ) {
						// interrupt any running timer
						if( this.startGame.timerTimeoutHandler ) {
							clearTimeout( this.startGame.timerTimeoutHandler );
							this.startGame.timerTimeoutHandler = null;
						}
						if( this.startGame.timerIntervalHandler ) {
							clearInterval(this.startGame.timerIntervalHandler );
							this.startGame.timerIntervalHandler = null;
						}
						this.$set(this.startGame, "secondsCountDown", -1 );
						shouldTryToStartGame = true;
					}
					let timeData = getSecondsAndOffset(Date.now(), Date.parse(newStoryStatus.startTime));


					if( newStoryStatus.isActive ) {
						// start countdown if not started yet
						if( shouldTryToStartGame && this.startGame.startGameDeferred.state() !== "resolved" ) {
							let timeData = getSecondsAndOffset(Date.now(), Date.parse(newStoryStatus.startTime));

							// wait less than a second
							if (timeData[0] > 0 && timeData[1] > 0) {
								this.$set(this.startGame, "secondsCountDown", timeData[0]);
								this.startGame.timerTimeoutHandler = setTimeout(this.startCountDown, timeData[1], timeData[0], this.setGameAsRunning );
							}
							else if (timeData[0] > 0) {
								this.$set(this.startGame, "secondsCountDown", timeData[0]);
								this.startCountDown(timeData[0], this.setGameAsRunning );
							}
							else {
								console.log( "[PLayerVM]", "Game already started", "run immediately" );
								this.startCountDown( 0, this.setGameAsRunning );
							}
						}
					}
					else {
						// end story if already started
						if( this.storyStatus.isActive && this.startGame.startGameDeferred.state() === "resolved" ) {
							this.endStoryManually();
						}
					}
					// update status
					this.storyStatus = Object.assign( {}, this.storyStatus, newStoryStatus );
				})
				.catch( error => {
					console.error( "[PLayerVM]", "Unable to fetch story status", "cause:", error );
				})
		},
		startCountDown( seconds, callback ) {
			if( this.startGame.timerTimeoutHandler ) {
				clearTimeout( this.startGame.timerTimeoutHandler )
				this.startGame.timerTimeoutHandler = null;
			}
			if( seconds > 0 ) {
				this.$set(this.startGame, "secondsCountDown", seconds);
				console.log( "[PLayerVM]", "Game will start in", seconds, "seconds" );
				this.startGame.timerIntervalHandler = clock(
					seconds,
					(secondsLeft) => {
						this.$set(this.startGame, "secondsCountDown", secondsLeft);
					},
					callback
				);
			}
			else {
				if( callback ) callback();
			}
		},
		initStory() {
			try {
				this.player.initStory( this.player.story );
				return Promise.resolve();
			}
			catch (/*Error*/error) {
				let message;
				switch (error.message) {
					case "NO_TEAM":
						message = "Player.errors.label-no-team";
						break;
					case "INVALID_TEAM":
						message = "Player.errors.label-invalid-team";
						break;
				}
				if( message )
					this.errorMessage = message;
				console.error( "[PlayerVM]", "Catched exception", error );
				return Promise.reject( error );
			}
		},
		setGameAsRunning() {
			this.startGame.timerIntervalHandler = null;
			if( this.startGame.startGameDeferred.state() === "pending" ) {
				this.startGame.startGameDeferred.resolve();
			}
			this.$set( this.startGame, "isRunning", true );
		},
		endStoryManually() {

		}
	}
}

function getSecondsAndOffset( startTime, endTime ) {
	let diffTime = endTime - startTime;
	let seconds = Math.floor( diffTime / 1000 );
	let timeOffset = diffTime - (seconds * 1000);

	return [ seconds, timeOffset ];
}

function allProgress(proms, progress_cb) {
	let d = 0;
	progress_cb(0);
	for (const p of proms) {
		p.then(()=> {
			d ++;
			progress_cb( 100 * (d / proms.length ) );
		})
		.catch( (error) => {
			console.warn( "Promise of progress failed", error );
		});
	}
	return Promise.all(proms);
}