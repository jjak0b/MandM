export const template =
`
<div>
	<b-card v-if="mission" class="mb-4">
        	<p id="activityTreeDescription">
        	{{ $t( "ActivityEditorWidget.label-mission-activity-tree-of") + $t(mission.title) }}
			</p>
			<activity-tree-widget
				aria-describedby="activityTreeDescription"
				ref="treeView"
				v-model="currentNode"
				v-bind:locale="locale"
				v-on:selectedNode="onSelectedNode"
			></activity-tree-widget>
	</b-card>
	<component
		v-bind:is="currentMenu"
		v-bind:id="currentMenu"
		v-bind:locale="locale"
		v-bind:currentNode="currentNode"
		v-bind:nextId="nextId"
		v-bind:nextAssetId="nextAssetId"
		v-on:addActivity="onAdd"
		v-on:editActivity="onEdit">	
	</component>
</div>
`;
