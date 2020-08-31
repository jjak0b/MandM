export const template =
`
<div>
	<div class="row">
		<div class="col-3">
			<p id="activityTreeDescription" v-if="mission != null">{{ $t( "ActivityEditorWidget.label-mission-activity-tree-of") }}
			<i18n-input-widget
				v-bind:tag="'label'"
				v-bind:locale="locale"
				v-bind:locale-label="mission.title"> 
			</i18n-input-widget>
			</p>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<activity-tree-widget
				aria-describedby="activityTreeDescription"
				ref="treeView"
				v-if="mission != null"
				v-bind:locale="locale"
				v-model="currentNode"
				v-on:selectedNode="onSelectedNode"
			></activity-tree-widget>
		</div>
	</div>
	<div v-if="showActivityForm" >
		<div>
			<form v-on:submit.prevent="onSubmit" id="activityForm">
				<div class="form-row">
					<div class="col-10" v-if="isAddFormVisible">
						<fieldset class="form-group">
							<legend>{{ $t( "ActivityEditorWidget.label-select-nodeType" ) }}</legend>
							<div v-for="(localeLabel, type) in nodeTypes" class="form-check" v-if="shouldShowTypeInSelector( type )">
								<input
									type="radio"
									required="required"
									class="form-check-input"
									name="node-type"
									v-model="selectedType"
									v-bind:id="'node-type_' + type"
									v-bind:value="type"
									v-bind:aria-describedby="'description_node-type' + type"
								/>
								<label
									class="form-check-label"
									v-bind:for="'node-type_' + type"
								>{{ $t(localeLabel + '.label' ) }}</label>
								<p
									v-bind:id="'description_node-type' + type"
								>{{ $t( localeLabel + '.description' ) }}</p>
							</div>
						</fieldset>
					</div>
					<div class="col-2 align-self-center">
						<span class="form-group btn-group-vertical" role="group">
							<input
								type="submit"
								class="form-control btn btn-primary btn-block"
							/>{{ $t( 'shared.label-add' ) }}
							<input
								type="reset"
								class="form-control btn btn-primary btn-block"
							/>
						</span>
					</div>
				</div>
				<div class="form-row">
					<div class="col">
						<fieldset class="form-group">
							<legend> {{ $t( 'ActivityEditorWidget.label-node-item-name' ) }} </legend>
							<input
								id="node-name"
								name="node-name"
								type="text"
								required="required"
								class="form-control"
								v-bind:value="nodeName"
							/>
						</fieldset>
					</div>
				</div>
				<div class="form-row">
					<div class="col">
						<fieldset class="form-group">
							<legend> {{ $t( 'ActivityEditorWidget.label-node-item-description' ) }} </legend>
							<textarea
								id="node-note"
								name="node-note"
								rows="4"
								class="form-control"
								v-bind:value="nodeNote"
							textarea/>
						</fieldset>
					</div>
				</div>
			</form>
		</div>
		<div>
			<hr>
			<div class="form-row">
				<div class="col">
					<fieldset class="form-group">
						<legend> {{ $t( 'ActivityEditorWidget.label-activity-title' ) }} </legend>
						<div class="form-check">
							<i18n-input-widget
								v-bind:tag="'input'"
								id="activity-title"
								name="activityTitle"
								type="text"
								required="required"
								class="form-control"
								v-bind:locale="locale"
								v-bind:locale-label="activityTitle"
							></i18n-input-widget>
						</div>
					</fieldset>
				</div>
				<div class="col">
					<fieldset class="form-group">
						<legend>{{ $t( 'ActivityEditorWidget.label-activity-description' ) }}</legend>
						<div>
							<i18n-input-widget
								v-bind:tag="'textarea'"
								id="activity-description"
								name="activityDescription"
								class="form-control"
								rows="4"
								v-bind:locale="locale"
								v-bind:locale-label="activityDescription"
							></i18n-input-widget>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
		<hr>
		<section v-if="checkType()">
			<p>QUEST or TELL</p>
			<scene-editor-widget
				v-bind:locale="locale"
				v-bind:nextAssetId="nextAssetId"
			></scene-editor-widget>
		</section>
	<section v-if="checkType(NodeUtils.Types.Tell)">
			<p>TELL</p>
			<activity-tale-editor-widget
			></activity-tale-editor-widget>
		</section>
		<section v-if="checkType(NodeUtils.Types.Quest)">
			<p>QUEST</p>
			<activity-quest-editor-widget
			></activity-quest-editor-widget>
		</section>
		<section v-if="checkType(NodeUtils.Types.Branch)">
			<p>BRANCH</p>
			<branch-editor-widget
			></branch-editor-widget>
		</section>
	</div>
</div>
`;
