import {template} from "./StoryEditorWidgetTemplate.js";
import {FormUtils} from "/shared//js/FormUtils.js";

export const component = {
	template: template,
	props: {
		value: Object // story Cache
	},
	data() {
		return {
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
		},
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
	methods: {
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
			.catch( (e) => {
				console.error("[StoryEditor]", "Failed to create new Story", "QUERY:", params, "body:", data );
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
		onFileload(event) {
			let self = this;
			let file = event.target.files[0];
			let errorMessage = "Input file type '" + file.type + "' is not valid ! \nPlease upload a valid JSON file type with '.json' extension";
			if( file.type !== 'application/json'){

				alert( errorMessage );
				console.error( errorMessage );

				// clear input tag
				event.target.value = "";
			}

			let reader = new FileReader();
			reader.onload = function (onLoadEvent) {
				try {
					let data = JSON.parse(onLoadEvent.target.result);
					self.load( data );
				}
				catch( exception ) {
					errorMessage = "Error reading input file type, please upload valid JSON";
					alert( errorMessage );
					console.error( errorMessage, exception );

					// clear input tag
					event.target.value = "";
				}
			};
			reader.readAsText( file );
		}
	}
}