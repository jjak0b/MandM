export const template =
`
<div class="h-100">
<b-tabs
	v-if="isGameStarted"
	pills card
	content-class="flex-grow-1 overflow-auto"
	justified
	class="h-100 d-flex flex-column-reverse"
	v-model="selectedPage"
>
	<b-tab
		:title="$t('Player.label-main')"
		active
		class="h-100"
		id="player-main"
	>
		<main class="h-100">
			<player-viewport
				:current-activity="player.current.activity"
				:player="player"
			>
			</player-viewport>
		</main>
	</b-tab>
	<b-tab
		id="player-info"
		:title="$t('Player.label-info')"
		class="h-100"
	>
		<main class="h-100">
			<section
				class="container"
			>
				<div class="row">
					<div class="col">
						<h1
							id="player-info-title"
							class="text-center"
							v-if="missionTitle"
						>{{ missionTitle }}</h1>
						<p
							id="player-info-description"
							class="lead text-justify"
							v-if="missionDescription"
						>{{ missionDescription }}</p>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<h2
							id="player-info-subtitle"
							class="text-center"
							v-if="activityTitle"
						>{{ activityTitle }}</h2>
						<p
							id="player-info-subdescription"
							class="lead text-justify"
							v-if="activityDescription"
						>{{ activityDescription }}</p>
					</div>
				</div>
			</section>
		</main>

	</b-tab>
	<b-tab
		id="player-chat"
		:title="$t('Player.label-help')"
		class="h-100"
	>
		<main class="h-100">
			<player-chat-widget
				ref="chat"
				v-bind:enable-notifications="selectedPage !== 2"
			></player-chat-widget>
		</main>
	</b-tab>
</b-tabs>
<div
	v-else-if="isLoading || errorMessage"
	id="loading-container"
	class="h-100 d-flex align-items-center"
>
	<div
		class="mx-auto w-75"
	>
		<b-alert
			v-bind:show="!!errorMessage"
			variant="danger"
			class="text-center"
			aria-live="assertive"
		>
			<h1
				v-t="errorMessage"
			></h1>
		</b-alert>
		<div class="text-center" role="status" aria-live="polite">
			<h4
				id="player-loading-progressbar"
		>{{ $t( loadingInfoLocaleLabel ) }}</h4>
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
<div
	v-else
	id="waiting-container"
	class="h-100 d-flex justify-content-center align-items-center"
>
	<div
		style="width: 50vmin;height: 50vmin;"
	>
		<div class="h-100 d-flex position-relative">
			<div class="m-auto text-center text-break p-1">
				<div>
					<div
						v-if="shouldShowCountDown"
					>
						<h1
							id="player-countdown-message"
						>{{ $tc('Player.label-game-will-start-in') }}</h1>
						<div
						
						>
							<output
								v-bind:aria-live="startGame.secondsCountDown % 5 == 0 ? 'polite' : 'off'"
								role="timer"
								aria-atomic="true"
								id="player-countdown"
								dir="auto"
								aria-labelledby="player-countdown-message"
								style="font-size: xx-large"
							><span>{{ startGame.secondsCountDown }}</span></output>
						</div>
					</div>
					<div
						role="status"
						aria-live="polite"
						v-else-if="shouldShowWaiting"
					>
						<h1
							v-t="'Player.label-waiting-game-start'"
						></h1>
					</div>
				</div>
			</div>
			<div
				class="position-absolute"
				style="left: 0px; right: 0px; top: 0px; bottom: 0px"
			>
				<b-spinner
					style="width: 100%; height: 100%"
				>
				</b-spinner>
			</div>
		</div>
	</div>
<!--
	<div
		class="mx-auto w-75 d-flex justify-content-center align-items-center"
	>
		<div style="width: min-content">
			<div class="d-flex justify-content-center align-items-center">
				<div class="position-absolute m-2">
					<div role="status" aria-live="polite">
						<h1
						>{{ $t( loadingInfoLocaleLabel ) }}
						</h1>
						<h1
							style="font-size: 100%"
							aria-atomic="true"
							role="timer"
							aria-live="polite"
						>{{ startingSecondsRemaining }}</h1>
					</div>
				</div>
				<b-spinner
					style="width: 50vw; height: 50vw"
				>
				</b-spinner>
			</div>
		</div>
	</div>
	-->
</div>
</div>
`