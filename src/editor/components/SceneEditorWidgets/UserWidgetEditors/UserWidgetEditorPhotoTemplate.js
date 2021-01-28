export const template =
	`
<section
	aria-labelledby="user-widget-editor-photo-h"
>
	<h3
		id="user-widget-editor-photo-h"
	>{{ $t('UserWidgets.label-photo-settings') }}</h3>
	<form
		@submit.prevent	
	>
		<b-form-row>
			<b-col>
				<b-form-group
					v-bind:label="$t( 'UserWidgets.Photo.label-select-type-media' )"
					label-for="user-widget-editor-photo-capture"
					aria-live="polite"
					
				>
					<b-form-select
						id="user-widget-editor-photo-accept"
						v-bind:options="[
							{value: 'image/*', text: $t( 'media.label-images' ) },
							{value: 'video/*', text: $t( 'media.label-videos' ) },
							{value: 'audio/*', text: $t( 'media.label-audios' ) }
						]"
						v-model="component.props.accept"
						class="w-auto mb-2"
					>
						<template #first>
							<b-form-select-option
								v-bind:value="null"
								disabled
							>{{ $t('shared.label-select-option' )  }}</b-form-select-option>
						</template>
					</b-form-select>
					<b-form-radio-group
						stacked
						class="w-auto mb-2"
						v-if="component.props.accept == 'image/*'"
						id="user-widget-editor-photo-capture"
						v-model="component.props.capture"
						v-bind:options="[
							{value: 'user', text: $t('UserWidgets.Photo.cameraType.front' ) },
							{value: 'enviroment', text: $t('UserWidgets.Photo.cameraType.back' ) }
						]"
					></b-form-radio-group>
				</b-form-group>
			</b-col>
		</b-form-row>
	</form>
	<br/>
	<section
		aria-labelledby="user-widget-editor-photo-preview-h"
	>
		<h4
			id="user-widget-editor-photo-preview-h"
			v-t="'shared.label-preview'"
		></h4>
		<user-widget-photo
			v-bind="component.props"
		></user-widget-photo>
	</section>
</section>
`;