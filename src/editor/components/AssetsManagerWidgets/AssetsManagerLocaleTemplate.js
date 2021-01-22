export const template =
`
<div role="tablist">
<b-card
	v-for="category in categories"
	v-if="dataStory.dependencies[ category ].length > 0"
	:aria-labelledby="'assets-manager-locale-collapse-name-' + category"
	
	no-body 
	class="mb-1"
	tag="div"
>
	<b-card-header
		header-tag="header"
		class="p-1"
		role="tab"
	>
		<b-button
			:id="'assets-manager-locale-collapse-name-' + category"
			v-b-toggle="'assets-manager-locale-collapse-' + category"
			variant="info"
			block
		>{{ $t( "media.label-" + category ) }}</b-button>
	</b-card-header>
	<b-collapse
		role="tabpanel"
		v-bind:id="'assets-manager-locale-collapse-' + category"
		class="my-2"
	>
		<b-list-group
			tabindex="0"
			tag="ul"
		>
			<b-list-group-item
				v-for="dependency in dataStory.dependencies[ category ]"
				tag="li"
				v-if="dependency.asset"
				:aria-label=""
			>
				<b-media>
					<template #aside>
						<video
							v-if="category == 'videos'"
							:src="dependency.asset.getURL()"
							controls
							style="width: 10rem"
						></video>
						<audio
							v-if="category == 'audio'"
							:aria-labelledby="'assets-manager-locale-collapse-' + category  + '-asset-' + encodeURIComponent( dependency.asset.toString() )"
							:src="dependency.asset.getURL()"
							style="width: 10rem"
							controls
						></audio>
						<img
							v-else-if="category == 'images'"
							:aria-labelledby="'assets-manager-locale-collapse-' + category  + '-asset-' + encodeURIComponent( dependency.asset.toString() )"
							:src="dependency.asset.getURL()"
							alt="dependency.asset.toString()"
							style="width: 10rem"
						/>
						<a
							v-else
							:aria-labelledby="'assets-manager-locale-collapse-' + category  + '-asset-' + encodeURIComponent( dependency.asset.toString() )"
							:href="dependency.asset.getURL()"
							target="_blank"
							download
							style="font-size: 5rem;"
						>
							<b-icon
								icon="file-earmark"
							></b-icon>
						</a>
					</template>
					<div
						class="d-flex justify-content-around align-items-center"
					>
						<h4
							:id="'assets-manager-locale-collapse-' + category  + '-asset-' + encodeURIComponent( dependency.asset.toString() )"
						>{{ dependency.asset ? dependency.asset.toString() : null }}</h4>
						<b-badge>{{ $tc( 'AssetsManager.label-recurrences', dependency.count ) }}</b-badge>
					</div>
				</b-media>
			</b-list-group-item>
		</b-list-group>
	</b-collapse>
</b-card>
</div>
`;