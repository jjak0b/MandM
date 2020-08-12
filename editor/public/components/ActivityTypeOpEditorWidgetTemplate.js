export const template = `
 <div>
<div v-for="(localeLabel, key) in gametype" >
					<input type="radio" v-bind:id="'mode_'+key" v-bind:value="key" v-model="value.gamemode" name="'gamemode'" aria-describedby="gamemode-description">
					<label v-bind:for="'mode_' + key">{{ $t(localeLabel + '.label' ) }}</label>
				</div>
 
 
 
 </div> 
`