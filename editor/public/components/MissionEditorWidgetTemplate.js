export const template =
`<div>
	<label for="title-input">{{ titleLabel }}</label><input type="text" id="title-input">
</div>`
;
var localization = {};
export var component = null;

$.get( `/editor/localization/${navigator.language || navigator.browserLanguage}.json`)
.then( ( data )=> {
	localization = data["mission-editor"];
	console.log( localization  );
	component = {
		template: template,
		props: {
			"title-label" : String
		},

	}
	Vue.component( 'mission-editor-widget', component );
});



