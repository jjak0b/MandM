export const template =
`
<div class="h-100">
<b-tabs
	v-if="!isLoading"
	pills card end
	nav-wrapper-class="sticky-bottom"
	content-class="flex-grow-1"
	class="h-100 d-flex flex-column"
>
	<b-tab title="Main" active
		class="h-100"
	>
		<main class="h-100">
			<player-viewport
				:activity="player.current.activity"
				:player="player"
			>
			</player-viewport>
		</main>
	</b-tab>
	<b-tab title="Missions"
		class="h-100"
	>
		<main class="h-100">
			<h4>Missions</h4>
		</main>

	</b-tab>
	<b-tab title="Chat"
		class="h-100"
	>
		<main class="h-100">
			<player-chat-widget ref="chat">
			</player-chat-widget>
		</main>
	</b-tab>
</b-tabs>
<div
	v-else
	id="loading-container"
	class="h-100 d-flex align-items-center"
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
</div>
`