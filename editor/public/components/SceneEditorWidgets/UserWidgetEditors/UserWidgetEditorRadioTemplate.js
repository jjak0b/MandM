export const template =
		`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.label-radio-settings') }}</template>
			<b-form-row>
				<b-col>
					<b-form-group
						label-for="user-widget-radio-editor-add-element"
						v-bind:label="$t('shared.label-add-element')"
					>
					<b-form-input
						id="user-widget-radio-editor-add-element"
						v-model="newElement"
					></b-form-input>
					<b-button v-on:click="addElement()">{{ $t('shared.label-add') }}</b-button>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="user-widget-radio-editor-remove-element"
						v-bind:label="$t('shared.label-remove-element')"
					>
						<b-list-group id="user-widget-radio-editor-remove-element"> 
							<b-list-group-item 
								v-for="(option, index) in props.options" v-bind:key="option.value"
								class="d-flex justify-content-between align-items-center"
							>
								{{ option.text }}
								<b-button v-on:click="removeElement(index)">
									{{ $t('shared.label-remove') }}
								</b-button>
							</b-list-group-item>
						</b-list-group>
					</b-form-group>
				</b-col>
			</b-form-row>
		</b-form-group>
	</b-form>
</section>
<section>
	<h4 v-t="'shared.label-preview'"></h4>
	<user-widget-radio
		v-bind="props"
	></user-widget-radio>
</section>
</div>
`