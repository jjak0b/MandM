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
	<add-menu-widget
		ref="addMenu"
		v-bind:locale="locale"
		v-bind:currentNode="currentNode"
		v-bind:nextId="nextId"
		v-on:addActivity="onAdd">
	</add-menu-widget>
	<edit-menu-widget v-if="isEditFormVisible"
		v-bind:locale="locale"
		v-bind:currentNode="currentNode"
		v-bind:nextId="nextId"
		v-bind:nextAssetId="nextAssetId"
		v-on:editActivity="onEdit"
		v-on:inc-asset-id="$emit('inc-asset-id')">	
	</edit-menu-widget>
</div>
`;
