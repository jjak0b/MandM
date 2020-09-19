export const template =
`
<a
	href=""
	v-on:click="updateStoryURI"
	v-t="'StoryEditor.label-export-story-as-file'"
	class="btn btn-primary align-self-center mx-auto"
	v-bind:class="!dataExport ? 'disabled' : null"
></a>
`