export const template =
`
<div>
	<b-tabs
		fill
	>
		<b-tab
			v-bind:title="$t('AssetsManager.label-locale')"
		>
			
		</b-tab>
		<b-tab
			v-bind:title="$t('AssetsManager.label-server')"
		>
		
			<section>
				<assets-manager-operation>
				</assets-manager-operation>
			</section>
			<section>
				<assets-manager-browser
					force-filter="['audio', 'captions']"
				>
				</assets-manager-browser>
			</section>
		</b-tab>
	</b-tabs>
</div>
`