export const template =
`
<b-form>
	<b-form-group
		v-bind:label="$t('AssetsManager.label-select-asset')"
		label-for="assets-manager-widget-input-asset"
		v-bind:valid-feedback="validity.feedback.valid"
		v-bind:invalid-feedback="validity.feedback.invalid"
		v-bind:state="validity.state"
	>
		<b-input-group class="mt-3">
			<b-input-group-prepend>
				<assets-manager-browser
					ref="assetsBrowser"
					id="assets-manager-widget-browser-delete"
					aria-controls="assets-manager-widget-input-asset"
					v-model="selectedAsset"
					button-only="true"
				>
				</assets-manager-browser>
			</b-input-group-prepend>
			<b-form-input
				id="assets-manager-widget-input-asset"
				v-bind:value="selectedAsset"
				readonly
			></b-form-input>
		</b-input-group>
	</b-form-group>
	<b-button-group
		class="mb-2"
	>
		<b-button
			v-bind:disabled="!canDelete"
			v-on:click="deleteAsset"
			variant="danger"
			v-t="'shared.label-delete'"
		></b-button>
	</b-button-group>
	<b-alert
		class="mb-2"
		v-bind:show="operationAlert.isVisible"
		dismissible
		fade
		v-bind:variant="operationAlert.isError ? 'danger' : 'success'"
		v-on:dismissed="clearOperationStatus()"
	>
		<h4 class="alert-heading">{{ operationAlert.operationResult }}</h4>
		<p v-if="operationAlert.operationResultCause"
		>{{ operationAlert.operationResultCause }}</p>
		<div v-if="operationAlert.operationMessage"
			id="assets-manager-widget-operation-status-message"
		>
			<hr>
			<p class="mb-0">{{ operationAlert.operationMessage }}</p>
		</div>
		<div v-if="operationAlert.operationList && operationAlert.operationList.length">
			<p class="mb-0" >
				<b-list-group
					aria-describedby="assets-manager-widget-operation-status-message"
				>
					<b-list-group-item 
						v-for="(item, index) in operationAlert.operationList"
						v-bind:key="index"
						v-bind:variant="operationAlert.isError ? 'danger' : 'success'"
						class="d-flex justify-content-between align-items-center"
					>{{ item.key }}
						<b-badge v-if="item.value"
							v-bind:variant="operationAlert.isError ? 'danger' : 'success'"
							pill
						>{{ item.value }}</b-badge>
					</b-list-group-item>
				</b-list-group>
			</p>
		</div>
	</b-alert>
</b-form>
`