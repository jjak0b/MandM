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
					<b-dropdown-item-button
						id="scene-editor-toolbar-row-add-before"
						v-on:click="onAddGridRows( $event, 'before')"
						v-b-toggle.sceneEditor-modal-set-cell-component
					>
						<b-icon
							icon="arrow-bar-up"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-before" ) }}
					</b-dropdown-item-button>
					<b-dropdown-item-button
						id="scene-editor-toolbar-row-add-after"
						v-on:click="onAddGridRows( $event, 'after')"
						v-b-toggle.sceneEditor-modal-set-cell-component
					>
						<b-icon
							icon="arrow-bar-down"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-after" ) }}
					</b-dropdown-item-button>
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
					<b-dropdown-item-button
						id="scene-editor-toolbar-col-add-before"
						v-on:click="onAddGridColumn( $event, 'before')"
						v-b-toggle.sceneEditor-modal-set-cell-component
					>
						<b-icon
							icon="arrow-bar-left"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-before" ) }}
					</b-dropdown-item-button>
					<b-dropdown-item-button
						id="scene-editor-toolbar-col-add-after"
						v-on:click="onAddGridColumn( $event, 'after')"
						v-b-toggle.sceneEditor-modal-set-cell-component
					>
						<b-icon
							icon="arrow-bar-right"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-after" ) }}
					</b-dropdown-item-button>
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
			<b-button
				v-bind:disabled="!currentCellCache"
				v-on:click="onChangeSelectedCellComponent"
				v-b-toggle.sceneEditor-modal-set-cell-component
			>
				<b-icon
					icon="pencil"
					aria-hidden="true"
				></b-icon> {{ $t( 'SceneEditorWidget.GridWidget.label-edit-selected-cell' ) }}
			</b-button>
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
									>
										<b-form-group
											v-bind:state="modalState"
											v-bind:invalid-feedback="$t('shared.label-field-required')"
										>
											<b-form-row>
												<b-col
													sm="12"
													lg="6"
												>
													<label
														for="SceneEditor-input-edit-cell-component"
													>{{ $t( 'SceneEditorWidget.GridWidget.label-edit-cell-widget' ) }}</label>
													<b-form-select
														id="SceneEditor-input-edit-cell-component"
														v-model="newCellComponentName"
														:state="modalState"
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
												</b-col>
												<b-col
													sm="12"
													lg="6"
												>
													<label for="sceneEditor-input-edit-cell-size">{{ $t( 'SceneEditorWidget.GridWidget.label-edit-cell-size' ) }}</label>
													<b-form-spinbutton
														id="sceneEditor-input-edit-cell-size"
														v-model.number="newCellSize"
														min="1"
														v-bind:max="maxCellSizeAvailable"
														required="required"
													></b-form-spinbutton>
												</b-col>
											</b-form-row>
										</b-form-group>
										<b-button
											type="submit"
										>{{ newCell.component ? $t('shared.label-save') : $t('shared.label-add') }}
										</b-button>
									</b-form>
								</b-col>
							</b-row>
						</section>
						<br>
						<section
							v-if="newCell && newCell.component"
							aria-labelledby="sceneEditor-modal-section-component-label-name"
							class="mb-2"
						>
							<h3
								aria-live="polite"
								id="sceneEditor-modal-section-component-label-name"
								class="mb-2"
							>{{ $t('SceneEditorWidget.label-edit-component-properties') }}</h3>
							<b-row>
								<b-col
									sm="12"
									lg="6"
								>
									<attribute-editor-widget
										v-model="newCell.component.props"
									></attribute-editor-widget>
								</b-col>
								<b-col
									sm="12"
									lg="6"
								>
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
								</b-col>
							</b-row>
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
		<grid-widget
			id="scene-editor-grid"
			ref="grid"
			v-bind:grid-data="scene.grid"
			grid-role="grid"
			grid-tag="div"
			row-role="row"
			row-class="row no-gutters"
			row-tag="div"
			cell-role="gridcell"
			cell-class="col"
			cell-tag="span"
			v-bind:maxRows="maxRows"
			v-bind:maxColumns="maxColumns"
			selectable
			v-model="cursor"
		>
			<template
				#cell-content="{rowIndex, cellIndex, cellData, isFocused, isSelected}"
			>
				<user-widget-viewport
					v-if="cellData.component"
					v-bind:id="'sceneEditor-section-grid-component-' + cellData.component.id"
					v-bind:tabindex="isFocused ? 0 : -1"
					v-bind:value="cellData.component"
					v-bind:class="getCellComponentClass( isFocused, isSelected )"
					v-bind:locale="locale"
					v-bind:locales-list="localesList"
					v-bind:localeLabel="cellData.component.i18nCategory"
				></user-widget-viewport>
			</template>
		</grid-widget>
	</section>
</section>
`;