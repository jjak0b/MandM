export const template =
`
<div>
<section>
	<div class="row">
		<div class="col">
			<attribute-editor-widget
				v-if="currentCellCache && currentCellCache.component"
				v-model="currentCellCache.component.props"
			></attribute-editor-widget>
		</div>
	</div>
</section>
<hr>
<section id="sceneEditor-componentEditor">
	<div class="row" v-if="currentCellCache && currentCellCache.component">
		<div class="col">
			<component
				v-bind:key="currentCellCache.component.id"
				v-bind:is="widgetsTable[ currentCellCache.component.name ].editor"
				v-bind:props="currentCellCache.component.props"
				v-bind:component="currentCellCache.component"
				v-model="currentCellCache.component.value"
				v-bind:locale="locale"
				v-bind:locales-list="localesList"
				v-on:addElement="addListElement"
				v-on:removeElement="removeListElement"
				v-on:move-up="moveUpListElement"
				v-on:move-down="moveDownListElement"
				v-on:copy="copyListElement"
				v-on:paste="pasteListElement"	
				v-on:delete="removeListElement"
			></component>
		</div>
	</div>
</section>
<hr>
<section v-if="isFormGridEnabled">
	<div class="row" >
		<div class="col">
			<div class="row">
				<div class="col">
					<div class="form-check">
						<input
							id="SceneEditor-showGrid-input"
							type="checkbox"
							v-model="showCSSGrid"
							class="form-check-input"
						/>
						<label
							for="SceneEditor-showGrid-input"
							class="form-check-label"
						>{{ $t("SceneEditorWidget.GridWidget.label-show-grid-border") }}</label>
					</div>
				</div>
			</div>
			<fieldset v-if="currentCellCache">
				<legend>{{ $t("SceneEditorWidget.GridWidget.label-edit-selected-cell") }}</legend>
				<div class="row">
					<div class="col">
						<div class="form-group">
							<label
								for="SceneEditor-input-edit-cell-size"
							>{{ $t("SceneEditorWidget.GridWidget.label-edit-cell-size") }}</label>
							<input
								id="SceneEditor-input-edit-cell-size"
								type="number"
								value="1"
								min="1"
								v-bind:max="maxCellSizeAvailable"
								required="required"
								class="form-control"
								v-model.number="currentCellCache.colSize"
							/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div
							class="form-group"
							>
							<label
								for="SceneEditor-input-edit-cell-component"
							>{{ $t("SceneEditorWidget.GridWidget.label-edit-cell-widget") }}</label>
							<select
								id="SceneEditor-input-edit-cell-component"
								v-bind:value="currentCellCache.component ? currentCellCache.component.name : null"
								v-on:change="setCurrentCellComponent( $event.target.value )"
								>
								<option
									v-for="(widgetData, name) in widgetsTable"
									v-bind:value="name"
								>{{ $t( widgetData.label ) }}</option>
							</select>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
		<div class="col">
			<div class="row">
				<div class="col">
					<form v-on:submit.prevent>
						<fieldset>
							<legend>
								<span v-if="getRowsCount() < maxRows"
								>{{ $t("SceneEditorWidget.GridWidget.label-add-row") }}</span>
								<span v-else
								>{{ $t("SceneEditorWidget.GridWidget.label-max-row") }}</span>

							</legend>
							<div class="form-row">
								<div class="col">
									<div
										role="group"
										class="btn-group-vertical">
										<button
											type="submit"
											name="position"
											value="before"
											v-on:click="onAddGridRows"
											v-bind:disabled="!canAddRow"
											class="btn btn-primary"
										>{{ $t( "shared.label-add-before" ) }}</button>
										<button
											type="submit"
											name="position"
											value="after"
											v-on:click="onAddGridRows"
											v-bind:disabled="!canAddRow"
											class="btn btn-primary"
										>{{ $t( "shared.label-add-after" ) }}</button>
									</div>
								</div>
								<div class="col" >
									<div
										class="btb-group-vertical"
									>
										<button
											v-on:click="removeRow()"
											v-bind:disabled="getRowsCount() < 1"
											class="btn btn-primary"
										>{{ $t("SceneEditorWidget.GridWidget.label-remove-row") }}</button>
									</div>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<form v-on:submit.prevent>
						<fieldset>
							<legend>
								<span v-if="getColumnsCount() < maxColumns"
								>{{ $t("SceneEditorWidget.GridWidget.label-add-col") }}</span>
								<span v-else
								>{{ $t("SceneEditorWidget.GridWidget.label-max-col") }}</span>
							</legend>
							<div class="form-row">
								<div class="col">
									<div class="row">
										<div class="col">
											<div class="form-group">
												<label>Cell Size</label>
												<input
													name="size"
													type="number"
													value="1"
													min="1"
													v-bind:max="getMaxColumnsForGrid()"
													v-bind:disabled="!canAddColumn"
													required="required"
													class="form-control"
												/>
											</div>
										</div>
										<div class="col">
											<div
												role="group"
												class="btn-group-vertical">
												<button
													type="submit"
													name="position"
													value="before"
													v-on:click="onAddGridColumn"
													v-bind:disabled="!canAddColumn"
													class="btn btn-primary"
												>{{ $t( "shared.label-add-before" ) }}</button>
												<button
													type="submit"
													name="position"
													value="after"
													v-on:click="onAddGridColumn"
													v-bind:disabled="!canAddColumn"
													class="btn btn-primary"
												>{{ $t( "shared.label-add-after" ) }}</button>
											</div>
										</div>	
									</div>
								</div>
								<div class="col">
									<div class="btn-group-vertical">
										<button
											v-on:click="removeCell()"
											v-bind:disabled="getColumnsCount() < 1"
											class="btn btn-primary"
										>{{ $t("SceneEditorWidget.GridWidget.label-remove-cell") }}</button>
									</div>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
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
`;