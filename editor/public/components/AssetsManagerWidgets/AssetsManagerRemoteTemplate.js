export const template =
`
<div>
	<b-tabs fill>
		<b-tab
			v-bind:title="$t('shared.label-upload')"
		>
			<assets-manager-upload-form
				v-bind:asset-names="cache.assetNames"
				v-on:fetch="fetchRemoteAssets()"
			></assets-manager-upload-form>
		</b-tab>
		<b-tab
			v-bind:title="$t('shared.label-edit')"
		>
			<assets-manager-edit-form
				v-on:fetch="fetchRemoteAssets()"
			></assets-manager-edit-form>
		</b-tab>
	</b-tabs>
</div>
`;