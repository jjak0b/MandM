export const template =
`
<section
	aria-labelledby="sceneEditor-label-main"
	class="mb-2	"
>
	<h2
		id="sceneEditor-label-main"
		class="mb-2"
	>
		{{ $t('SceneEditorWidget.label-scene-editor') }}
	</h2>
	<section>
		<div>
			<p>{{ $t('SceneEditorWidget.GridWidget.label-scene-description') }}</p>
			<p>{{ $t('SceneEditorWidget.GridWidget.label-populate-grid-with-rows-and-cells-to-customize-widget-you-need') }}</p>
			<p>{{ $t('SceneEditorWidget.GridWidget.label-scene-input-description') }}</p>
			<p>{{ $t('SceneEditorWidget.GridWidget.label-scene-input-details') }}</p>
		</div>
		<b-button-toolbar
			v-bind:aria-label="$t('SceneEditorWidget.GridWidget.label-grid-toolbar')"
			key-nav
			class="justify-content-around align-items-center"
		>
			<b-button-group
				vertical
				size="md"
			>
				<b-dropdown
					class="mb-1"
					v-bind:disabled="!canAddRow()"
				>
					<template #button-content>
						<b-icon
							icon="grid-3x2"
							aria-hidden="true"
						></b-icon> {{ $t('SceneEditorWidget.GridWidget.label-add-row') }}
					</template>
					<b-dropdown-item
						id="scene-editor-toolbar-row-add-before"
						v-on:click.prevent="onAddGridRows( $event, 'before')"
						v-b-toggle="'sceneEditor-modal-set-cell-component'"
					>
						<b-icon
							icon="arrow-bar-up"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-before" ) }}
					</b-dropdown-item>
					<b-dropdown-item
						id="scene-editor-toolbar-row-add-after"
						v-on:click.prevent="onAddGridRows( $event, 'after')"
						v-b-toggle="'sceneEditor-modal-set-cell-component'"
					>
						<b-icon
							icon="arrow-bar-down"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-after" ) }}
					</b-dropdown-item>
				</b-dropdown>
				<b-button
					v-on:click="removeRow()"
					v-bind:disabled="getRowsCount() < 1"
					class="mb-1"
				>
					<b-icon
						icon="trash"
						aria-hidden="true"
					></b-icon> {{ $t("SceneEditorWidget.GridWidget.label-remove-row") }}
				</b-button>
			</b-button-group>
			<b-button-group
				vertical
				size="md"
			>
				<b-dropdown
					class="mb-1"
					v-bind:disabled="!canAddColumn()"
				>
					<template #button-content>
						<b-icon
							icon="layout-three-columns"
							aria-hidden="true"
						></b-icon> {{ $t('SceneEditorWidget.GridWidget.label-add-col') }}
					</template>
					<b-dropdown-item
						id="scene-editor-toolbar-col-add-before"
						v-on:click.prevent="onAddGridColumn( $event, 'before')"
						v-b-toggle="'sceneEditor-modal-set-cell-component'"
					>
						<b-icon
							icon="arrow-bar-left"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-before" ) }}
					</b-dropdown-item>
					<b-dropdown-item
						id="scene-editor-toolbar-col-add-after"
						v-on:click.prevent="onAddGridColumn( $event, 'after')"
						v-b-toggle="'sceneEditor-modal-set-cell-component'"
					>
						<b-icon
							icon="arrow-bar-right"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-after" ) }}
					</b-dropdown-item>
				</b-dropdown>
				<b-button
					class="mb-1"
					v-on:click="removeCell()"
					v-bind:disabled="getColumnsCount() < 1"
				>
					<b-icon
						icon="trash"
						aria-hidden="true"
					></b-icon> {{ $t("SceneEditorWidget.GridWidget.label-remove-cell") }}	
				</b-button>
			</b-button-group>
			<b-button-group
				vertical
				size="md"
			>
				<b-button
					v-bind:disabled="!currentCellCache"
					v-on:click="onChangeSelectedCellComponent"
					v-b-toggle="'sceneEditor-modal-set-cell-component'"
				>
					<b-icon
						icon="pencil"
						aria-hidden="true"
					></b-icon> {{ $t( 'SceneEditorWidget.GridWidget.label-edit-selected-cell' ) }}
				</b-button>
				<b-button
					v-bind:disabled="!currentLayerGrid"
					v-b-toggle="'sceneEditor-modal-edit-gridLayer'"
				>
					<b-icon
						icon="gear"
						aria-hidden="true"
					></b-icon> {{ $t( 'SceneEditorWidget.GridWidget.label-edit-current-grid-settings' ) }}
				</b-button>
			</b-button-group>
			<div>
				<b-form-checkbox
					id="SceneEditor-showGrid-input"
					v-model="showCSSGrid"
					name="checkbox-show-grid"
				>
					{{ $t("SceneEditorWidget.GridWidget.label-show-grid-border") }}
				</b-form-checkbox>
			</div>
		</b-button-toolbar>
		<b-sidebar
			id="sceneEditor-modal-set-cell-component"
			ref="modal-set-cell-component"
			v-bind:title="$t('SceneEditorWidget.GridWidget.label-edit-selected-cell')"
			v-on:hidden="resetModalCellComponent"
			:backdrop="true"
			width="auto"
			sidebar-class="resize-x"
		>
			<b-container>
				<b-row>
					<b-col>
						<b-row>
						<b-col>
						<section
							aria-labelledby="sceneEditor-modal-section-cell-label-name"
						>
							<h3
								id="sceneEditor-modal-section-cell-label-name"
								class="mb-2"
							>{{ $t('SceneEditorWidget.label-edit-cell-properties') }}</h3>
							<b-row>
								<b-col>
									<b-form
										id="sceneEditor-modal-form-set-cell-component"
										ref="form-set-cell-component"
										v-on:submit.stop.prevent="onModalSubmit"
										class="d-flex justify-content-around align-items-center"
									>
										<div>
											<label
												for="SceneEditor-input-edit-cell-component"
											>{{ $t( 'SceneEditorWidget.GridWidget.label-edit-cell-widget' ) }}</label>
											<b-form-select
												id="SceneEditor-input-edit-cell-component"
												v-model="newCellComponentName"
												required
											>
												<template #first>
													<b-form-select-option
														v-bind:value="null"
														disabled
													>{{ $t('shared.label-select-option') }}</b-form-select-option>
												</template>
												<b-form-select-option
													v-for="(widgetData, name) in widgetsTable"
													v-bind:value="name"
												>
												{{ $t( widgetData.label ) }}
												</b-form-select-option>
											</b-form-select>
										</div>
										<b-button
											type="submit"
										>{{ newCell.component ? $t('shared.label-save') : $t('shared.label-add') }}
										</b-button>

									</b-form>
								</b-col>
							</b-row>
						</section>
						</b-col>
						</b-row>
						<br/>
						<b-row>
						<b-col>
						<section
							aria-labelledby="sceneEditor-modal-section-component-label-name"
							v-bind:aria-hidden="!newCell || !newCell.component"
							class="mb-2"
							v-show="newCell && newCell.component"
							aria-live="polite"
						>
							<h3
								id="sceneEditor-modal-section-component-label-name"
								class="mb-2"
							>{{ $t('SceneEditorWidget.label-edit-component-properties') }}</h3>
							<div
								v-if="newCell && newCell.component"
							>
								<div>
									<attribute-editor-widget
										v-bind:value="newCell.component.props"
										v-bind:component="newCell.component"
									></attribute-editor-widget>
								</div>
								<br/>
								<div>
									<component
										id="sceneEditor-componentEditor"
										v-bind:key="newCell.component.id"
										v-bind:is="widgetsTable[ newCell.component.name ].editor"
										v-model="newCell.component.value"
										v-bind:component="newCell.component"
										v-bind:props="newCell.component.props"
										v-bind:locale="locale"
										v-bind:locales-list="localesList"
									></component>
								</div>
							</div>
						</section>
						</b-col>
						</b-row>
					</b-col>
				</b-row>
			</b-container>
		</b-sidebar>
		<b-sidebar
			id="sceneEditor-modal-edit-gridLayer"
			ref="modal-set-cell-component"
			v-bind:title="$t( 'SceneEditorWidget.GridWidget.label-edit-current-grid-settings' )"
			:backdrop="true"
			width="auto"
			v-bind:right="true"
		>
			<b-container>
				<b-row>
				<b-col>
				<section
					v-if="currentLayerGrid"
					aria-labelledby="sceneEditor-modal-section-grid-label-name"
					class="mb-2"
				>
					<h3
						id="sceneEditor-modal-section-grid-label-name"
						class="mb-2"
					>{{ $t('SceneEditorWidget.label-edit-component-properties') }}</h3>
					<div>
						<attribute-editor-widget
							v-model="currentLayerGrid.component.props"
						></attribute-editor-widget>
					</div>
					<br/>
					<div>
						<component
							id="sceneEditor-componentEditor"
							v-bind:key="currentLayerGrid.component.id"
							v-bind:is="widgetsTable[ currentLayerGrid.component.name ].editor"
							v-model="currentLayerGrid.component.value"
							v-bind:component="currentLayerGrid.component"
							v-bind:props="currentLayerGrid.component.props"
						></component>
					</div>
				</section>
				</b-col>
				</b-row>
			</b-container>
		</b-sidebar>
	</section>
	<hr>
	<section
		aria-labelledby="sceneEditor-section-grid-label"
	>
		<h3
			id="sceneEditor-section-grid-label"
			class="mb-2"
		>
			{{ $t('SceneEditorWidget.GridWidget.label-scene-grid-layout-and-content') }}
		</h3>
		<div class="sr-only">
			<div
				role="status"
				aria-live="polite"
				aria-relevant="additions text"
			>
				<output
					v-if="lastAddedWidgetName" 
					:key="lastAddedWidgetName"
					aria-atomic="true"
				>
					{{
						$tc(
							'shared.label-items-added',
							1,
							{
								items: lastAddedWidgetName && (lastAddedWidgetName in widgetsTable)
									? $t( widgetsTable[ lastAddedWidgetName ].label )
									: ''
							}
						)
					}}
				</output>
			</div>
			<div
				role="status"
				aria-live="polite"
				aria-relevant="removals"
			>
				<output
					v-if="lastRemovedWidgetNames && lastRemovedWidgetNames.length > 0"
					:key="lastRemovedWidgetNames.toString()"
					aria-atomic="true"
				>
					{{
						$tc(
							'shared.label-items-removed',
							lastRemovedWidgetNames.length,
							{
								items: lastRemovedWidgetNames.map( (widgetName) => $t( widgetsTable[ widgetName ].label ) ).join( ', ' )
							}
						)
					}}
				</output>
			</div>
		</div>
		<b-tabs
			pills
			card
			vertical
			v-model="currentLayerIndex"
			v-bind:key="scene.body.id"
		>
			<b-tab
				v-for="(gridLayer, gridIndex ) in gridLayers"
				v-bind:key="gridLayer.component.id"
				v-bind:title="$tc( 'SceneEditorWidget.GridWidget.label-layout-level', gridIndex )"
			>
				<div
					v-if="gridLayer.component.props.gridData && gridLayer.component.props.gridData.length < 1"
				>
					<p>{{ $t('SceneEditorWidget.GridWidget.label-no-rows-in-grid') }}</p>
				</div>
				<form
					v-on:submit.prevent.stop
					v-on:reset.prevent.stop
					autocomplete="off"
				>
				<grid-widget
					v-bind:key="gridLayer.component.id"
					v-bind:ref="'grid-' + gridIndex"
					v-bind="gridLayer.component.props"
					v-bind:aria-level="gridIndex+1"
					
					v-bind:id="'scene-editor-grid-' + gridIndex"
					v-bind:grid-role="'grid'"
					v-bind:row-role="'row'"
					v-bind:cell-role="'gridcell'"
					
					v-model="gridLayer.cursor"
					v-bind:nav-key="true"
					v-bind:use-indexes="true"
					v-bind:selectable="true"
					v-bind:prevent-focus="gridPreventFocus"
					
					v-bind:cell-class="getGridCellClass( gridLayer )"
					v-bind:cursor-cell-class="getGridCursorCellClass( gridLayer )"
					v-bind:selected-cell-class="getGridSelectedCellClass( gridLayer )"
					
					v-on:input="onCellSelectedInsideGrid( gridIndex, $event )"			
				>
					<template
						#cell-content="{rowIndex, cellIndex, cellData, isFocused, isSelected}"
					>	
						<user-widget-viewport
							v-if="cellData.component"
							v-bind:id="'scene-editor-grid-' + gridIndex + '-widget-' + rowIndex + '-' + cellIndex + '-' + cellData.component.id"
							v-bind:key="cellData.component.id"
							v-bind:aria-label="cellData.component.name in widgetsTable ? $t( widgetsTable[ cellData.component.name ].label) : null"
							v-bind:tabindex="isFocused ? 0 : -1"
							v-bind:value="cellData.component"
							v-bind:locale="locale"
							v-bind:locales-list="localesList"
							v-bind:locale-label="cellData.component.i18nCategory"
						></user-widget-viewport>
					</template>
				</grid-widget>
				</form>
			</b-tab>
		</b-tabs>
	</section>
</section>
`;