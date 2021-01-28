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
		<b-navbar toggleable type="light" variant="light">
			<b-navbar-toggle
				target="sidebar-stories"
			></b-navbar-toggle>
	
			<b-sidebar
				id="sidebar-stories"
				:title="$t('shared.label-story')"
				shadow
				role="navigation"
				:backdrop="true"
			>
				<b-nav
					vertical
					class="accordion"
					role="menu"
				>
					<b-card
						v-for="(storyName) in storyNames"
						no-body
						class="mb-1"
						tag="li"
						role="menuitem"
					>
						<b-button
							block
							v-b-toggle:[encodeURIComponent(storyName)]
							v-b-toggle.sidebar-stories
							v-on:click="onSelectMission(storyName)"
							variant="info"
						>{{ storyName }}</b-button>
						<!--
						<b-collapse
							v-bind:id="encodeURIComponent(storyName)"
							accordion="story"
						>
							<b-list-group
								class="text-dark"
								role="menu"
							>
								<b-list-group-item
									role="menuitem"
									v-for="(missionId) in storyArray"
									button 
									v-on:click="onSelectMission(storyName, missionId)"
									v-b-toggle.sidebar-stories
								>{{ getMissionTitle( missionId ) }}</b-list-group-item>
							</b-list-group>
	
						</b-collapse>
						-->
					</b-card>
				</b-nav>
			</b-sidebar>
		</b-navbar>
		<main>
			<b-breadcrumb>
				<b-breadcrumb-item
					v-if="selectedStory"
				>
					{{ selectedStory }}
				</b-breadcrumb-item>
				<b-breadcrumb-item
					v-if="selectedMission"
				>
					{{ getMissionTitle( selectedMission ) }}
				</b-breadcrumb-item>
			</b-breadcrumb>
			<b-container>
				<b-row v-if="selectedStory && Object.keys(leaderboard).length !== 0">
					<b-col>
						<b-card no-body>
							<b-card-header v-b-toggle="'story-leaderboard'">
								<h3 v-t="'Evaluator.label-story-leaderboard'"></h3>
							</b-card-header>
							<b-collapse id="story-leaderboard">
								<b-card-body>
									<b-table 
										striped hover 
										v-bind:items="leaderboard"
										v-bind:fields="leaderboardFields"
										sort-by="totalScore"
										v-bind:sort-desc="true"
      								>
									</b-table>
								</b-card-body>
							</b-collapse>
						</b-card>
					</b-col>
				</b-row>
				<b-row v-if="selectedStory">
					<b-col>
						<b-card
							no-body
						>
							<b-card-header
								v-b-toggle="'story-settings'"
							>
								<h3 v-t="'Evaluator.label-story-settings'"></h3>
							</b-card-header>
							<b-collapse id="story-settings">
								<b-card-body>
									<div>
										<b-form-group
											label-for="evaluator-story-start-countdown"
											v-bind:label="$t('Evaluator.label-story-countdown')"
										>
											<div class="row">
												<div class="col d-flex">
													<div class="m-auto">
														<b-form-spinbutton
															id="evaluator-story-start-countdown"
															v-bind:disabled="globalStorySettings.isRunning"
															v-model="globalStorySettings.startSecondsCountDown"
															min="0"
															class="mb-2"
														></b-form-spinbutton>
													</div>
												</div>
												<div class="col text-center">
													<b-button-group
														vertical
														class="mb-2"
													>
														<b-button
															id="evaluator-story-control-start-story"
															v-on:click="startStory()"	
															v-bind:disabled="globalStorySettings.isRunning === true"
														>
															<b-icon
																icon="play"
															></b-icon>
															{{ $t('Evaluator.label-start-story') }}
														</b-button>
														<b-button
															id="evaluator-story-control-end-story"
															v-on:click="stopStory()"
															v-bind:disabled="globalStorySettings.isRunning === false"
														>
															<b-icon
																icon="stop"
															></b-icon>
															{{ $t('Evaluator.label-end-story') }}
														</b-button>
													</b-button-group>
												</div>
											</div>
										</b-form-group>	
										<b-form-group
											label-for="evaluator-player-stuck-notification-time"
												v-bind:label="$t('Evaluator.label-player-stuck-notification-time')"
											v-bind:description="$t('Evaluator.label-player-stuck-notification-time-description')"
										>
											<div class="row">
												<div class="col-6 d-flex">
													<div class="m-auto">
														<b-form-spinbutton
																id="evaluator-player-stuck-notification-time"
																v-bind:disabled="globalStorySettings.isRunning"
																v-model="globalStorySettings.stuckTime"
																min="0"
																class="mb-2"
														></b-form-spinbutton>
													</div>
												</div>
											</div>
										</b-form-group>
									</div>
								</b-card-body>
							</b-collapse>
						</b-card>
					</b-col>
				</b-row>
				<b-row v-if="selectedStory">
					<b-col>
						<b-card-group
							deck
						>
							<template v-for="(sessionObject, sessionName) in sessions">
							<b-card
								v-if="sessionObject[selectedStory]"
								no-body
								style="height: max-content"
							>
								<b-card-header class="clearfix">
									<b-row>
										<b-col
											sm="auto"
											md="8"
										>
											<b-row>
												<b-col cols="6">
													<b-card-title
														v-b-toggle="'player-accordion-' + sessionName"
						
													>{{ sessionObject.name ? sessionObject.name : sessionName }}
													</b-card-title>
												</b-col>
												<b-col>
													<span>
														<strong>{{ $t('Evaluator.label-total-score') }}</strong>
														{{ sessionObject[selectedStory].totalScore }}
													</span>
												</b-col>
												<b-col>
													<div class="d-flex">
														<b-button-toolbar
															class="mx-auto"
															key-nav
														>
															<b-button v-on:click="showSessionModal(sessionName)">
																<b-icon
																	icon="pencil"
																></b-icon>
																{{ $t('Evaluator.label-edit-name') }}
															</b-button>
														</b-button-toolbar>
													</div>
												</b-col>
											</b-row>
									</b-col>
									<b-col>
										<div class="d-flex">
											<b-button-toolbar
												key-nav
												aria-label="Iteractions"
												class="float-right mx-auto"
											>
												<b-button
													v-bind:pressed="getPlayerChatData( sessionName ).status.online"
													v-on:update:pressed="enablePlayerChat( sessionName, $event )"
												>
													<b-icon
														v-bind="getIconChatProps(sessionName)"
													>
													</b-icon>
												</b-button>
												<b-button
													v-on:click="toggleStuckDataCollapse(sessionName)"
													v-bind:pressed="stuckData[sessionName].stuck"
												>
												<b-icon-alarm-fill></b-icon-alarm-fill>
												</b-button>
												<b-button><b-icon-check-circle-fill></b-icon-check-circle-fill></b-button>
											</b-button-toolbar>
										</div>
									</b-col>
									</b-row>
								</b-card-header>
								<div class="d-flex flex-column">
									<div
										v-if="getPlayerChatData( sessionName ).status.online"
										style="resize:vertical; height: 50rem; overflow-y: auto;"
									>
										<evaluator-chat
											v-bind:my-self="chatsData.mySelf"
											v-bind:receiverID="sessionName"
											v-bind:fetch-timeout="fetchTimeout"
											class="h-100"
										>
										</evaluator-chat>
									</div>
								<b-collapse
									class="flex-grow-1"
									v-bind:id="'player-accordion-' + sessionName"
									v-model="collapseData[sessionName].visible"
								>
									<b-card-body>
										<div v-for="(missionObject, missionId) in sessionObject[ selectedStory ]">
										<b-card
											v-if="missionId !== 'totalScore'"
											no-body
											class="mx-0 my-1"
										>
											<b-card-header>
												<b-card-title
													v-b-toggle="'collapse-player-'+ sessionName +'-mission-' + missionId"
												>{{ getMissionTitle( missionId ) }}</b-card-title>
											</b-card-header>
											<b-collapse
												v-bind:id="'collapse-player-'+ sessionName +'-mission-' + missionId"
												v-model="collapseData[sessionName][selectedStory][missionId].visible"
											>
												<b-card-body class="p-2">
													<b-card
														v-for="(activityObject, activityId) in missionObject"
														v-bind:ref="sessionName + selectedStory + missionId + activityId"
														tabindex="-1"
														class="mx-0 my-1"
														v-bind:border-variant="getActivityBorderVariant(sessionName, selectedStory, missionId, activityId)"
														v-bind:header="getActivityTitle( missionId, activityId )">
														<b-card-text>
															<b-row v-if="activityObject.start">
																<b-col>
																<span aria-atomic="true">
																	<strong>{{ $t("Evaluator.label-start-time") }}</strong>
																	<time :datetime="activityObject.start"
																	>{{ new Date(activityObject.start).toLocaleDateString(undefined) }}
																	{{ new Date(activityObject.start).toLocaleTimeString(undefined) }}
																	</time>
																</span>
																</b-col>
															</b-row>
															<b-row v-if="activityObject.end">
																<b-col>
																<span aria-atomic="true">
																	<strong>{{ $t("Evaluator.label-end-time") }}</strong>
																	<time :datetime="activityObject.end"
																	>{{ new Date(activityObject.end).toLocaleDateString(undefined) }}
																	{{ new Date(activityObject.end).toLocaleTimeString(undefined) }}</time>
																</span>
																</b-col>
															</b-row>
															<div v-if="activityObject.input">
																<b-table
																	striped
																	hover
																	:items="getItemsForInputTable( activityObject.input )"
																	:fields="[
																		{ key: 'variableName', label: $t('shared.label-variable-name', {name: ''}) },
																		{ key: 'type', label: $t('Evaluator.label-input-type') },
																		{ key: 'value', label: $t('Evaluator.label-input-value') },
																		{ key: 'requireHumanEvaluation', label: ''  },
																	]"
																>
																	<template #cell(value)="data">
																		<div
																			v-if="data.item.type === 'File' && data.item.value" 
																		>
																			<b-img
																				v-if="isDataURLOfType( data.item.value, 'image' )"
																				v-bind:src="data.item.value"
																				fluid
																				v-bind:alt="$t('shared.label-preview')"
																			></b-img>
																			<audio
																				v-else-if="isDataURLOfType( data.item.value, 'audio' )"
																				controls="controls"
																				v-bind:src="data.item.value"
																				class="img-fluid"
																			>
																				<!-- if format is not supported -->
																				<a
																					v-bind:href="data.item.value"
																					target="_blank"
																					download="download"
																				>{{ $t('shared.label-preview') }}</a>
																			</audio>
																			<video
																				v-else-if="isDataURLOfType( data.item.value, 'video' )"
																				controls="controls"
																				v-bind:src="data.item.value"
																				class="img-fluid"
																			>
																				<!-- if format is not supported -->
																				<a
																					v-bind:href="data.item.value"
																					target="_blank"
																					download="download"
																				>{{ $t('shared.label-preview') }}</a>
																			</video>
																			<a
																				v-else
																				v-bind:href="data.item.value"
																				target="_blank"
																				download="download"
																			>{{ $t('shared.label-preview') }}</a>
																		</div>
																		<output
																			v-else
																		>{{ data.item.value }}</output>
																	</template>
																	<template #cell(requireHumanEvaluation)="data">
																		<span class="text-danger">{{ $t(data.item.requireHumanEvaluation) }}</span>
																	 </template>
																</b-table>
															</div>
															<div v-if="'score' in activityObject">
																<b-row>
																	<b-col>
																		<p  style="font-weight: bold;">{{ $t("Evaluator.label-score") }}</p>
																		<b-row>
																			<b-col>
																				<p>{{ activityObject.score }}</p>																			
																			</b-col>
																			<b-col v-if="'valueToEvaluate' in activityObject">
																				<p class="text-danger">
																					{{ getEvaluationText(activityObject.valueToEvaluate) }}
																				</p>
																			</b-col>
																			<b-col>
																				<b-button v-on:click="showScoreModal(sessionName, selectedStory, missionId, activityId)">
																					<b-icon
																						icon="pencil"
																					></b-icon>
																					{{ $t('Evaluator.label-edit-score') }}
																				</b-button>
																			</b-col>
																		</b-row>
																	</b-col>	
																</b-row>
															</div>
														</b-card-text>
													</b-card>
												</b-card-body>
											</b-collapse>
										</b-card>
										</div>
									</b-card-body>
								</b-collapse>
								</div>
							</b-card>
							</template>
						</b-card-group>
					</b-col>
				</b-row>
				<b-row v-if="!selectedStory">
					<b-col>
						<h1 v-t="'Evaluator.label-no-story-selected'"
						></h1>
						<p v-t="'Evaluator.label-select-story-to-show-player-status'"
						></p>
					</b-col>
				</b-row>
			</b-container>
		</main>
		<b-modal
		id="evaluatorModal"
		v-bind:title="$t('Evaluator.label-edit-name')"
		v-bind:ok-title="$t('shared.label-save')"
		centered
		v-on:ok="setSessionName">
			<b-form-input v-model="sessionName"></b-form-input>
		</b-modal>
		<b-modal
			v-if="editScoreData"
			id="scoreModal"
			v-bind:title="$t('Evaluator.label-edit-score-of-activity')"
			v-bind:ok-title="$t('shared.label-save')"
			centered
			v-on:ok="setActivityScore">
			<b-form-input type="number" v-model="editScoreData.score">
			</b-form-input>
		</b-modal>	
	</div>
</div>
`