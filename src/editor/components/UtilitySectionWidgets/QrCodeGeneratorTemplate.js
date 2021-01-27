export const template =
`
<b-card
	no-body
>
<b-card-header>
	<h3
	>{{ $t( 'QrCodeGenerator.label-save-qrcodes-in-one-place-and-print-them-later') }}</h3>
	<p
	>{{ $t( 'QrCodeGenerator.label-qr-codes-use-description') }}</p>
</b-card-header>
<b-card-body>
	<b-tabs
		card
		vertical
	>
		<b-tab
			v-for="(item, index) in value"
			v-bind:title="item.name"
			v-bind:key="item.name + '-' + index"	
		>
			<b-row
				class="mx-3"
			>
				<b-col
					md="4"
					class="m-auto"
				>
					<b-form-group
						v-bind:label="$t('QrCodeGenerator.label-value-stored-in-qr-code')"
						v-bind:label-for="'qr-code-generator-value-' + index"
					>
						<b-form-input
							v-bind:id="'qr-code-generator-value-' + index"
							v-model="item.value"
							autocomplete="off"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col
					md="8"
				>
					<div class="d-flex justify-content-around align-items-center">
						<qrcode
							v-bind:value="item.value || ''"
							v-bind:aria-label="$t('shared.label-qr-code')"
							v-bind:aria-description="$t('shared.label-preview')"
							v-bind:options="{
								width: settings.size
							}"
						></qrcode>
					</div>
				</b-col>
			</b-row>
			<b-row>
				<b-col class="clearfix">
					<b-button
						size="sm"
						variant="danger"
						class="float-right"
						@click="onRemove( index )"
					>{{ $t('shared.label-remove') }}</b-button>
				</b-col>
			</b-row>
		</b-tab>
		<template v-slot:tabs-end>
			<b-form
				@submit.prevent="onAdd"
				autocomplete="off"
			>
				<label
					for="qr-code-generator-new-item-name"
				>{{ $t('shared.label-add-name', { name: $t('shared.label-qr-code') } ) }}</label>		
				<b-input-group>
					<b-form-input
						id="qr-code-generator-new-item-name"
						type="text"
						v-model="newItem.name"
						required
					></b-form-input>
				<template #append>
					<b-button
						type="submit"
					>{{ $t('shared.label-add') }}</b-button>
				</template>
				</b-input-group>
			</b-form>
		</template>
		<template v-slot:empty>
			<div class="text-center text-muted">
			{{ $t('QrCodeGenerator.label-no-qr-codes') }}<br>
			{{ $t('QrCodeGenerator.label-add-named-qr-codes-for-future-use') }}
			</div>
		</template>
	</b-tabs>
</b-card-body>
</b-card>
`;