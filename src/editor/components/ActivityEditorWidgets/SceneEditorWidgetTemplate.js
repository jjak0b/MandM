export const template =
`
<div>
<div>
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
						v-b-modal.sceneEditor-modal-set-cell-component
					>
						<b-icon
							icon="arrow-bar-up"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-before" ) }}
					</b-dropdown-item-button>
					<b-dropdown-item-button
						id="scene-editor-toolbar-row-add-after"
						v-on:click="onAddGridRows( $event, 'after')"
						v-b-modal.sceneEditor-modal-set-cell-component
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
						v-b-modal.sceneEditor-modal-set-cell-component
					>
						<b-icon
							icon="arrow-bar-left"
							aria-hidden="true"
						></b-icon> {{ $t( "shared.label-add-before" ) }}
					</b-dropdown-item-button>
					<b-dropdown-item-button
						id="scene-editor-toolbar-col-add-after"
						v-on:click="onAddGridColumn( $event, 'after')"
						v-b-modal.sceneEditor-modal-set-cell-component
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
				v-b-modal.sceneEditor-modal-set-cell-component
			>
				<b-icon
					icon="pencil"
					aria-hidden="true"
				></b-icon> {{ $t( "SceneEditorWidget.GridWidget.label-edit-cell-widget" ) }}
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
		<b-modal
			id="sceneEditor-modal-set-cell-component"
			ref="modal-set-cell-component"
			v-bind:title="$t('SceneEditorWidget.GridWidget.label-edit-selected-cell')"
			v-on:hidden="resetModalCellComponent"
			v-on:ok="onOkModalCellComponent"
			v-bind:ok-title="$t('shared.label-add')"
			v-bind:cancel-title="$t('shared.label-abort')"
			centered
			size="lg"
		>
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
						<b-col>
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
						<b-col>
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
			</b-form>
		</b-modal>
	</section>
	<hr>
	<section id="gridSection">
		<grid-widget
			ref="grid"
			v-bind:locale="locale"
			v-bind:gridData="scene.grid"
			v-bind:maxRows="maxRows"
			v-bind:maxColumns="maxColumns"
			v-bind:showCSSGrid="showCSSGrid"
			v-bind:locales-list="localesList"
			v-model="cursor"
		></grid-widget>
	</section>
</div>
<div class="row">
	<div
		v-if="currentCellCache && currentCellCache.component"
		class="col"
	>
		<section>
		<div class="row">
			<div class="col">
				<attribute-editor-widget
					v-model="currentCellCache.component.props"
				></attribute-editor-widget>
			</div>
		</div>
		</section>
	</div>
	<div
		v-if="currentCellCache && currentCellCache.component"
		class="col"
	>
		<section id="sceneEditor-componentEditor">
		<div
			class="row"
		>
			<div class="col">
				<component
					v-bind:key="currentCellCache.component.id"
					v-bind:is="widgetsTable[ currentCellCache.component.name ].editor"
					v-model="currentCellCache.component.value"
					v-bind:component="currentCellCache.component"
					v-bind:props="currentCellCache.component.props"
					v-bind:locale="locale"
					v-bind:locales-list="localesList"
				></component>
			</div>
		</div>
		</section>
	</div>
</div>
</div>
`;