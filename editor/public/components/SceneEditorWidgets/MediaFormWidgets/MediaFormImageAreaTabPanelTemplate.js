export const template =
`
<b-tab>
	<template v-slot:title>
		<span v-t="labelShapeTypes[ area.shape ]"></span>
	</template>
	<b-form
		v-on:submit.prevent
		v-on:mouseover="$emit('highlight')"
		v-on:mouseout="$emit('unhighlight')"
	>
		<div class="row">
			<div class="col-auto">
				<b-button
					size="sm"
					variant="danger"
					v-on:click="$emit('remove')"
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
						v-on:change="onChangeAreaLinkType"
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
				<b-form-group
					:key="'href-anchor-' + areaIndex"
					v-if="area.hrefType == 'anchor'"
					v-bind:label="$t('MediaForm.areas.label-add-anchor-to-scroll-onto-when-triggered')"
					v-bind:label-for="'mediaForm-input-image-area-' + areaIndex + '-action-anchor'"
					v-bind:invalid-feedback="$t('MediaForm.areas.label-anchor-warning-no-element-found')"
					v-bind:valid-feedback="$t('shared.label-valid')"
					v-bind:state="isValidAnchor"
				>
					<b-form-input
						v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-action-anchor'"
						type="text"
						required="required"
						v-on:input="area.href = $event ? '#'+$event : null"
						v-bind:value="area.href && area.href.length > 1 ? area.href.substr( 1, area.href.length-1) : null"
						v-on:keydown.space.prevent
					></b-form-input>
				</b-form-group>
				<b-form-group
					:key="'href-url-' + areaIndex"
					v-else-if="area.hrefType == 'url'"
					v-bind:label="$t('MediaForm.areas.label-add-url-to-open-when-triggered')"
					v-bind:label-for="'mediaForm-input-image-area-' + areaIndex + '-action-url'"
					v-bind:state="isValidURL"
					v-bind:valid-feedback="$t('shared.label-valid')"
				>
					<b-form-input
						v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-action-url'"
						type="url"
						name="url"
						v-model="area.href"
						required="required"
						v-on:keydown.space.prevent
					></b-form-input>
					<template v-slot:invalid-feedback>
						<h5 v-t="'MediaForm.areas.label-url-invalid'"></h5>
						<p>{{ $t("MediaForm.areas.label-url-invalid-example", "https://www.google.it") }}</p>
					</template>
				</b-form-group>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<!-- TODO: Temp; replace this with interactable form component for return value and event-->
				<b-form-group
					v-bind:label="$t('MediaForm.areas.label-set-value-to-return-as-player-input')"
					v-bind:label-for="'mediaForm-input-image-area-' + areaIndex + '-action-returnValue'"
				>
					<b-form-input
						v-bind:id="'mediaForm-input-image-area-' + areaIndex + '-action-returnValue'"
						type="text"
						name="return"
						v-model="area.value"
						required="required"
						v-on:keydown.space.prevent
					></b-form-input>
					<template v-slot:invalid-feedback>
						<h5 v-t="'MediaForm.areas.label-url-invalid'"></h5>
						<hr>
						<p>{{ $t("MediaForm.areas.label-url-invalid-example", "https://www.google.it") }}</p>
					</template>
				</b-form-group>
			</div>
		</div>
		<div class="row" v-if="area.vertices">
			<div class="col">
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
							>{{ $t( getLocaleLabelVertexDescription( vertexIndex ) ) }}</td>
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
	</b-form>
</b-tab>
`