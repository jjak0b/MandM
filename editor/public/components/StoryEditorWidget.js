import {template} from "./StoryEditorWidgetTemplate.js";

export const component = {
	template: template,
	props: {
		value: Object // story Cache
	},
	data() {
		return {
			gamemodes: {
				0 : "StoryEditorWidget.gamemodes.solo",
				1 : "StoryEditorWidget.gamemodes.group",
				2 : "StoryEditorWidget.gamemodes.class"
			}
		}
	},
	methods: {
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