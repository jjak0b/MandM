import {template} from "./StoryEditorWidgetTemplate.js";
import { I18nUtils } from "../../shared/js/I18nUtils.js";
import { component as missionEditorComponent } from "./MissionEditorWidget.js";
import { component as storyGroupsComponent } from "./StoryEditorGroupsWidget.js";
import Story from "../../shared/js/Story.js";
import {Asset} from "../../shared/js/Asset.js";
import {asyncLoad as asyncLoadComponentI18nSelectorWidget} from "./i18nWidgets/I18nSelectorWidget.js";

export const component = {
	template: template,
	props: {
		locale: String,
		localesList: Array,
		value: Object, // story Cache
		stories: Array,
		names: Array,
		mission: Object,
		copiedMission: Object
	},
	components: {
		'i18n-selector-widget': asyncLoadComponentI18nSelectorWidget,
		'mission-editor-widget': missionEditorComponent,
		'story-groups-widget': storyGroupsComponent,
	},
	watch: {
		selectedName: function ( newVal, oldVal ) {
			// when the selected story changes, load the story from the local change if present,
			// else load the story from server
			if (newVal) {
				this.selectMission(null);

				if( this.loading ) {
					this.loading = false;
				}
				else if( this.loading === false ) {
					this.loading = undefined;
				}

				if ( this.stories.some( story => story.name === newVal ) ) {
					console.log("[StoryEditor]", `Loading the Story ${newVal} from local cache`);
					this.$emit('change-story', newVal);
				}
				else {
					this.getStoryFromServer( this.selectedName )
						.then( (story) => {
							if( !this.stories.some( localStoryName => localStoryName.name === story.name ) ) {
								this.$emit('add-local-story', story);
								// here user could change the selected story, so load only if current atb it's the same
								if( this.selectedName === story.name ) {
									this.$emit("change-story", story.name);
								}
							}
						})
				}
			}
		}
	},
	computed: {
		selectedName: function () { return (this.tabValue > -1) ? this.names[this.tabValue] : null },
		playStoryURL: function () { return this.value && this.value.name ? encodeURI(`${window.location.protocol}//${window.location.host}/player/?story=${this.value.name}`) : "Error"; }
	},
	data() {
		return {
			I18nUtils: I18nUtils,
			loading: null,
			operationLoading: undefined,
			tabValue: -1,
			newStory: new Story( null ),
			newStoryLocale: navigator.language,
			newStoryForm: {
				name: {
					state: null
				}
			},
			gamemodes: {
				0 : "StoryEditorWidget.gamemodes.solo",
				1 : "StoryEditorWidget.gamemodes.group",
				2 : "StoryEditorWidget.gamemodes.class"
			},
			ages: {
				0 : "StoryEditorWidget.ages.7_to_10",
				1 : "StoryEditorWidget.ages.11_to_14",
				2 : "StoryEditorWidget.ages.15_to_18"
			}
		}
	},
	methods: {
		updateStoryOnServer() {
			this.startOperation();

			this.value.dependencies.locales = I18nUtils.getRootMessages(this.$i18n, "assets" );
			// load to the server the instance of the story present in the local cache
			this.putStoryOnServer( this.value )
				.then( () => {
					this.endOperation( this.$t('shared.label-save'), true );
				})
				.catch( () => {
					this.endOperation( this.$t('shared.label-save'), false );
				})
				.finally( () => setTimeout( this.clearOperation, 30000 ) );
		},
		startOperation() {
			this.operationLoading = true;
		},
		endOperation( title, isSuccess ) {
			let content = isSuccess ? this.$t("shared.status.label-operation-success") : this.$t("shared.status.label-operation-failed");
			this.$bvToast.toast(content, {
				title: title,
				autoHideDelay: 5000,
				appendToast: true,
				isStatus: !!isSuccess,
				variant: isSuccess ? "success" : "danger"
			});
			this.operationLoading = isSuccess ? false : null;
		},
		clearOperation() {
			if( !this.operationLoading ) {
				this.operationLoading = undefined;
			}
		},
		reloadStoryFromServer() {
			// delete story instance from local cache and reload the instance on the server
			this.startOperation();
			let name = this.value.name;
			this.getStoryFromServer(this.value.name)
				.then( (story) => {
					if ( this.stories.some( story => story.name === name ) ) {
						this.$emit('delete-local-story', name);
					}
					this.$emit('add-local-story', story);

					// here user can change the selected story, so load only if it's the same
					if( this.selectedName === story.name ) {
						this.$emit('import', story);
					}

					this.endOperation( this.$t('StoryEditorWidget.label-reload-from-server'), true );
				})
				.catch( () => {
					this.endOperation( this.$t('StoryEditorWidget.label-reload-from-server'), false );
				})
				.finally( () => setTimeout( this.clearOperation, 30000 ) );
		},
		deleteStory() {
			this.startOperation();
			// delete story from server and from local cache
			let name = this.value.name;
			if ( this.stories.some( story => story.name === name ) ) {
				$.ajax( `/stories/${name}`, {
					method: "DELETE"
				})
					.then ( (data) => {
						this.$emit('delete-local-story', name);
						console.log("[StoryEditor]", `Deleted the Story ${name}`);
						this.endOperation( this.$t('shared.label-delete'), true );
					})
					.catch( ( error) => {
						console.log("[StoryEditor]", `Failed to delete the Story ${name}`, error );
						this.endOperation( this.$t('shared.label-delete'), false );
					})
					.always( () => {
						this.$emit("update-names");
						setTimeout( this.clearOperation, 30000 );
					});
			}
		},
		putStoryOnServer( storyData ) {
			return new Promise( (resolve, reject) => {

				let locales = storyData.dependencies.locales;
				// prevent to save locales as dependency data
				storyData.dependencies.locales = null;
				let storyContent = JSON.stringify( storyData );
				storyData.dependencies.locales = locales;

				let storyUrl = `/stories/${storyData.name}`
				let promiseStory = $.ajax( storyUrl, {
					method: "put",
					contentType: 'application/json',
					data: storyContent
				});

				promiseStory
					.then( response => {
						return Object.keys( locales )
							.map( (lang) => {
								return $.ajax( storyUrl + `/locales/${lang}`, {
									method: "put",
									contentType: 'application/json',
									data: JSON.stringify( locales[ lang ] )
								})
							});
					})
					.then( ( promisesLocales ) => {
						return Promise.all( promisesLocales );
					})
					.then( resolve )
					.catch( (error) => {
						console.log("[StoryEditor]", `Failed to add or update the Story ${storyData.name}`, error );
						reject( error );
					});
			});
		},
		getStoryFromServer( name ) {
			this.loading = true;
			let reqJSONStory = $.get( `/stories/${name}?source=editor` );
			let reqJSONLocales = I18nUtils.fetchLocales( `/stories/${name}`, "*" );

			return Promise.all( [reqJSONStory, reqJSONLocales] )
			// file has been downloaded so can be loaded
			.then( (jsonData) => {

				let story = new Story( jsonData[0] );
				let locales = jsonData[1];

				story.dependencies.locales = locales;
				console.log("[StoryEditor]", `Fetched the Story ${name} from server`);
				this.loading = false;
				return story;
			})
			// file can't be downloaded for some reason so report it
			.catch( ( error) => {
				this.tabValue = -1;
				this.loading = undefined;
				console.error( "[StoryEditor]", `Error loading the Story "${name}" from server`, "cause:", error );
			})
		},
		resetModal(){
			this.newStory = new Story(null);
			Object.keys( this.newStoryForm ).forEach( (name) => this.newStoryForm[ name ].state = null );
		},
		onOkModal( event ) {
			event.preventDefault();
			// this.onModalSubmit();
			this.$refs.newStoryFormSubmit.click();
		},
		onModalSubmit(event){
			let formValidity = event.target.checkValidity();

			// Save the new story on server and local cache if a story
			// with the same name doesn't already exists
			let dataExport = this.newStory;

			this.newStoryForm.name.state = !this.names.includes(dataExport.name);

			dataExport.dependencies.locales = {};
			// init story with the locale provided
			dataExport.dependencies.locales[ this.newStoryLocale ] = { "assets" : {} };

			if ( !formValidity || Object.keys( this.newStoryForm ).some( (name) => !this.newStoryForm[ name ].state ) ) {
				return;
			}

			this.startOperation();
			this.putStoryOnServer( dataExport )
			.then( () => {
				this.$emit( 'add-local-story', dataExport );
				this.endOperation( this.$t('StoryEditorWidget.label-add-new-story'), true );
			})
			.catch( () => {
				this.endOperation( this.$t('StoryEditorWidget.label-add-new-story'), false );
			})
			.finally( () => {
				this.$bvModal.hide('addModal');
				this.resetModal();
				this.$emit("update-names");
				setTimeout( this.clearOperation, 30000 );
			});
		},
		showDupModal() {
			this.$bvModal.show('duplicateModal');
		},
		onOkDupModal( event ) {
			event.preventDefault();
			this.$refs.duplicateStoryFormSubmit.click();
		},
		onDupModalSubmit(event){
			this.newStoryForm.name.state = !this.names.includes( this.newStory.name );
			if (this.names.includes( this.newStory.name ) ) {
				console.error(this.newStory.name," already exists");
				this.endOperation( this.$t('shared.label-duplicate'), false );
				setTimeout( this.clearOperation, 10000 );
				return
			}

			let dataExport = new Story( this.value );

			let i18nTupleList = [];

			// disable temporarily asset adding callback
			let callbackBackup = Asset.getDuplicateCallback( Asset.name );
			Asset.setDuplicateCallback( Asset.name, undefined );

			dataExport = dataExport.duplicate( i18nTupleList );

			// re-enable asset adding callback
			Asset.setDuplicateCallback( Asset.name, callbackBackup );

			let localesCopy = I18nUtils.copyOldLabelsToNewLabels( this.$i18n.messages, i18nTupleList );
			dataExport.name = this.newStory.name;
			dataExport.dependencies.locales = localesCopy;

			this.startOperation();
			this.putStoryOnServer( dataExport )
				.then( () => {
					this.$emit( 'add-local-story', dataExport );
					this.endOperation( this.$t('shared.label-duplicate'), true );
				})
				.catch( () => {
					this.endOperation( this.$t('shared.label-duplicate'), false );
				})
			.finally( () => {
				this.$bvModal.hide('duplicateModal');
				this.resetModal();
				this.$emit("update-names");
				setTimeout( this.clearOperation, 30000 );
			});
		},
		selectMission( index ) {
			this.$emit('select-mission', index);
		},
		copyMission( mission ) {
			this.$emit('copy-mission', mission);
		}
	},
}