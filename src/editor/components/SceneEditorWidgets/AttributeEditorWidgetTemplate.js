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
						type="text"
						class="form-control"
						v-model.trim="value.id"
						v-on:keydown.space.prevent
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<b-form-group
				v-bind:label="$t( 'AttributeEditorWidget.label-classes' )"
			>
				<div class="row">
					<div class="col">
						<label for="attributeEditor-input-classes">{{$t('AttributeEditorWidget.label-current-classes')}}</label>
						 <b-form-tags
							tag-pills
							tag-variant="secondary"
							size="lg"
							input-id="attributeEditor-input-classes"
							v-model="value.class"
							separator=" ,;"
							remove-on-delete
							v-bind:tag-validator="isClassValid"
							v-bind:add-button-text="$t('shared.label-add')"
							add-button-variant="success"
							v-bind:duplicate-tag-text="$t('AttributeEditorWidget.label-duplicate-classes')"
							v-bind:placeholder="$t('AttributeEditorWidget.label-placeholder-insert-class')"
						></b-form-tags>
					</div>
					<div class="col">
						<div class="row">
							<div class="col">
								<b-form-group
									v-bind:label="$t( 'StyleEditorWidget.bootstrap.label-bootstrap-classes' )"
									label-for="attributeEditor-select-class"
								>
									<div class="input-group mb-2">
										<div class="input-group-prepend">
											<div class="input-group-text">.</div>
										</div>
									<b-form-select
										id="attributeEditor-select-class"
										class="form-control"
										name="classnameLib"
										v-model="selectedBootstrapClass"
										aria-describedby="attributeEditor-bootstrap-info"
									>
										<template #first>
											 <b-form-select-option
												v-bind:value="null"
												disabled
												v-t="'shared.label-select-option'"
											 ></b-form-select-option>
										</template>
										<b-form-select-option-group
											v-for="(classList, category) in classes"
											v-bind:key="'class-category:' + category"
											v-bind:label="$t( localeLabels.classes[ category ] )"
											v-bind:options="classList"
										></b-form-select-option-group>
									</b-form-select>
										<div class="input-group-append">
											<b-button
												type="button"
												variant="success"
												v-t="'shared.label-add'"
												v-on:click="onAddClass(selectedBootstrapClass)"
												v-bind:disabled="isLibAddButtonDisabled"
											>
											</b-button>
										</div>
									</div>
									<template #description>
										<a
											id="attributeEditor-bootstrap-info"
											href="https://getbootstrap.com/docs/4.5/"
											target="_blank"
											rel="help"
											class="text-wrap"
										>{{ $t( "StyleEditorWidget.bootstrap.label-visit-documentation-for-class-info") }}</a>
									</template>
								</b-form-group>
							</div>
						</div>
					</div>
				</div>
			</b-form-group>
		</div>
	</div>
</fieldset>
`
