export const template =
`
<b-form-group
	v-bind:label="$t('StyleEditorWidget.label-select-custom-stylesheet')"
	v-bind:label-for="'style-editor-widget-stylesheet-input-asset_' + $attrs.id"
	v-bind:description="$t('StyleEditorWidget.label-custom-stylesheet-description')"
>
	<b-input-group
		aria-atomic="true"
		class="my-3"
	>
		<b-input-group-prepend>
			<assets-manager-browser
				aria-controls="style-editor-widget-stylesheet-input-asset"
				ref="assetsBrowser"
				v-bind:id="'style-editor-widget-stylesheets-browser_' + $attrs.id"
				v-bind:value="value"
				v-on:input="tempAsset = $event"
				v-bind:button-only="true"
				v-bind:force-filter="['stylesheets']"
			>
			</assets-manager-browser>
		</b-input-group-prepend>
		<b-form-input
			v-bind:id="'style-editor-widget-stylesheet-input-asset_' + $attrs.id"
			v-bind:value="value ? value.toString() : null"
			readonly
		></b-form-input>
	</b-input-group>
</b-form-group>
`;