export const template =
		`
<b-modal 
	id="addMenu"
	v-bind:title="menuTitle"
	v-bind:ok-title="saveLabel"
	centered
	v-on:show="resetModal"
	v-on:hidden="resetModal"
	v-on:ok="onOk">
	<b-form v-on:submit.prevent="onSubmit" ref="form">
		<b-form-row>
			<b-col>
				<b-form-group
					v-bind:label="nodeTypeLabel"
					label-for="selectNodeType"
					v-bind:state="state"
					v-bind:invalid-feedback="invalidFeedback"
					v-bind:valid-feedback="validFeedback">
					<b-form-radio-group 
						id="selectNodeType"
						v-model="selectedType"
						v-bind:state="state"
						required
						v-on:change="onSelect">
							<b-form-group v-bind:description="typeTell" label-for="tell" v-if="shouldShowTypeInSelector( 'tell' )">
								<b-form-radio id="tell" name="type" value="tell">
									{{ $t('ActivityEditorWidget.treeNode-type.tell.label') }}
								</b-form-radio>
							</b-form-group>
							<b-form-group v-bind:description="typeQuest" label-for="quest" v-if="shouldShowTypeInSelector( 'quest' )">
								<b-form-radio id="quest" name="type" value="quest">
									{{ $t('ActivityEditorWidget.treeNode-type.quest.label') }}
								</b-form-radio>
							</b-form-group>
							<b-form-group v-bind:description="typeBranch" label-for="branch" v-if="shouldShowTypeInSelector( 'branch' )">
								<b-form-radio id="branch" name="type" value="branch">
									{{ $t('ActivityEditorWidget.treeNode-type.branch.label') }}
								</b-form-radio>
							</b-form-group>
					</b-form-radio-group>
				</b-form-group>
			</b-col>
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
	</b-form>
</b-modal>
`