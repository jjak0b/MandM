export const template =
`
<div class="accordion" role="tablist">
<b-card no-body class="mb-1">
	<b-card-header
		header-tag="header"
		class="p-1"
		role="tab"
	>
		<b-button
			block
			v-b-toggle.assets-manager-remote-accordion-upload
			variant="info"
		>{{ $t('shared.label-upload') }}</b-button>
	</b-card-header>
	<b-collapse
		id="assets-manager-remote-accordion-upload"
		accordion="assets-manager-operations"
		role="tabpanel"
	>
		<b-card-body>
			<b-card-text>
				<assets-manager-upload-form
					v-bind:asset-names="cache.assetNames"
					v-on:fetch="fetchRemoteAssets()"
				></assets-manager-upload-form>
			</b-card-text>
		</b-card-body>
	</b-collapse>
</b-card>
<b-card no-body class="mb-1">
	<b-card-header
		header-tag="header"
		class="p-1"
		role="tab"
	>
		<b-button
			block
			v-b-toggle.assets-manager-remote-accordion-edit
			variant="info"
		>{{ $t('shared.label-edit') }}</b-button>
	</b-card-header>
	<b-collapse
		id="assets-manager-remote-accordion-edit"
		accordion="assets-manager-operations"
		role="tabpanel"
	>
		<b-card-body>
			<b-card-text>
				<assets-manager-edit-form
					v-on:fetch="fetchRemoteAssets()"
				></assets-manager-edit-form>
			</b-card-text>
		</b-card-body>
	</b-collapse>
</b-card>
</div>
`