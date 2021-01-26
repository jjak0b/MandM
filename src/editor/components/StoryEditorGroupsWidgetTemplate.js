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
	<b-col>
	<b-card-group
		columns
		tag="ol"
	>
		<b-card
			tag="li"
			no-body
			v-for="(group, index) in groups"
		>
			<b-card-body>
				<div class="row">
					<div class="col">
						<list-widget
							id="story-editor-groups-widget-list-groups"
							v-bind:title="getGroupName( index )"
							v-bind:locale="locale"
							v-bind:localesList="localesList"
							v-bind:items="group"
							v-bind:copyPaste="false"
							v-bind:editable="false"
							v-bind:disable="true"
							variant="secondary"
							v-on:move-up="moveUpGroupMission(index, $event)"
							v-on:move-down="moveDownGroupMission(index, $event)"
							v-on:delete="deleteGroupMission(index, $event)"
							v-on:add="showModal(index)"
							v-on:enable="enableGroupMission(index, $event)"
						></list-widget>
					</div>
					<div class="col" aria-live="polite">
						<a
							v-if="public"
							v-bind:href="url + '&team=' + index"
							target="_blank"
							
						>
							<strong
								v-bind:id="'story-editor-widget-group-qr-' + index"
								class="flex-shrink-1 text-center"
							>{{ $t('StoryEditorWidget.label-use-this-link-or-scan-this-qrcode-to-play-as', { team: getGroupName( index ) } ) }}</strong>
							<div class="d-flex">
								<qrcode
									class="mx-auto"
									v-bind:aria-label="$t('shared.label-qr-code')"
									v-bind:value="url + '&team=' + index"
								></qrcode>
							</div>
						</a>
					</div>
				</div>
			</b-card-body>
			<b-card-footer>
				<b-link 
					class="float-right font-weight-bold text-decoration-none text-danger mr-2 mt-1 mb-3"
					v-on:click="removeGroup(index)"
				>
					{{ $t('shared.label-remove') }}
				</b-link>
			</b-card-footer>
		</b-card>
	</b-card-group>
	</b-col>
	</b-form-row>

	<b-modal
		id="groupsModal"
		v-bind:title="$t('MissionEditorWidget.label-add-new-mission')"
		v-bind:ok-title="$t('shared.label-save')"
		centered
		v-on:ok="addGroupMission">
		<b-form-select v-model="selected">
			<b-form-select-option 
				v-for="(mission, index) in missions" 
				v-bind:value="index">
				{{ $t(mission.title, locale) }}
			</b-form-select-option>
		</b-form-select>
	</b-modal>		
</div>		
`