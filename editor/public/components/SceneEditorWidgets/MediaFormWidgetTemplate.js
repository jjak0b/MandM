export const template =
`
<div>
	<div class="row">
		<section class="col">
			<form ref="form" v-on:change="updateAssetForPreview()">
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
							v-on:change="$( $refs.form ).trigger('reset')"
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
								v-on:change="onFileload($event, 'main')"
								class="form-control"
							/>
						</div>
						<div class="form-group">
							<label
								for="mediaForm-input-image-caption"
							>{{ $t( "MediaForm.label-input-file.imageCaption" ) }}</label>
							<i18n-input-widget
								v-bind:tag="'textarea'"
								class="form-control"
								id="mediaForm-input-image-caption"
								name="fileCaption"
								rows="4"
								v-bind:locale="locale"
								v-bind:locale-label="localeImageCaptionLabel"
								class="form-control"
							></i18n-input-widget>
						</div>
						<div class="form-group">						
							<label for="mediaForm-input-image-useMap"
							>{{ $t( "MediaForm.label-input-useArea" ) }}</label>
							<input
								id="mediaForm-input-image-useMap"
								type="checkbox"
								v-model="shouldUseMap"
							>
							<div v-if="shouldUseMap">
								<div class="row">
									<div class="col">
										<form
											id="mediaForm-input-image-area-form"
											v-on:submit.prevent="onAddArea"
										>
											<fieldset form="mediaForm-input-image-area-form">
												<legend>{{ $t( "MediaForm.label-add-image-area" ) }}</legend>
												<div class="form-group">
													<label
														for="mediaForm-input-image-area-shape"
													>{{ $t( "MediaForm.label-select-shape-area" ) }}</label>
													<select
														id="mediaForm-input-image-area-shape"
														name="shape"
														required="required"
														class="form-control"
													>
														<option value="default" selected="selected">{{ $t( "MediaForm.areas.label-shape-full" ) }}</option>
														<option value="rect">{{ $t( "MediaForm.areas.label-shape-rectangle" ) }}</option>
														<option value="circle">{{ $t( "MediaForm.areas.label-shape-circle" ) }}</option>
													</select>
												</div>
												<div class="form-group">
													<label
														for="mediaForm-input-image-area-action"
													>{{ $t( "MediaForm.areas.label-select-interact-action" ) }}</label>
													<select
														id="mediaForm-input-image-area-action"
														name="action"
														required="required"
														class="form-control"
													>
														<option value="url">{{ $t( "MediaForm.areas.actions.label-open-url-new-tab" ) }}</option>
														<option value="anchor">{{ $t( "MediaForm.areas.actions.label-navigate-to-page-element" ) }}</option>
														<option value="return">{{ $t( "MediaForm.areas.actions.label-return-a-value-to-activity" ) }}</option>
													</select>
													<div class="form-group">
														
													</div>
												</div>
												<div class="form-group">
													<button
														type="submit"
														class="btn btn-success"
													>{{ $t("shared.label-add" ) }}</button>
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
								v-on:change="onFileload($event, 'main')"
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
								v-on:change="onFileload($event,'main')"
								class="form-control"
							/>
						</div>
					</div>
					<div v-if="value.tag && ( value.tag == 'audio' || value.tag == 'video' )" >
						<div class="form-group">
							<label
								for="mediaForm-input-file-subtitles"
							>{{ $t( "MediaForm.label-input-file.subtitles") }}</label>
							<input
								type="file"
								name="subtitles"
								id="mediaForm-input-file-subtitles"
								aria-describedby="mediaForm-input-file-subtitles-description"
								accept="text/vtt, .vtt"
								v-on:change="onFileload($event, 'subtitle' )"
								class="form-control"
							/>
						</div>
						<p id="mediaForm-input-file-subtitles-description">{{ $t( "MediaForm.label-input-file.subtitles_accessibility") }}</p>
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
		<section class="col">
			<form v-on:submit.prevent>
				<div class="form-row">
					<div class="col">
						<list-item-widget
							tag="ol"
							v-bind:list="value.areas"
						>
							<template
								v-slot:item="{ item: area, keyItem: areaIndex }"
							>
								<div
									v-on:mouseover="$refs.preview.highlightMapArea( areaIndex )"
									v-on:mouseout="$refs.preview.unHighlightMapArea( areaIndex )"
								>
									<div class="col"
									>
										<div class="row">
											<div class="col">
												<button
													v-on:click="onRemoveArea(areaIndex)"
													type="button"
													class="btn btn-danger"
												>{{ $t( "shared.label-remove" ) }}</button>
											</div>
											<div class="col">
												<div class="form-check">
													<input
														v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-useHighlight'"
														type="checkbox"
														selected="selected"
														v-model="area.useHighlight"
														class="form-check-input"
													/>
													<label
														v-bind:for="'mediaForm-input-image-area-' + areaIndex + '-useHighlight'"
														class="form-check-label"
													>{{ $t( "MediaForm.areas.label-use-highlight" ) }}</label>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col">
												<div class="form-group">
													<label
														v-bind:for="'mediaForm-input-image-area-' + areaIndex + '-alt'"
													>{{ $t( "shared.accessibility.label-alt" ) }}</label>
													<i18n-input-widget
														v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-alt'"
														tag="input"
														v-bind:localeLabel="area.alt"
														class="form-control"
													></i18n-input-widget>
												</div>
											</div>
										</div>
									</div>
									<div
										v-if="area.vertices"
										class="col"
									>
										<table>
											<caption>{{ $t( "shared.label-shape-TYPE" ) }}</caption>
											<thead>
												<tr>
													<th>{{  $t( "MediaForm.areas.label-vertex-description" ) }}</th>
													<th v-bind:id="'mediaForm-label-image-area-' + areaIndex + '-axis-0'"
													>{{ $t( "shared.label_axis", "X" ) }}</th>
													<th v-bind:id="'mediaForm-label-image-area-' + areaIndex + '-axis-1'"
													>{{ $t( "shared.label_axis", "Y" ) }}</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(vertex, vertexIndex) in area.vertices">
													<td
														v-bind:id="'mediaForm-label-image-area-' + areaIndex + '-vertex-' + vertexIndex"
													>{{ $t( getLocaleLabelVertexDescription( area, vertexIndex ) ) }}</td>
													<td v-for="(axisValue, axisIndex) in vertex">
														<input
															v-bind:aria-labelledby="'mediaForm-label-image-area-' + areaIndex + '-axis-' + axisIndex"
															v-bind:aria-describedby="'mediaForm-label-image-area-' + areaIndex + '-vertex-' + vertexIndex"
															type="number"
															min="0"
															max="100"
															step="1"
															v-model="vertex[axisIndex]"
															class="form-control"
														/>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</template>
						</list-item-widget>
					</div>
				</div>
			</form>
		</section>
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