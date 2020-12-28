export const template =
`
<div>
	<div class="row">
		<section class="col">
			<form
				ref="form"
				v-on:submit.prevent
				v-on:reset="reset()"
			>
				<b-form-group
					v-bind:label="$t('UserWidgets.MediaPlayer.label-select-media-asset')"
					label-for="assets-manager-widget-input-asset"
				>
					<b-input-group class="mt-3">
						<b-input-group-prepend>
							<assets-manager-browser-widget
								id="assets-manager-widget-browser-delete"
								aria-controls="assets-manager-widget-input-asset"
								v-bind:value="context.asset"
								v-on:input="form.asset = $event"
								v-bind:button-only="true"
								v-bind:force-filter="mediaCategories"
							>
							</assets-manager-browser-widget>
						</b-input-group-prepend>
						<b-form-input
							id="assets-manager-widget-input-asset"
							v-bind:value="context.asset ? context.asset.toString() : null"
							required="required"
							readonly
						></b-form-input>
					</b-input-group>
				</b-form-group>
					<!-- Only file type is supported for now
					<fieldset>
						<legend>{{ $t( "UserWidgets.MediaPlayer.label_mediaSource" ) }}</legend>
						<div v-for="(label, type) in labelMediaSourceTypes" >
							<input
								type="radio"
								name="mediaSrcType"
								v-bind:id="'mediaForm-src-type_' + type "
								required="required"
								v-bind:value="type"
								v-model="sourceType"
							/>
							<label
								v-bind:for="'mediaForm-src-type_' + type "
							>{{ $t( label ) }}</label>
						</div>
					</fieldset>
					-->
				<fieldset>
					<legend>{{ $t( "UserWidgets.MediaPlayer.label-options" ) }}</legend>
					<div v-if="context.asset && context.asset.category && context.asset.category == 'images'">
						<i18n-input-widget
							v-bind:label="$t('UserWidgets.MediaPlayer.label-input-file.imageCaption')"
							v-bind:tag="'textarea'"
							id="mediaForm-input-image-caption"
							name="fileCaption"
							rows="4"
							v-bind:locale="locale"
							v-bind:locale-label="context.captions[0]"
						></i18n-input-widget>
						<div class="form-group">
							<div class="form-check">
								<input
									id="mediaForm-input-image-useMap"
									type="checkbox"
									v-model="shouldUseMap"
									v-bind:disabled="!context.asset"
									class="form-check-input"
								>
								<label
									for="mediaForm-input-image-useMap"
									class="form-check-label"
								>{{ $t( "UserWidgets.MediaPlayer.label-input-useArea" ) }}</label>							
							</div>
							<div class="row" v-if="shouldUseMap">
								<div class="col">
									<div>
										<form
											id="mediaForm-input-image-area-form"
											v-on:submit.prevent="onAddArea"
										>
											<fieldset form="mediaForm-input-image-area-form">
												<legend v-t="'UserWidgets.MediaPlayer.label-add-image-area'"></legend>
												<div class="form-row">
													<div class="col">
														<div class="form-group">
															<label
																for="mediaForm-input-image-area-shape"
																v-t="'UserWidgets.MediaPlayer.label-select-shape-area'"
															></label>
															<select
																id="mediaForm-input-image-area-shape"
																name="shape"
																required="required"
																class="form-control"
															>
																<option
																	v-for="(label, shape) in labelShapeTypes"
																	v-bind:selected="shape == 'default' || null"
																	v-bind:value="shape"
																	v-t="label"
																></option>
															</select>
														</div>
													</div>
												</div>
												<div class="form-row">
													<div class="col">
														<div class="form-group">
															<button
																type="submit"
																class="btn btn-success"
															>{{ $t("shared.label-add" ) }}</button>
														</div>
													</div>
												</div>
											</fieldset>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="context.asset && context.asset.category && ( context.asset.category == 'audios' || context.asset.category == 'videos' )" >
						<i18n-region
							v-bind:label="$t('UserWidgets.MediaPlayer.label-input-file.captions')"
							label-for="user-widget-editor-media-player-asset-caption-input"
							v-bind:description="$t('UserWidgets.MediaPlayer.label-input-file.captions_accessibility')"
							v-bind:locale="locale"
						>
							<b-input-group class="mt-3">
								<b-input-group-prepend>
									<assets-manager-browser-widget
										id="user-widget-editor-media-player-asset-caption"
										aria-controls="user-widget-editor-media-player-asset-caption-input"
										v-bind:force-filter="['captions']"
										v-bind:value="locale && context.captions ? context.captions[locale] : null"
										v-on:input="form.caption = $event"
										v-bind:button-only="true"
										v-bind:disabled="!locale"
									>
									</assets-manager-browser-widget>
								</b-input-group-prepend>
								<b-form-input
									id="user-widget-editor-media-player-asset-caption-input"
									v-bind:value="locale ? context.captions[ locale ] : null"
									readonly
									v-bind:disabled="!locale"
								></b-form-input>
							</b-input-group>
						</i18n-region>
					</div>
				</fieldset>
				<div class="btn-group" role="group">
					<button type="submit" class="form-control btn btn-success">{{ $t("shared.label-add") }}</button>
					<button type="reset" class="form-control btn btn-danger">{{ $t("shared.label-reset") }}</button>
				</div>
			</form>
		</section>
	</div>
	<div class="row">
		<section class="col" v-if="context.asset && context.asset.category && context.asset.category == 'images' && context.areas">
			<b-card no-body>
				<b-tabs card vertical>
					<user-widget-editor-media-player-image-area-tabpanel
						v-for="(area, areaIndex) in context.areas"
						:key="'imageArea-' + areaIndex"
						v-bind:area="area"
						v-bind:areaIndex="areaIndex"
						v-bind:locale="locale"
						v-bind:labelShapeTypes="labelShapeTypes"
						v-on:remove="onRemoveArea( areaIndex )"
						v-on:highlight="$refs.preview.highlightMapArea( areaIndex )"
						v-on:unhighlight="$refs.preview.unHighlightMapArea( areaIndex )"
					></user-widget-editor-media-player-image-area-tabpanel>
				</b-tabs>
			</b-card>
		</section>
	</div>
	<div class="row">
		<section class="col">
			<user-widget-media-player
				ref="preview"
				v-if="shouldPreview()"
				id="mediaForm-preview"
				v-bind:context="context"
				v-bind:locale="locale"
			></user-widget-media-player>
		</section>
	</div>
</div>
`;