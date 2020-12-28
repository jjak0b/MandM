export const template =
		`
<div>
<section>
	<b-modal
		hide-footer
		id="addElementModal"
		v-bind:title="$t('shared.label-add-new-element')"
		centered>
			<b-form ref="form" v-on:submit.stop.prevent="addElement">
				<b-form-group>
					<i18n-input-widget
						id="addListElement"
						tag="input"
						v-bind:label="$t('shared.label-text')"
						v-bind:locale="locale"
						v-bind:locale-label="label">
					</i18n-input-widget>
					<typed-value v-model="value">
					</typed-value>
				</b-form-group>
				<div class="float-right">
				<b-button variant="danger" v-on:click="$bvModal.hide('addElementModal')">
				{{ $t('shared.label-close') }}</b-button>
				<b-button type="submit" variant="primary">{{ $t('shared.label-save') }}</b-button>
				</div>
			</b-form>
	</b-modal>		
		
				
	<h4>{{ $t('UserWidgets.label-select-settings') }}</h4>			
	<b-row>
		<b-col>
			<b-form-group
				label-for="user-widget-select-editor-preview"
				v-bind:label="$t('shared.label-preview')"
			>
			  <user-widget-list
				v-bind="component.props"
				v-bind:name="component.name"
				v-bind:locale="locale"
				v-bind:locales-list="localesList">
			  </user-widget-list>
			</b-form-group>
		</b-col>
		<b-col>	
			<list-widget
				v-bind:title="$t('shared.label-elements-list')"
				v-bind:locale="locale"
				v-bind:localesList="localesList"
				v-bind:items="component.props.options"
				v-on:move-up="moveUpListElement($event)"
				v-on:move-down="moveDownListElement($event)"
				v-on:copy="copyListElement($event)"
				v-on:paste="pasteListElement($event)"
				v-on:delete="removeElement($event)"
				v-on:add="onAdd"
			></list-widget>
		</b-col>
	</b-row>
</section>
</div>
`