export const template =
`
<div>
	<b-form-row>
		<h3 v-t="'StoryEditorWidget.label-groups'"></h3>
	</b-form-row>
	<b-form-row>
		<b-button 
			class="ml-3 my-2"
			variant="primary"
			v-on:click="addGroup"
		>
			{{ $t('StoryEditorWidget.label-add-new-group') }}
		</b-button>
	</b-form-row>
	<b-form-row>
		<div v-for="(group, index) in groups">
			<list-widget	
				class="ml-3"
				v-bind:title="$t('StoryEditorWidget.label-group') + ' ' + (index+1)"
				v-bind:locale="locale"
				v-bind:localesList="localesList"
				v-bind:items="group"
				v-bind:copyPaste="false"
				v-bind:editable="false"
				variant="secondary"
				v-on:move-up="moveUp(index, $event)"
				v-on:move-down="moveDown(index, $event)"
				v-on:delete="deleteName(index, $event)"
				v-on:add="showModal(index)"
			></list-widget>	
			<b-link 
				class="float-right font-weight-bold text-decoration-none text-danger mr-2 mt-1 mb-3"
				v-on:click="removeGroup(index)"
			>
				{{ $t('shared.label-remove') }}
		</b-link>
		</div>
	</b-form-row>

	
	
	<b-modal
		id="groupsModal"
		v-bind:title="$t('MissionEditorWidget.label-add-new-mission')"
		v-bind:ok-title="$t('shared.label-save')"
		centered
		v-on:ok="add">
		<b-form-select v-model="selected">
			<b-form-select-option v-for="name in missionNames" v-bind:value="name">
				{{ $t(name) }}
			</b-form-select-option>
		</b-form-select>
	</b-modal>		
</div>		
`