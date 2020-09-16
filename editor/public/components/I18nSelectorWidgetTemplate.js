export const template =
`<form>
	<div class="form-group">
		<label for="i18n-list">{{ $t( 'I18nSelectorWidget.label-i18n-select' ) }}</label>
		<select id="i18n-list" class="form-control" v-model="globalLocaleSelected">
			<option v-for="(lang, code) in globalLocalesList" v-bind:value="code">{{ lang.englishName }} [ {{code}} ]</option>
		</select>
		<button type="button" v-on:click="add()" class="form-control btn btn-primary">{{ $t( 'shared.label-add' ) }}</button>
	</div>
	<div class="form-group">
		<label for="locale">{{ $t( 'I18nSelectorWidget.label-locale-select' ) }}</label>
		<select id="locale" class="form-control" v-bind:value="value" v-on:change="notifyValue( $event.target.value )">
			<option value="" disabled="disabled" selected="selected" v-t="'shared.label-select-option'"></option>
			<option v-for="(lang, code) in localesList" v-bind:value="code" >{{ lang.englishName }} [ {{code}} ]</option>
		</select>
	</div>
</form>
`