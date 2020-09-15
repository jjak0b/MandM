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
				<fieldset class="form-group">
					<legend>{{ $t( "MediaForm.label_mediatype" ) }}</legend>
					<div v-for="(label, type) in labelMediaTypes" >
						<input
							type="radio"
							name="mediaType"
							v-bind:id="'mediaForm-media-type_' + type "
							required="required"
							v-bind:value="type"
							v-model="value.tag"
							v-bind:disabled="value.tag && value.tag != type"
						/>
						<label
							v-bind:for="'mediaForm-media-type_' + type "
						>{{ $t( label ) }}</label>
					</div>
				</fieldset>
					<!-- Only file type is supported for now
					<fieldset>
						<legend>{{ $t( "MediaForm.label_mediaSource" ) }}</legend>
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
					<legend>{{ $t( "MediaForm.label_upload_file" ) }}</legend>
					<div v-if="value.tag && value.tag == 'image'">
						<div class="form-group">
							<label
								for="mediaForm-input-file-image"
							>{{ $t( "MediaForm.label-input-file.image" ) }}</label>
							<input
								type="file"
								name="file"
								id="mediaForm-input-file-image"
								required="required"
								accept="image/*"
								v-on:change="(event) => { onFileload(event, 'main'); updateSource(); updateCaptions(); }"
								class="form-control"
							/>
						</div>
						<div class="form-group">
							<label
								for="mediaForm-input-image-caption"
							>{{ $t( "MediaForm.label-input-file.imageCaption" ) }}</label>
							<i18n-input-widget
								v-bind:tag="'textarea'"
								id="mediaForm-input-image-caption"
								name="fileCaption"
								rows="4"
								v-bind:locale="locale"
								v-bind:locale-label="localeImageCaptionLabel"
								class="form-control"
							></i18n-input-widget>
						</div>
						<div class="form-group">
							<div class="form-check">
								<input
									id="mediaForm-input-image-useMap"
									type="checkbox"
									v-model="shouldUseMap"
									v-bind:disabled="!value.src"
									class="form-check-input"
								>
								<label
									for="mediaForm-input-image-useMap"
									class="form-check-label"
								>{{ $t( "MediaForm.label-input-useArea" ) }}</label>							
							</div>
							<div class="row" v-if="shouldUseMap">
								<div class="col">
									<div>
										<form
											id="mediaForm-input-image-area-form"
											v-on:submit.prevent="onAddArea"
										>
											<fieldset form="mediaForm-input-image-area-form">
												<legend v-t="'MediaForm.label-add-image-area'"></legend>
												<div class="form-row">
													<div class="col">
														<div class="form-group">
															<label
																for="mediaForm-input-image-area-shape"
																v-t="'MediaForm.label-select-shape-area'"
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
					<div v-if="value.tag && value.tag == 'video' ">
						<div class="form-group">
							<label
								for="mediaForm-input-file-video"
							>{{ $t( "MediaForm.label-input-file.video") }}</label>
							<input
								type="file"
								name="file"
								id="mediaForm-input-file-video"
								required="required"
								accept="video/*"
								v-on:change="(event) => { onFileload(event, 'main'); updateSource(); }"
								class="form-control"
							/>
						</div>
					</div>
					<div v-if="value.tag && value.tag == 'audio' ">
						<div class="form-group">
							<label
								for="mediaForm-input-file-audio"
							>{{ $t( "MediaForm.label-input-file.audio") }}</label>
							<input
								type="file"
								name="file"
								id="mediaForm-input-file-audio"
								required="required"
								accept="audio/*"
								v-on:change="(event) => { onFileload(event, 'main'); updateSource(); }"
								class="form-control"
							/>
						</div>
					</div>
					<div v-if="value.tag && ( value.tag == 'audio' || value.tag == 'video' )" >
						<div class="form-group">
							<label
								for="mediaForm-input-file-captions"
							>{{ $t( "MediaForm.label-input-file.captions") }}</label>
							<input
								type="file"
								name="captions"
								id="mediaForm-input-file-captions"
								aria-describedby="mediaForm-input-file-captions-description"
								accept="text/vtt, .vtt"
								v-on:change="(event) =>{ onFileload(event, 'captions'); updateCaptions(); updateSource(); }"
								class="form-control"
							/>
						</div>
						<p id="mediaForm-input-file-captions-description">{{ $t( "MediaForm.label-input-file.captions_accessibility") }}</p>
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
		<section class="col" v-if="value.tag && value.tag == 'image' && value.areas">
			<b-card no-body>
				<b-tabs card vertical>
					<media-form-image-area-tabpanel
						v-for="(area, areaIndex) in value.areas"
						:key="'imageArea-' + areaIndex"
						v-bind:area="area"
						v-bind:areaIndex="areaIndex"
						v-bind:locale="locale"
						v-bind:labelShapeTypes="labelShapeTypes"
						v-on:remove="onRemoveArea( areaIndex )"
						v-on:highlight="$refs.preview.highlightMapArea( areaIndex )"
						v-on:unhighlight="$refs.preview.unHighlightMapArea( areaIndex )"
					></media-form-image-area-tabpanel>
				</b-tabs>
			</b-card>
		</section>
	</div>
	<div class="row">
		<section class="col">
			<i18n-media-player-widget
				ref="preview"
				v-if="shouldPreview()"
				id="mediaForm-preview"
				v-bind:value="value"
				v-bind:locale="locale"
			></i18n-media-player-widget>
		</section>
	</div>
</div>
`;