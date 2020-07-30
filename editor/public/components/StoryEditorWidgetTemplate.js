export const template =
`<div>
	<form v-on:submit.prevent >
		<div class="row form-group">
			<div class="col">
				<input type="file" id="input-file" accept="application/json" v-on:change="onFileload($event)">
				<!--<label for="input-file"></label>-->
			</div>
			<div class="col">
				<a href="" v-on:click="updateStoryURI( $event )" class="btn">Download</a>
				<a download="test.png" target="_blank" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" class="btn">Download2</a>
			</div>
		</div>
		<div class="row form-group">
			<div class="col">
				<div v-for="(localeLabel, key) in gamemodes" >
					<input type="radio" v-bind:id="'mode_'+key" v-bind:value="key" v-model="value.gamemode" name="'gamemode'" aria-describedby="gamemode-description">
					<label v-bind:for="'mode_' + key">{{ $t(localeLabel + '.label' ) }}</label>
				</div>
			</div>
			<div class="col" id="gamemode-description">
				<p v-for="(localeLabel, key) in gamemodes" v-if="value.gamemode == key">{{ $t( localeLabel + '.description' ) }}</p>
			</div>
		</div>
	</form>
</div>`
;
