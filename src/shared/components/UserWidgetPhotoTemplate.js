export const template =
`
<form
	ref="form"
	@submit.prevent
	@reset.stop
>
<input
	ref="input"
	type="file"
	v-bind="Object.assign( {}, $props, realAttrs )"
	v-bind:class="classes"
	v-bind:tabindex="tabindex"
	v-on:change.stop="onFileChange"
>
<b-modal
	v-bind:return-focus="$refs.input"
	v-bind:id="previewID"
	scrollable
	v-bind:title="$t('shared.label-preview')"
	v-bind:ok-title="$t('shared.label-confirm')"
	v-on:ok="confirm()"
	v-on:cancel="remove()"
	v-on:close="remove()"
	v-on:hidden="onModalHidden()"
	v-bind:cancel-title="$t('shared.label-abort')"
	v-bind:body-class="[ 'd-flex', 'justify-content-center' ]"
	centered
>
	<img
		v-if="accept =='image/*'"
		v-bind:src="mediaSelected"
		v-bind:alt="$t('shared.label-preview')"
	/>
	<audio
		v-else-if="accept =='audio/*'"
		controls="controls"
		v-bind:src="mediaSelected"
	>
		<!-- if format is not supported -->
		<a
			v-bind:href="mediaSelected"
			target="_blank"
			download="download"
		>{{ $t('shared.label-preview') }}</a>
	</audio>
	<video
		v-else-if="accept =='video/*'"
		controls="controls"
		v-bind:src="mediaSelected"
	>
		<!-- if format is not supported -->
		<a
			v-bind:href="mediaSelected"
			target="_blank"
			download="download"
		>{{ $t('shared.label-preview') }}</a>
	</video>
</b-modal>
</form>
`;