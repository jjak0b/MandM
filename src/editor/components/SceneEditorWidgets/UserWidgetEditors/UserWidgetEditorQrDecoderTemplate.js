export const template =
`
<section
	aria-labelledby="user-widget-editor-qr-decoder-h"
>
	<h3
		id="user-widget-editor-qr-decoder-h"
	>{{ $t('UserWidgets.QrDecoder.label-qr-decoder-settings') }}</h3>
	<div class="row">
		<div class="col">
			<form>
				<i18n-input-widget
					id="user-widget-editor-qr-decoder-label"
					tag="input"
					v-bind:label="$t( 'UserWidgets.QrDecoder.label-label-qr' )"
					name="QrLabel"
					type="text"
					v-bind:locale="locale"
					v-bind:locale-label="component.props.label"
				></i18n-input-widget>
				<b-form-group
					v-bind:label="$t( 'UserWidgets.QrDecoder.label-error-message' )"
					v-bind:description="$t('UserWidgets.QrDecoder.label-error-message-to-show-if-no-qr-has-been-detected-after-use' )"
				>
					<div class="row">
						<div class="col justify-content-center">
							<label
								for="user-widget-editor-qr-decoder-message-error-id"
							>{{ $t('UserWidgets.QrDecoder.label-id-of-message') }} </label>	
							<b-form-input
								id="user-widget-editor-qr-decoder-message-error-id"
								v-model.trim="component.props.errorMessage.id"
								v-on:keydown.space.prevent
								class="mb-2"
							></b-form-input>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<i18n-input-widget
								id="user-widget-editor-qr-decoder-message-error-title"
								tag="input"
								v-bind:label="$t( 'UserWidgets.QrDecoder.label-error-message-title' )"
								name="QrLabelTitleError"
								type="text"
								v-bind:locale="locale"
								v-bind:locale-label="component.props.errorMessage.title"
							></i18n-input-widget>
						</div>
						<div class="col">
							<i18n-input-widget
								id="user-widget-editor-qr-decoder-message-error-body"
								tag="textarea"
								v-bind:label="$t( 'UserWidgets.QrDecoder.label-error-message-content' )"
								name="QrLabelBodyError"
								type="text"
								v-bind:locale="locale"
								v-bind:locale-label="component.props.errorMessage.body"
							></i18n-input-widget>
						</div>
					</div>
				</b-form-group>
			</form>
			<section
				aria-labelledby="user-widget-editor-qr-decoder-prevew-h"
			>
				<h4
					id="user-widget-editor-qr-decoder-prevew-h"
					v-t="'shared.label-preview'"
				></h4>
				<user-widget-qr
					id="user-widget-editor-qr-preview"
					v-bind:locale="locale"
					v-bind="component.props"
					v-model="previewDecodedValue"
				></user-widget-qr>
				<br>
				<div
					aria-live="polite"
				>
					<strong>{{$t('UserWidgets.QrDecoder.label-detected-result')}} :</strong>
					<mark><output v-if="previewDecodedValue">{{ previewDecodedValue.toString() }}</output></mark>
				</div>
			</section>
		</div>
	</div>
</section>
`;