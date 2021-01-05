export const template =
		`
<div>
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
	<div v-else>
		

		<div class="h-100 position-fixed w-25" style="background-color: #4db6ac">
			<div class="py-2 px-3">
				<h1 class="font-weight-bold px-3">Evaluator</h1>
				<b-nav vertical>
					<div v-for="(storyArray, storyName) in activeStories">
						<b-nav-item
							v-b-toggle.coll>
							<h2 class="text-light" v-b-toggle="storyName">
								{{ storyName }}
								<b-icon-chevron-compact-down font-scale="0.9" variant="light"
								></b-icon-chevron-compact-down>
							</h2>	
							</b-nav-item>
						<b-collapse v-bind:id="storyName">
							<b-list-group class="text-dark">
								<b-list-group-item button 
									v-for="(missionId) in storyArray"
									v-on:click="onSelectMission(storyName, missionId)">
									{{ $t( 'assets.mission.' + missionId + '.' + 'title' ) }}
								</b-list-group-item>
							</b-list-group>
						</b-collapse>
					</div>
				</b-nav>
			</div>
		  </div>
		  <div style="margin-left: 25%">
		  	<b-container>
		  		<b-row>
		  			<div v-for="(sessionObject, sessionName) in sessions">
					<div v-for="(storyObject, storyName) in sessionObject">
					<div v-if="storyName === selectedStory">
					<div v-for="(missionObject, missionId) in storyObject">
						<b-col v-if="missionId === selectedMission">
							<b-card deck
								style="background-color: #00867d"
								class="mb-3 mt-5"
							>	
								<h4 style="font-weight: bold; color: #FFFFFF;">
									{{sessionName + ' '}}
									<span style="float: right">
										<b-icon-chat-fill></b-icon-chat-fill>
										<b-icon-alarm-fill></b-icon-alarm-fill>
										<b-icon-check-circle-fill></b-icon-check-circle-fill>
									</span>
								</h4>
							</b-card>
							<b-card deck
								v-for="(activityObject, activityId) in missionObject"
								border-variant="info"
								header-tag="b"
								v-bind:header="'assets.mission.' + missionId + '.activity.' + activityId + '.title'">
								<b-card-text>
									<b-row v-if="activityObject.start">
										<b-col>
										<p style="font-weight: bold;">{{ $t("Evaluator.label-start-time") }}</p>
										<p>{{ new Date(activityObject.start).toUTCString() }}</p>
										</b-col>
									</b-row>
									<b-row v-if="activityObject.end">
										<b-col>
										<p  style="font-weight: bold;">{{ $t("Evaluator.label-end-time") }}</p>
										<p>{{ new Date(activityObject.end).toUTCString() }}</p>
										</b-col>
									</b-row>
									<b-row v-if="activityObject.input">
										<b-col>
										<p  style="font-weight: bold;">{{ $t("Evaluator.label-input") }}</p>
										<p>{{ activityObject.input }}</p>
										</b-col>
									</b-row>
								</b-card-text>
							</b-card>
						</b-col>
					</div>
					</div>
					</div>
					</div>
				</b-row>
			</b-container>
		  </div>

	</div>
</div>
`