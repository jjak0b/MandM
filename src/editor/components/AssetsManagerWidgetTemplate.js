export const template =
`
<div>
	<b-tabs
		fill
	>
		<b-tab
			v-bind:title="$t('AssetsManager.label-locale')"
		>
			<section>
				<assets-manager-locale
					v-bind:data-story="currentStory"
				></assets-manager-locale>
			</section>
		</b-tab>
		<b-tab
			v-bind:title="$t('AssetsManager.label-server')"
		>		
			<section>
				<assets-manager-remote
				></assets-manager-remote>
			</section>
		</b-tab>
	</b-tabs>
</div>
`