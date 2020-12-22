export const template =
`
<div>
<b-tabs
	pills card end
	nav-wrapper-class="fixed-bottom"
>
	<b-tab title="Main" active>
		<main>
			<div
				v-if="isLoading"
				id="loading-container"
				class="d-flex align-items-center"
			>
				<div
					class="mx-auto w-75"
				>
					<div class="text-center" role="status" aria-live="polite">
						<h4
							id="player-loading-progressbar"
							v-t="loadingInfoLocaleLabel"
						></h4>
					</div>
					<b-progress
						:max="100"
						show-progress animated
						height="5vh"
					>
						<b-progress-bar
							:value="loadingProgress"
							aria-labelledby="player-loading-progressbar"
						>
							<span>{{ loadingProgress.toFixed( 1 ) }} %</span>
						</b-progress-bar>
					</b-progress>
				</div>
			</div>
			<player-viewport v-else
				:activity="player.current.activity"
				:player="player"
			>
			</player-viewport>
		</main>
	</b-tab>
	<b-tab title="Missions">
		<main>
			<h4>Missions</h4>
		</main>

	</b-tab>
	<b-tab title="Chat">
		<main>
			<h4>Chat</h4>
		</main>
	</b-tab>
</b-tabs>
</div>
`