export const template =
`
<div>
<fieldset>
	<legend>{{ $t("AttributeEditorWidget.label-attributes") }}</legend>
	<div class="row">
		<div class="col">
			<div class="form-group">
				<label for="attributeEditor-input-id"
				>{{ $t("AttributeEditorWidget.label-label-id") }}</label>
				<div class="input-group mb-2">
					<div class="input-group-prepend">
						<div class="input-group-text">#</div>
					</div>
					<input
						id="attributeEditor-input-id"
						type="text"
						class="form-control"
						v-model.trim="value.id"
						v-on:keydown.space.prevent
					/>
				</div>
			</div>
		</div>
		<div class="col"
			v-if="isInteractComponent()"
		>
			<b-form-group
				v-bind:label="$t('AttributeEditorWidget.label-associated-variable-name')"
				label-for="attributeEditor-input-name"
				v-bind:description="$t('AttributeEditorWidget.label-variable-name-is-used-to-check-specific-user-input-in-branch-condition')"
			>
				<b-form-input
					id="attributeEditor-input-name"
					type="text"
					v-model="value.name"
					v-on:keydown.space.prevent
				></b-form-input>
			</b-form-group>
		</div>
	</div>
	<div
		class="row"
		v-if="component"
	>
		<b-form
			aria-labelledby="attributeEditor-input-attribute-legend"
			v-on:submit.prevent="onAddAttribute"
		>			
			<div class="col" >
				<b-table
					select-mode="single"
					responsive="md"
					selectable
					stacked="md"
					small
					v-bind:items="attributes"
					v-bind:fields="[
						{ key: 'name', label: $t('AttributeEditorWidget.label-attribute-name') },
						{ key: 'value', label: $t('AttributeEditorWidget.label-attribute-value') }
					]"

					v-on:row-selected="setCurrentAttribute"
					v-bind:show-empty="true"
					v-bind:empty-text="$t('AttributeEditorWidget.label-no-added-attributes')"
				>
				</b-table>
			</div>
			<div class="col" >
				<fieldset>
					<legend
						id="attributeEditor-input-attribute-legend"
					>{{ $t('AttributeEditorWidget.label-add-or-remove-attributes') }}</legend>
					<div class="mb-2">
						<label
							for="attributeEditor-input-attribute-name"
						>{{ $t('AttributeEditorWidget.label-attribute-name') }}</label>
						<b-form-input
							id="attributeEditor-input-attribute-name"
							v-model.trim="tempAttribute.name"
							v-on:keydown.space.prevent
							type="text"
							list="attribute-editor-attribute-list"
							required
						></b-form-input>
					</div>
					<div class="mb-2">
						<label
							for="attributeEditor-input-attribute-value"
						>{{ $t('AttributeEditorWidget.label-set-attribute-value') }}</label>
						<b-form-input
							v-bind:disabled="!tempAttribute.name"
							id="attributeEditor-input-attribute-value"
							type="text"
							list="attribute-editor-attribute-list"
							v-model="tempAttribute.value"
							required
						></b-form-input>
					</div>
					<div class="d-flex justify-content-center mb-2">
						<b-button-group>
							<b-button
								variant="success"
								type="submit"
							>{{ selectedAttribute ? $t('shared.label-save') : $t('shared.label-add') }}</b-button>
							<b-button
								size="sm"
								variant="danger"
								v-bind:disabled="!selectedAttribute"
								@click="onRemoveAttribute( selectedAttribute )" class="mr-1"
							>{{ $t('shared.label-remove') }}</b-button>
						</b-button-group>
					</div>
				</fieldset>
			</div>
		</b-form>
	</div>
</fieldset>
<div class="row">
	<div class="col">
		<attribute-class-editor-widget
			v-model="value.class"
		></attribute-class-editor-widget>
	</div>
</div>
</div>
`
