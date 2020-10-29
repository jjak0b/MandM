export const template =
		`
<div>
<section>
	<h4>{{ $t('UserWidgets.label-checkbox-settings') }}</h4>			
	<b-modal
		id="addCheckboxModal"
		v-bind:title="$t('shared.label-add-new-element')"
		v-bind:ok-title="$t('shared.label-save')"
		centered
		v-on:ok="addElement()">
		<i18n-input-widget
			tag="input"
			v-bind:label="$t('shared.label-add-element')"
			v-bind:locale="locale"
			v-bind:locale-label="localeLabel">
		</i18n-input-widget>
	</b-modal>				
		<b-row>
			<b-col>
				<b-form-group
					label-for="user-widget-checkbox-editor-preview"
					v-bind:label="$t('shared.label-preview')"
				>
					<user-widget-checkbox
						v-bind="props"
						v-bind:locale="locale"
						v-bind:localesList="localesList"
					></user-widget-checkbox>
				</b-form-group>
			</b-col>
			<b-col>	
				<list-widget
					v-bind:locale="locale"
					v-bind:localesList="localesList"
					v-bind:items="props.options"
					v-on:move-up="$emit('move-up', $event)"
					v-on:move-down="$emit('move-down', $event)"
					v-on:copy="$emit('copy', $event)"
					v-on:paste="$emit('paste', $event)"
					v-on:delete="$emit('delete', $event)"
					v-on:add="onAdd"
				></list-widget>
			</b-col>
		</b-row>
</section>
</div>
`