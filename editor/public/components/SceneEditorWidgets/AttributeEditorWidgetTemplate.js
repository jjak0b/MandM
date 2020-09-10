export const template =
`
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
						tyoe="text"
						class="form-control"
						v-model="value.id"
						v-bind:value="value.id"
						v-on:input="$set( value, 'id', $event.target.value.trim() )"
						
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<label>{{$t('AttributeEditorWidget.label-classes')}}</label>
			<list-item-widget
				tag="ul"
				v-bind:list="value.class"
				class="h-100"
			>
				<template
					v-slot:item="{ item: className, keyItem: classIndex }"
				>
					<div>
						<button
							type="button"
							v-on:click="value.class.splice( classIndex, 1)"
							v-bind:title="$t('shared.label-remove')"
							v-bind:aria-describedby="'attributeEditor-remove-class-' + classIndex"
							class="btn btn-danger float-left"
						><span role="img" class="glyphicon glyphicon-trash"></span></button>
						<div class="d-flex justify-content-center">
							<label
								v-bind:id="'attributeEditor-remove-class-' + classIndex"
							>{{ className }}</label>
						</div>
					</div>
				</template>
			</list-item-widget>
		</div>
		<div class="col">
			<form
				v-on:submit.prevent="onAddClass"
			>
				<div class="row">
					<div class="col">
						<div class="form-group">
							<label for="attributeEditor-input-class"
							>{{ $t( "StyleEditorWidget.selector.label-class") }}</label>
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text">.</div>
								</div>
								<input
									id="attributeEditor-input-class"
									type="text"
									name="classnameCustom"
									class="form-control"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-group">
							<label
								for="attributeEditor-select-class"
							>{{ $t( "StyleEditorWidget.bootstrap.label-bootstrap-classes") }}</label>
							<select
								id="attributeEditor-select-class"
								class="form-control"
								name="classnameLib"
							>
								<option
									hidden="hidden"
									disabled="disabled"
									selected="selected"
									value=""
								></option>
								<optgroup
									v-for="(classList, category) in classes"
									v-bind:label="$t( localeLabels.classes[ category ] )">
									<option
										v-for="classname in classList"
										v-bind:value="classname"
									>{{ classname }}</option>						
								</optgroup>
							</select>
							<div>
								<a
									href="https://getbootstrap.com/docs/4.5/"
									target="_blank"
									rel="help"
									class="text-wrap"
								>{{ $t( "StyleEditorWidget.bootstrap.label-visit-documentation-for-class-info") }}</a>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="btn-group mx-auto">
							<button
								type="submit"
								class="btn btn-success"
							>{{ $t("shared.label-add") }}</button>
							<button
								type="reset"
								class="btn btn-warning"
							>{{ $t("shared.label-reset") }}</button>
						</div>									
					</div>
				</div>
			</form>
		</div>
	</div>
</fieldset>
`
