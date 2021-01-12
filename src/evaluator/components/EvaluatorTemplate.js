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
							<b-card
								v-for="(sessionObject, sessionName) in sessions"
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
												<b-col cols="6">
													<div class="d-flex">
														<b-button-toolbar
															class="mx-auto"
															key-nav
														>
															<b-button v-on:click="showModal(sessionName)">
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
												<b-button><b-icon-alarm-fill></b-icon-alarm-fill></b-button>
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
								>
									<b-card-body>
										<b-card
											v-for="(missionObject, missionId) in sessionObject[ selectedStory ]"
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
											>
												<b-card-body class="p-2">
													<b-card
														class="mx-0 my-1"
														v-for="(activityObject, activityId) in missionObject"
														border-variant="info"
														v-bind:header=" $t('assets.mission.' + missionId + '.activity.' + activityId + '.title') ">
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
															<div v-if="activityObject.input">
															<b-row>
																<b-col>
																	<p  style="font-weight: bold;">{{ $t("Evaluator.label-input-type") }}</p>
																	<p>{{ activityObject.input.type }}</p>
																</b-col>
															</b-row>
															<b-row>
																<b-col>
																	<p  style="font-weight: bold;">{{ $t("Evaluator.label-input-value") }}</p>
																	<p>{{ activityObject.input.value.toString() }}</p>
																</b-col>
															</b-row>
															</div>
														</b-card-text>
													</b-card>
												</b-card-body>
											</b-collapse>
										</b-card>
									</b-card-body>
								</b-collapse>
								</div>
							</b-card>
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
	</div>
</div>
`