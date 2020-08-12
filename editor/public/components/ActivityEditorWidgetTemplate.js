export const template =
`<div>
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
				v-bind:target="value"
				v-bind:locale="locale"
				v-on:select="load"
				v-on:input="updateTree"
			></activity-tree-widget>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<form v-on:submit.prevent="save()" v-on:input="$refs.treeView.redraw()">
				<div class="form-row">
					<div class="col-2 align-self-center">
						<span class="form-group btn-group-vertical" role="group">
							<button
								type="button"
								class="form-control btn btn-primary btn-block"
								v-on:click="onAdd()" 
								v-bind:disabled="typeToAdd == null"
							>{{ $t( 'shared.label-add' ) }}</button>
							<button
								type="button"
								class="form-control btn btn-secondary btn-block"
								v-on:click="onDuplicate()"
								v-bind:disabled="value == null || !isActivity()"
							>{{ $t( 'shared.label-duplicate' ) }}</button>
							<button
								type="button"
								class="form-control btn btn-danger btn-block"
								v-on:click="onRemove()"
								v-bind:disabled="value == null || !isActivity()"
							>{{ $t( 'shared.label-remove' ) }}</button>
						</span>
					</div>
					<div class="col-10">
						<fieldset class="form-group">
							<legend>{{ $t( "ActivityEditorWidget.label-select-nodeType" ) }}</legend>
							<div v-for="(localeLabel, type) in nodeTypes" class="form-check" v-if="shouldShowTypeInSelector( type )">
								<input
									type="radio"
									class="form-check-input"
									name="activityType"
									v-bind:id="'activity-type_' + type"
									v-bind:value="type"
									v-model="typeToAdd"
									v-bind:aria-describedby="'activityType-description_' + type"
								/>
								<label
									class="form-check-label"
									v-bind:for="'activity-type_' + type"
								>{{ $t(localeLabel + '.label' ) }}</label>
								<p
									v-bind:id="'activityType-description_' + type"
								>{{ $t( localeLabel + '.description' ) }}</p>
							</div>
						</fieldset>
					</div>
				</div>
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
									v-bind:disabled="false"
									v-bind:locale="locale"
									v-bind:locale-label="localeTitle"
									v-bind:placeholder="(value && value.type && value.type != NodeUtils.Types.Root ) ?
															$t('shared.label-new-element',
																{ 'name': $tc( NodeUtils.getRoleDescriptionLabelByType( value.type ) ) }
															)
															: null"
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
									v-bind:disabled="!mission"
									v-bind:locale="locale"
									v-bind:locale-label="localeDescription"
								></i18n-input-widget>
							</div>
						</fieldset>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>`
;
