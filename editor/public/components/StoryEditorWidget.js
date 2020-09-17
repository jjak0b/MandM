import {template} from "./StoryEditorWidgetTemplate.js";
import {FormUtils} from "/shared//js/FormUtils.js";

export const component = {
	template: template,
	props: {
		value: Object // story Cache
	},
	data() {
		return {
			formImport: {
				data: null,
				isLoading: false,
				file: null,
				remoteName: null,
				validityFile: null,
				validityRemoteName: null,
			},
			remoteStories: null, // names
			delayForNextRemoteRequest: 5000,
			tmpStory: {
				name: null,
				nameChecked: null,
				isAvailable: null
			},
			gamemodes: {
				0 : "StoryEditorWidget.gamemodes.solo",
				1 : "StoryEditorWidget.gamemodes.group",
				2 : "StoryEditorWidget.gamemodes.class"
			}
		}
	},
	computed: {
		stateNewStory() {
			if( this.tmpStory.name ) {
				return this.isStoryNameAvailable;
			}
			return false;
		},
		isStoryNameAvailable() {
			if( !this.tmpStory.name ) {
				return false;
			}
			// if remoteStories is not defined is because server couldn't be reached
			this.tmpStory.isAvailable = this.remoteStories ? !this.remoteStories.includes( this.tmpStory.name ) : null;
			return this.tmpStory.isAvailable;
		}
	},
	beforeMount() {
		let self = this;
		function keepFetch() {
			self.getRemoteStoryNames()
				.catch( (e) => {
					console.error( "[StoryEditor]", "Unable getting remote story names");
					setTimeout( keepFetch, self.delayForNextRemoteRequest )
				});
		}
		keepFetch();
	},
	watch: {
		"formImport.remoteName": function (name) {
			this.formImport.validityRemoteName = null;
		},
		"formImport.file" : function (file) {
			this.formImport.validityFile = null;
			if( file ) {
				let self = this;
				this.formImport.isLoading = true; // start loading spinner
				this.getJSONFromFile( this.formImport.file )
					.then( (jsonData) => {
						self.formImport.validityFile = true;
						console.log( "[StoryEditor]", jsonData );
						self.formImport.data = jsonData;
					})
					.catch( (error) => {
						self.formImport.validityFile = false;

						console.error( "[StoryEditor]", "Error importing JSON file:", error );
					})
					.finally( () => {
						self.formImport.isLoading = false; // stop loading spinner
					});
			}
		}
	},
	methods: {
		onFormImportSubmit( event ) {
			let shouldStopPropagation = true;
			if( this.formImport.file ) {
				// file is valid so can be loaded
				if( this.formImport.validityFile ) {
					shouldStopPropagation = false;
					let data = this.formImport.data;

					this.load( data );
				}
			}
			else if( this.formImport.remoteName ) {
				shouldStopPropagation = false;
				let self = this;
				this.formImport.isLoading = true; // start loading spinner
				this.formImport.validityRemoteName = null; // while downloading reset it
				this.getJSONFromRemote( this.formImport.remoteName )
					// file has been downloaded so can be loaded
					.done( (jsonData) => {
						self.formImport.validityRemoteName = true;
						self.load( jsonData );
					})
					// file can't be downloaded for some reason so report it
					.fail( ( xhr, textStatus, error) => {
						self.formImport.validityRemoteName = false;
						console.error( "[StoryEditor]", `Error downloading story "${self.formImport.remoteName}"`, "cause:", error );
					})
					.always( () => {
						self.formImport.isLoading = false; // stop loading spinner
					});
			}

			if( shouldStopPropagation ) {
				event.stopPropagation();
			}
		},
		onFormImportReset( event ) {
			this.formImport.file = null;
			this.formImport.remoteName = null;
			this.formImport.validityFile = null;
			this.formImport.validityRemoteName = null;
			this.formImport.data = null;
		},
		addStoryRemote( event ) {
			if( this.stateNewStory === false ){
				event.stopPropagation();
				return;
			}
			let data = this.value;
			let params = FormUtils.getAssociativeArray( $( event.target ).serializeArray() );
			$.ajax( `/stories/${params.name}`, {
				method: "put",
				contentType: 'application/json',
				data: JSON.stringify( data )
			})
			.fail( ( xhr, textStatus, error) => {
				console.error("[StoryEditor]", `Failed to create new Story ${params.name}`, error );
			});
		},
		getRemoteStoryNames() {
			let self = this;
			return $.get( `/stories/` )
				.then(names => {
					if( names ) self.remoteStories = names;
				});
		},
		notifyValue( type, value ) {
			this.$emit( type, value );
		},
		updateStoryURI( event ){
			let a = event.target;
			a.href= null;
			a.download = null;
			a.type = null;
			if( !this.value ) return event.preventDefault();

			a.type = 'text/json'
			let data = a.type + ";charset=utf-8," + encodeURIComponent( JSON.stringify( this.value ) );
			a.href = 'data:' + data;
			a.download = 'Story.json';

		},
		load( data ) {
			let keys = Object.keys(data);
			for( let i = 0; i < keys.length; i++ ){
				Vue.set( this.value, keys[i], data[ keys[i]] );
			}
		},
		getJSONFromFile( file ) {
			let self = this;
			return new Promise( function (resolve, reject) {
			if( file.type !== 'application/json') {
				reject( `Input file type "${file.type}" is not valid ! \nPlease upload a valid JSON file type with '.json' extension` );
				return;
			}
			let reader = new FileReader();
			reader.onload = function (onLoadEvent) {
				try {
					resolve( JSON.parse(onLoadEvent.target.result) );
				}
				catch( exception ) {
					reject( exception );
				}
			};
			reader.readAsText( file );
			});
		},
		getJSONFromRemote( name ) {
			return $.get( `/stories/${name}` );
		}
	}
}