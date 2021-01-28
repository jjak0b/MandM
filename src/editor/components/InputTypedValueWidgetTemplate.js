export const template =
`
<div v-on:reset="reset">
		<b-form-group
			v-bind:label="$t('DataEditorWidget.label-value-type')"
			v-bind:label-for="$attrs.id + '_data-editor-widget-select-type'"
		>
			<b-form-select
				v-bind:id="$attrs.id + '_data-editor-widget-select-type'"
				v-model="typedValue.type"
				required
			>
				<template #first>
					<b-form-select-option v-bind:value="null" disabled v-t="'shared.label-select-option'"
					></b-form-select-option>
				</template>
				<b-form-select-option
					v-for="type in acceptTypes"
					v-bind:key="type"
					v-bind:value="type"
				>{{ $t(componentContext[ type ].i18n.type) }}</b-form-select-option>
			</b-form-select>
		</b-form-group>
		<b-form-group
			v-if="typedValue.type"
			v-bind:label="componentDataForType.i18n ? $t( componentDataForType.i18n.type ) : typedValue.type"
			v-bind:label-for="$attrs.id + '_data-editor-widget-atom-' + typedValue.type"
			v-bind:description="componentDataForType.i18n.description ? $t( componentDataForType.i18n.description, { type: componentDataForType.i18n.type } ) : null"
		>
			<component
				v-if="componentDataForType"
				v-bind:key="'atom-' + typedValue.type"
				v-bind:id="$attrs.id + '_data-editor-widget-atom-' + typedValue.type"
				v-bind:is="componentDataForType.component"
				v-bind="componentDataForType.attrs"
				v-model="typedValue.value"
				required
			></component>
		</b-form-group>
</div>
`;

export const templateArray =
`
<b-form
	autocomplete="off"
	@submit.prevent.stop
>
	<fieldset>
		<legend v-t="'shared.label-Array-info'"></legend>
		<b-form-row>
			<b-col>
		
				<input-value-widget
					v-on:taketype="type = $event"
					v-on:input="tmpValue = $event"
				>
				</input-value-widget>
				<b-button
					v-bind:disabled="tmpValue == null"
					variant="primary"
					v-t="'shared.label-add'"
					v-on:click="add"
				></b-button>
			</b-col>
			<b-col>
				
				<label
					v-bind:id="$attrs.id + '_data-editor-widget-array-values'"
					v-t="'DataEditorWidget.label-values'"
				></label>
				<b-row no-gutters>
					<b-col>
						<b-form-select
							v-bind:id="$attrs.id"
							v-bind:aria-describedby="$attrs.id + '_data-editor-widget-array-values'"
							v-model="selectedIndex"
							v-bind:options="bufferOptions"
							v-bind:select-size="6"
						></b-form-select>
					</b-col>
					<b-col class="align-self-center">
						<b-button-group v-if="selectedIndex != null"
							tag="span"
							v-bind:aria-controls="$attrs.id"
							class="d-flex justify-content-around"
						>
							<b-button-group
								size="sm"
								vertical
								tag="span"
							>
								<b-button
									variant="secondary"
									v-bind:title="$t('shared.label-move-up')"
									v-bind:aria-label="$t('shared.label-move-up')"
									v-bind:disabled="selectedIndex <= 0"
									v-on:click="move( selectedIndex, -1 )"
								>
									<span
										class="glyphicon glyphicon-arrow-up"
										role="img"
										aria-hidden="true"
									></span>
								</b-button>
								
								<b-button
									variant="secondary"
									v-bind:title="$t('shared.label-move-down')"
									v-bind:aria-label="$t('shared.label-move-down')"
									v-bind:disabled="selectedIndex >= buffer.length - 1"
									v-on:click="move( selectedIndex, 1 )"	
								>
									<span
										class="glyphicon glyphicon-arrow-down"
										role="img"
										v-bind:title="$t('shared.label-move-down')"
										aria-hidden="true"
									></span>
								</b-button>
							</b-button-group>
							
							<span class="my-auto">
								<b-button
									variant="danger"
									v-on:click="buffer.splice( selectedIndex, 1)"
								>{{ $t('shared.label-remove') }}</b-button>
							</span>
						</b-button-group>
					</b-col>
				</b-row>
			</b-col>
		</b-form-row>
	</fieldset>
</b-form>
`