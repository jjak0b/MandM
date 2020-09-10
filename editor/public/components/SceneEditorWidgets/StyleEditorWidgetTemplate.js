export const template =
	`
<div>
<div class="row">
	<section class="col" id="style-editor-widget-section-rules">
		<label for="style-editor-form-rule">{{ $t( "StyleEditorWidget.label-add-CSS-rule") }}</label>
		<form
			id="style-editor-form-rule"
			v-on:submit.prevent
		>
			<style-selector-widget
				v-on:input="selector=$event"
				aria-controls="style-editor-widget-preview-form-selector"
			></style-selector-widget>
			<div>
				<p><code
						id="style-editor-widget-preview-form-selector"
						aria-live="polite"
					>{{selector}}</code></p>
			</div>
			<div class="form-group">
				<button
					type="submit"
					class="btn btn-primary"
				>{{ $t("shared.label-add") }}</button>
			</div>
		</form>
		
		<list-item-widget
			tag="ul"
			v-bind:list="rules"
		>
			<template
				v-slot:item="{ item: rule, keyItem: ruleIndex }"
			>
				<div class="row">
					<div class="col">
						<div>
							<label
								v-bind:for="'style-editor-rule-' + ruleIndex + '-input-property-name'"
							>{{ $t("StyleEditorWidget.rule.label-add-property") }}</label>
							<input
								v-bind:id="'style-editor-rule-' + ruleIndex + '-input-property-name'"
								type="text"
								list="style-editor-datalist-properties"
								class="form-control"
							/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						
					</div>
				</div>
			</template>
		</list-item-widget>
		<datalist
			id="style-editor-datalist-properties"
		>
			<option
				v-for="(propertyData, property) in properties"
				v-bind:value="property"	
			>{{ property }}</option>
		</datalist>
	</section>
</div>
<div class="row">
	<section class="col" id="StyleEditorWidget-section-edit">
		<!-- Component of selected property -->
		<component
			v-if="false"
			:is="properties[ value[0] ].options"
			v-model="value[1]"
		></component>
	</section>
</div>
</div>
`;