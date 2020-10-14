export const template =
		`
<b-card no-body
	v-bind:header="menuTitle">
	<b-form v-on:submit.prevent="onSubmit">
		<b-tabs pills card vertical lazy>
			<b-tab v-bind:title="treeTab">
				<b-form-row>
					<b-col>
						<b-form-group
							v-bind:label="nodeNameLabel"
							label-for="nodeNameInput">
							<b-form-input
								id="nodeNameInput"
								v-model="nameValue">
							</b-form-input>
						</b-form-group>
						<b-form-group
							v-bind:label="nodeNoteLabel"
							label-for="nodeNoteInput">
							<b-form-textarea
								id="nodeNoteInput"
								v-model="noteValue">
							</b-form-textarea>
						</b-form-group>
					</b-col>
				</b-form-row>
			</b-tab>	
			<b-tab v-bind:title="activityTab">
				<b-form-row>
					<b-col>
						<i18n-input-widget
							v-bind:label="activityTitleLabel"
							tag="input"
							id="activityTitleInput"
							v-bind:locale="locale"
							v-bind:locale-label="activityTitle">
						</i18n-input-widget>
						<i18n-input-widget
							v-bind:label="activityDescriptionLabel"
							tag="textarea"
							id="activityDescriptionInput"
							v-bind:locale="locale"
							v-bind:locale-label="activityDescription">
						</i18n-input-widget>
					</b-col>
				</b-form-row>
			</b-tab>
			<b-tab v-bind:title="sceneTab" v-if="isType()">
				<scene-editor-widget
					v-bind:locale="locale"
					v-bind:nextAssetId="nextAssetId"
					v-bind:scene="currentNode.data.scene"
					v-bind:key="currentNode.data.scene"
				></scene-editor-widget>
			</b-tab>
			<b-tab v-bind:title="taleTab" v-if="isType(NodeUtils.Types.Tell)">
				<activity-tale-editor-widget>
				</activity-tale-editor-widget>
			</b-tab>
			<b-tab v-bind:title="questTab" v-if="isType(NodeUtils.Types.Quest)">
				<activity-quest-editor-widget>
				</activity-quest-editor-widget>
			</b-tab>
			<b-tab v-bind:title="branchTab" v-if="isType(NodeUtils.Types.Branch)">
				<branch-editor-widget>
				</branch-editor-widget>
			</b-tab>
		</b-tabs>
		<b-form-row class="mr-5 mb-3 float-right">
				<b-button-toolbar>
					<b-button class="mx-1" type="submit" variant="primary">
						{{ $t('shared.label-save') }}
					</b-button>
					<b-button type="reset" variant="danger">
						{{ $t('shared.label-reset') }}
					</b-button>
				</b-button-toolbar>
		</b-form-row>
	</b-form>
</b-card>
`