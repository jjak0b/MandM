export const template =
`
<a
	href=""
	v-on:click="updateStoryURI"
	v-t="'StoryEditorWidget.label-download-story'"
	class="btn btn-primary align-self-center mx-auto"
	v-bind:class="!dataExport ? 'disabled' : null"
></a>
`