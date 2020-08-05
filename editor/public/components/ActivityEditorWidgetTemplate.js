export const template =
`<div>
	<div class="row">
		<div class="col-3">
			<label>{{ $t( 'shared.label-activity' ) }}:</label>
			<i18n-input-widget
				v-if="mission != null"
				v-bind:tag="'label'"
				v-bind:locale="locale"
				v-bind:locale-label="mission.title"> 
			</i18n-input-widget>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<activity-tree-widget
				v-if="mission != null"
				v-model="mission.tree"
				v-bind:target="value"
				v-bind:locale="locale"
			></activity-tree-widget>
		</div>
		<div class="col">
			<form v-on:submit.prevent="save()" >
				<div class="row no-gutters">
					<div class="col-3">
						<div class="form-group btn-group-vertical" role="group">
							<button
								type="button"
								class="form-control btn btn-primary btn-block"
								v-on:click="add()" 
								v-bind:disabled="value == null"
							>{{ $t( 'shared.label-add' ) }}</button>
							<button
								type="button"
								class="form-control btn btn-secondary btn-block"
								v-on:click="duplicate()"
								v-bind:disabled="value == null || isRoot()"
							>{{ $t( 'shared.label-duplicate' ) }}</button>
							<button
								type="button"
								class="form-control btn btn-danger btn-block"
								v-on:click="remove()"
								v-bind:disabled="value == null || isRoot()"
							>{{ $t( 'shared.label-remove' ) }}</button>
						</div>
					</div>
					<div class="col-9">
						<div class="form-group">
							<label for="activity-title">{{ $t( 'ActivityEditorWidget.label-activity-title' ) }}</label>
							<i18n-input-widget
								v-bind:tag="'input'"
								id="activity-title"
								name="activityTitle"
								type="text"
								required="required"
								class="form-control"
								v-bind:disabled="mission ? true : false"
								v-bind:locale="locale"
								v-bind:locale-label="localeTitle"></i18n-input-widget>
						</div>
						<div class="form-group">
							<label for="activity-description"">{{ $t( 'ActivityEditorWidget.label-activity-description' ) }}</label>
							<i18n-input-widget
								v-bind:tag="'textarea'"
								id="activity-description"
								name="activityDescription"
								class="form-control"
								rows="4"
								v-bind:disabled="mission ? true : false"
								v-bind:locale="locale"
								v-bind:locale-label="localeDescription"></i18n-input-widget>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>`
;
