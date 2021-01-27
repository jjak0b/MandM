export const template =
`<b-tabs
	fill
>
	<b-tab
		id="utility-section-widget-qr-generator-section"
		v-bind:title="$t('UtilitySectionWidget.label-qr-code-generator')"
	>
		<section
			aria-labelledby="utility-section-widget-qr-generator-section"
		>
			<qr-code-generator-widget
				v-bind:value="value.qrCodes"
			></qr-code-generator-widget>
		</section>
	</b-tab>
</b-tabs>
`;