export const template =
`<div>
	<b-form-file
		v-on:change="onFileload"
		accept="application/json"
		name="data"
	>
	</b-form-file>
	<a href="" v-on:click="updateStoryURI( $event )" class="btn">Download</a>
	<b-form
		v-on:submit.prevent="addStoryRemote"
	>
		<b-form-row>
			<b-col>
				<b-form-group
					label-for="story-editor-widget-form-create-input-name"
					v-bind:label="$t('StoryEditor.label-story-name')"
					v-bind:state="stateNewStory"
				>
					<template v-slot:description
					><h4>{{ $t('StoryEditor.label-create-new-story') }}</h4></template>
					<template v-slot:valid-feedback>
						<span v-t="'StoryEditor.label-valid-name-available'"></span>
					</template>
					<template v-slot:invalid-feedback
					>
						<span v-if="!tmpStory.name" v-t="'StoryEditor.label-invalid-name-is-required'"></span>
						<span v-else v-t="'StoryEditor.label-invalid-name-already-exists'"></span>
					</template>
					<b-form-input
						id="story-editor-widget-form-create-input-name"
						required="required"
						v-model="tmpStory.name"
						name="name"
					></b-form-input>
				</b-form-group>
			</b-col>
		</b-form-row>
		<input
			type="submit"
			class="btn btn-success"
		/>
	</b-form>
	<b-form
		v-on:submit.prevent
	>
		<b-form-group>
			<b-form-row>
				<b-col>
					<div v-for="(localeLabel, key) in gamemodes" >
						<input type="radio" v-bind:id="'mode_'+key" v-bind:value="key" v-model="value.gamemode" name="'gamemode'" aria-describedby="gamemode-description">
						<label v-bind:for="'mode_' + key">{{ $t(localeLabel + '.label' ) }}</label>
					</div>
				</b-col>
				<b-col id="gamemode-description">
					<p v-for="(localeLabel, key) in gamemodes" v-if="value.gamemode == key">{{ $t( localeLabel + '.description' ) }}</p>
				</b-col>
			</b-form-row>
		</b-form-group>
		<initial-inventory-widget-editor>
		</initial-inventory-widget-editor>
</div>
`
;
