export const template =
`
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
				<button type="reset" class="form-control btn btn-danger"></button>
			</div>
		</form>
	</section>
	<section class="col">
		<i18n-media-player-widget ref="preview"
			v-if="shouldPreview()"
			v-bind:value="value"
			v-bind:locale="locale"
		></i18n-media-player-widget>
	</section>
</div>
`;