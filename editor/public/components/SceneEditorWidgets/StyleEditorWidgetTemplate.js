export const template =
`
<b-card no-body aria-labelledby="style-editor-widget-rule-tablist">
	<b-card-header id="style-editor-widget-rule-tablist">{{ $t('StyleEditorWidget.rule.label-rule-list') }}</b-card-header>
	<b-tabs card vertical
	>
		<b-tab
			v-for="(rule, ruleIndex) in rules"
			:key="'rule-' + ruleIndex"
		>
			<template v-slot:title>
				<code
					id="style-editor-widget-preview-form-selector"
					aria-live="polite"
				>{{ rule.selector }}</code>
			</template>
			<b-button variant="danger"
				v-t="'shared.label-remove'"
				v-on:click="removeRule( ruleIndex )"
			></b-button>
			<hr>
			<b-card no-body >
				<b-tabs card
				>
					<b-tab
						:key="'rule-selector' + ruleIndex"
						v-bind:title="$t('StyleEditorWidget.rule.label-css-selector-editor')"
					>
						<b-form
							id="style-editor-form-rule"
							v-on:submit.prevent
						>
							<style-selector-widget
								v-on:input="rule.selector=$event"
							></style-selector-widget>
						</b-form>
					</b-tab>
					<b-tab
						:key="'rule-data-' +  ruleIndex"
						v-bind:title="$t('StyleEditorWidget.rule.label-css-properties-editor')"
					>
						<b-tabs
							card
							vertical
						>
							<b-tab
								v-for="(property, propertyIndex ) in rule.body.properties"
							>
								<template v-slot:title>
									<code
										id="style-editor-widget-preview-form-selector"
										aria-live="polite"
									>{{ property.name + ': ' + getPropertyValue( property ) }}</code>
								</template>
								<b-form
									v-on:submit.prevent
									v-bind:key="'rule-' + ruleIndex + '-property-' + propertyIndex"
								>
									<b-button variant="danger"
										v-t="'shared.label-remove'"
										v-on:click="removeProperty( rule, propertyIndex )"
									></b-button>
									<hr>
									<ol v-if="properties[ property.name ]" >
										<li v-for="(param, paramIndex ) in properties[ property.name ].parameters">
											<b-form-group 
												v-on:submit.prevent
												v-bind:label="$tc('StyleEditorWidget.rule.property.label-parameter', {index: paramIndex+1} )"
											>
												<component
													v-bind:key="'rule-' + ruleIndex + '-property-' + propertyIndex + '-' + property.name + '-param-' + paramIndex"
													v-bind:id="'style-editor-widget-body-' + 'rule-' + ruleIndex + '-property-' + propertyIndex + '-' + property.name + '-param-' + paramIndex"
													v-if="param.options"
													:is="param.options"
													v-bind:default-values="param.defaults"
													v-model="property.values[ paramIndex ]"
												></component>
											</b-form-group>
										</li>
									</ol>
									<ol v-else>
										<li>
											<b-form-group
												v-bind:label="$tc('StyleEditorWidget.rule.property.label-parameter', {index: 0} )"
											>
												<style-string-widget
													v-bind:key="'rule-' + ruleIndex + '-property-' + propertyIndex + '-' + property.name + '-param-0'"
													v-bind:id="'style-editor-widget-body-' + 'rule-' + ruleIndex + '-property-' + propertyIndex + '-' + property.name + '-param-0'"
													v-model="property.values[ 0 ]"
												></style-string-widget>
											</b-form-group>
										</li>
									</ol>
								</b-form>
							</b-tab>
							
							<!-- New Tab Form  -->
							<template v-slot:tabs-end>							
								<b-nav-form
									v-on:submit.stop.prevent="addProperty( rule, $event )"
								>
									<div
										class="form-group"
									>
										<label
											for="style-editor-body-input-property-name"
											v-t="'StyleEditorWidget.rule.label-add-property-name'"
										></label>
										<b-form-input
											id="style-editor-body-input-property-name"
											type="text"
											class="mr-1"
											name="property-name"
											list="style-editor-body-datalist-properties"
											required="required"
										></b-form-input>
										<datalist
											id="style-editor-body-datalist-properties"
										>
											<option
												v-for="(propertyData, property) in properties"
												v-bind:value="property"	
											>{{ property }}</option>
										</datalist>
									</div>
									<b-button
										type="submit"
										v-t="'shared.label-add'"
									></b-button>
								</b-nav-form>
							</template>
					
							<!-- Render this if no tabs -->
							<template v-slot:empty>
								<p
									id="style-editor-body-empty-description"
									class="text-center text-muted"
								>
									{{ $t('StyleEditorWidget.label-no-property') }}<br>
									{{ $t('StyleEditorWidget.label-add-property-to-edit') }}
								</p>
							</template>
						</b-tabs>
					</b-tab>
				</b-tabs>
			</b-card>
		</b-tab>
		
		<!-- New Tab Button  -->
		<template v-slot:tabs-end>
			<b-nav-item
				role="presentation"
				v-on:click.prevent="addRule" href="#"
			><b>{{ $t('shared.label-add') }}</b></b-nav-item>
		</template>

		<!-- Render this if no tabs -->
		<template v-slot:empty>
			<p
				id="style-editor-empty-description"
				class="text-center text-muted"
			>
				{{ $t('StyleEditorWidget.label-no-CSS-rule') }}<br>
				{{ $t('StyleEditorWidget.label-add-rule-to-edit') }}
			</p>
		</template>
	</b-tabs>
</b-card>
`;
