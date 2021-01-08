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
	<b-navbar toggleable="xl" type="light" variant="light">
		<b-navbar-toggle
			target="sidebar-stories"
		></b-navbar-toggle>
	
		<b-sidebar
			id="sidebar-stories"
			:title="$t('shared.label-story')"
			shadow
			role="navigation"
			backdrop="true"
		>
			<b-nav
				vertical
				class="accordion"
				role="menu"
			>
				<b-card
					v-for="(storyArray, storyName) in activeStories"
					no-body
					class="mb-1"
					tag="li"
					role="menuitem"
				>
					<b-button
						block
						v-b-toggle:[encodeURIComponent(storyName)]
						variant="info"
					>{{ storyName }}</b-button>
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
							>{{ $t( 'assets.mission.' + missionId + '.' + 'title' ) }}</b-list-group-item>
						</b-list-group>

					</b-collapse>
				</b-card>
			</b-navbar-nav>
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
				{{ selectedMission }}
			</b-breadcrumb-item>
		</b-breadcrumb>
		  <div style="margin-left: 25%">
		  <span>{{ selectedStory }}</span>
		  <span>{{ selectedMission }}</span>
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
		</main>
	</div>
</div>
`