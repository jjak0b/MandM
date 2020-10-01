export const template =
		`
<div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.label-radio-settings') }}</template>
			<b-form-row>
				<b-form-group
					label-for="user-widget-radio-editor-add-element"
					v-bind:label="$t('shared.label-add-element')"
				>
				<input-val
					v-on:inputValueSubmit="addElement"
					v-on:input="onInput">
				</input-val>
				<b-button 
				class="m-3 float-right"
				v-on:click="addElement()">
				{{ $t('shared.label-add') }}</b-button>
				</b-form-group>
			</b-form-row>
			<b-form-row>
					<b-col>
						<b-form-group
							label-for="user-widget-radio-editor-preview"
							v-bind:label="$t('shared.label-preview')"
						>
							<user-widget-radio
								id="user-widget-radio-editor-preview"
								v-bind="props"
							></user-widget-radio>
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
								>
									{{ option.text }}
									<b-button class="float-right" v-on:click="removeElement(index)">
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
</div>
`