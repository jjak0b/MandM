export const template =
`
<div>
<b-form-row>
	<b-col>
		<label for="i18n-list">{{ $t( 'I18nSelectorWidget.label-i18n-select' ) }}</label>
		<b-form-row>
			<b-col>
				<b-form-select id="i18n-list" v-model="globalLocaleSelected">
					<b-form-select-option
						v-for="(lang, code) in globalLocalesList"
						v-bind:value="code">
							{{ lang.englishName }} [ {{code}} ]
					</b-form-select-option>
				</b-form-select>
			</b-col>
			<b-col>
				<b-button type="button" v-on:click="add()" variant="secondary">{{ $t( 'shared.label-add' ) }}</b-button>
			</b-col>
		</b-form-row>
	</b-col>
	<b-col>
		<label for="editor-content-locale">{{ $t( 'I18nSelectorWidget.label-locale-select') }}</label>
		<b-form-select
			id="editor-content-locale"
			v-bind:value="locale"
			v-on:input="$emit('set-locale', $event)"
		>
			<b-form-select-option
					v-for="code in localesList"
					v-bind:value="code">
				{{ I18nUtils.i18nCodes[ code ].englishName }} [ {{code}} ]
			</b-form-select-option>
		</b-form-select>
	</b-col>
</b-form-row>
</div>
`