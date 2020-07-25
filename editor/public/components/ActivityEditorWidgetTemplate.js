export const template =
`<div>
	<input type="text" id="title-input">
	<label for="title-input"></label>
</div>`
;

export const component = {
	template: template
}
Vue.component( 'activity-editor-widget', component );