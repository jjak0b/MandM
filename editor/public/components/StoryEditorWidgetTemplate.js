export const template =
`<div>
	<b-form
		v-on:submit.prevent
	>
		<b-form-group
			v-bind:label="$t('StoryEditorWidget.label-gamemode')"
		>
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
	</b-form>
	<assets-manager
		v-bind:current-story="value"
	></assets-manager>
</div>`
;
