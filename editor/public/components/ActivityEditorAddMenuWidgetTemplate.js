export const template =
		`
<b-card no-body
	v-bind:header="menuTitle">
	<b-form v-on:submit.prevent="onSubmit">
		<b-tabs pills card vertical>
			<b-tab v-bind:title="treeTab">
				<b-form-row>
					<b-col>
						<b-form-group
							v-bind:label="nodeTypeLabel"
							label-for="selectNodeType">
							<b-form-radio-group 
								id="selectNodeType"
								v-model="selectedType"
								required>
									<b-form-group v-bind:description="typeTell" label-for="tell" v-if="shouldShowTypeInSelector( 'tell' )">
										<b-form-radio id="tell" value="tell" v-if="shouldShowTypeInSelector( 'tell' )">
											{{ $t('ActivityEditorWidget.treeNode-type.tell.label') }}
										</b-form-radio>
									</b-form-group>
									<b-form-group v-bind:description="typeQuest" label-for="quest" v-if="shouldShowTypeInSelector( 'quest' )">
										<b-form-radio id="quest" value="quest">
											{{ $t('ActivityEditorWidget.treeNode-type.quest.label') }}
										</b-form-radio>
									</b-form-group>
									<b-form-group v-bind:description="typeBranch" label-for="branch" v-if="shouldShowTypeInSelector( 'branch' )">
										<b-form-radio id="branch" value="branch">
											{{ $t('ActivityEditorWidget.treeNode-type.branch.label') }}
										</b-form-radio>
									</b-form-group>
							</b-form-radio-group>
						</b-form-group>
					</b-col>
					<b-col>
						<i18n-input-widget
							v-bind:label="nodeNameLabel"
							tag="input"
							id="nodeNameInput"
							v-bind:locale="locale"
							v-bind:locale-label="nodeName"
							v-bind:placeholder="nodeNamePlaceholder">
						</i18n-input-widget>
						<i18n-input-widget
							v-bind:label="nodeNoteLabel"
							tag="textarea"
							id="nodeNoteInput"
							v-bind:locale="locale"
							v-bind:locale-label="nodeNote">
						</i18n-input-widget>
					</b-col>
				</b-form-row>
				<b-form-row>
					<b-button-toolbar>
						<b-button class="mx-1" type="submit" variant="primary">
							{{ $t('shared.label-save') }}
						</b-button>
						<b-button type="reset" variant="danger">
							{{ $t('shared.label-reset') }}
						</b-button>
					</b-button-toolbar>
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
							v-bind:locale-label="activityTitle"
						></i18n-input-widget>
						<i18n-input-widget
							v-bind:label="activityDescriptionLabel"
							tag="textarea"
							id="activityDescriptionInput"
							v-bind:locale="locale"
							v-bind:locale-label="activityDescription"
						></i18n-input-widget>
					</b-col>
				</b-form-row>
				<b-form-row>
					<b-button-toolbar>
						<b-button class="mx-1" type="submit" variant="primary">
							{{ $t('shared.label-save') }}
						</b-button>
						<b-button type="reset" variant="danger">
							{{ $t('shared.label-reset') }}
						</b-button>
					</b-button-toolbar>
				</b-form-row>
			</b-tab>
			<b-tab v-bind:title="sceneTab" v-if="isType()">
				<scene-editor-widget
					v-bind:locale="locale"
					v-bind:nextAssetId="nextAssetId"
					v-bind:scene="tmpScene"
				></scene-editor-widget>
				<b-form-row>
					<b-button-toolbar>
						<b-button class="mx-1" type="submit" variant="primary">
							{{ $t('shared.label-save') }}
						</b-button>
						<b-button type="reset" variant="danger">
							{{ $t('shared.label-reset') }}
						</b-button>
					</b-button-toolbar>
				</b-form-row>
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
	</b-form>
</b-card>
`