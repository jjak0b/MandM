export const template =
`
<div>
	<b-card
		class="mb-4"
		no-body
		
	>
		<b-card-header>
			<h2
				v-if="mission" 
				id="activityTreeDescription"
			>
        		{{ $t( "ActivityEditorWidget.label-mission-activity-tree-of") + $t(mission.title) }}
			</h2>
			<h2
				v-else
			>{{ $t( "ActivityEditorWidget.label-select-mission-to-edit-activities") }}</h2>
		</b-card-header>
		<b-card-body v-if="mission">
			<activity-tree-widget
				v-on:add="onAddActivity"
				v-on:edit="onEditActivity"
				v-on:remove="onRemoveActivity"
				v-on:grab="onGrabActivity"
				v-on:drop="onDropActivity"
				v-on:copy="onCopyActivity"
				v-on:paste="onPasteActivity"
				v-on:enable="onEnableActivity"
				aria-describedby="activityTreeDescription"
				ref="treeView"
				v-model="currentNode"
				v-on:update:parent="parentNode = $event"
				v-bind:locale="locale"
				v-bind:copiedActivity="copiedActivity"
				v-bind:grabbedActivity="grabbedActivity"
				v-on:selectedNode="onSelectedNode"
				v-on:editActivity="editActivity"
			></activity-tree-widget>
		</b-card-body>
	</b-card>
	<add-menu-widget
		ref="addMenu"
		v-bind:locale="locale"
		v-bind:currentNode="currentNode"
		v-on:addActivity="addActivity"
	></add-menu-widget>
	<edit-menu-widget v-if="isEditFormVisible"
		v-bind:locale="locale"
		v-bind:currentNode="currentNode"
		v-bind:parentNode="parentNode"
		v-bind:locales-list="localesList"
		v-on:editActivity="editActivity"
	></edit-menu-widget>
</div>
`;
