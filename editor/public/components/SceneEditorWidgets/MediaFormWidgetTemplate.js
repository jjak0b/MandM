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
								v-on:change="onFileload($event, 'main')"
								v-on:change="updateSource()"
								v-on:change="updateCaptions()"
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
								v-on:change="onFileload($event, 'main')"
								v-on:change="updateSource()"
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
								v-on:change="updateSource()"
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
								v-on:change="onFileload($event, 'captions' )"
								v-on:change="updateCaptions()"
								v-on:change="updateSource()"
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
			<form v-on:submit.prevent>
				<b-card no-body>
					<b-tabs card vertical>
						<b-tab
							v-for="(area, areaIndex) in value.areas"
							:key="areaIndex"
						>
							<template v-slot:title>
								<span v-t="labelShapeTypes[ area.shape ]"></span>
							</template>
							<div
								v-on:mouseover="$refs.preview.highlightMapArea( areaIndex )"
								v-on:mouseout="$refs.preview.unHighlightMapArea( areaIndex )"
							>
								<div class="col">
									<div class="row">
										<div class="col-auto">
											<b-button
												size="sm"
												variant="danger"
												v-on:click="onRemoveArea( areaIndex )"
												class="float-right"
												v-t="'shared.label-remove'"
											></b-button>
										</div>
										<div class="col-auto">
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
													v-bind:locale="locale"
													v-bind:locale-label="area.alt"
													class="form-control"
												></i18n-input-widget>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col">
											<div class="form-group">
												<label
													v-bind:for="'mediaForm-input-image-area-' + areaIndex + '-link-interaction'"
													v-t="'MediaForm.label-select-link-interaction'"
												></label>
												<select
													v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-link-interaction'"
													name="link-interaction"
													v-on:change="onChangeAreaLinkType( areaIndex, $event )"
													class="form-control"
												>
													<option
														selected="selected"
														value="none"
														v-t="'shared.label-none'"
													></option>
													<option
														value="anchor"
														v-t="'MediaForm.areas.actions.label-navigate-to-page-element'"
													></option>
													<option
														value="url"
														v-t="'MediaForm.areas.actions.label-open-url-new-tab'"
													></option>
												</select>
											</div>
										</div>
										<div class="col" >
											<input-validator
												v-if="area.hrefType == 'anchor'"
												key="interaction-anchor"
												v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-action-anchor'"
												type="text"
												name="anchor"
												required="required"
												v-on:keydown.space.prevent
												v-on:valid="area.href = '#' + $event"
												v-bind:value="area.href"
												v-bind:isValidCallback="(e) => (!e.value || document.getElementById(e.value)) ? null : 1"
											>
												<template v-slot:default="">{{ $t("MediaForm.areas.label-add-anchor-to-scroll-onto-when-triggered") }}</template>
												<template v-slot:warning="">{{ $t("MediaForm.areas.label-anchor-warning-no-element-found") }}</template>
											</input-validator>
											<input-validator
												v-else-if="area.hrefType == 'url'"
												key="interaction-url"
												v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-action-url'"
												type="url"
												name="url"
												required="required"
												v-on:keydown.space.prevent
												v-on:valid="area.href = $event"
												v-bind:value="area.href"
											>
											{{ $t("MediaForm.areas.label-add-url-to-open-when-triggered") }}
											<template v-slot:error="">
												<h5 v-t="'MediaForm.areas.label-url-invalid'"></h5>
												<p>{{ $t("MediaForm.areas.label-url-invalid-example", "https://www.google.it") }}</p>
											</template>
											</input-validator>
										</div>
									</div>
									<div class="row">
										<div class="col">
											<!-- TODO: Temp; replace this with interactable form component for return value and event-->
											<input-validator
												id="mediaForm-input-image-area-action-returnValue"
												type="text"
												name="return"
												v-model="area.value"
											>{{ $t("MediaForm.areas.label-set-value-to-return-as-player-input") }}</input-validator>
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
						</b-tab>
					</b-tabs>
				</b-card>
			</form>
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