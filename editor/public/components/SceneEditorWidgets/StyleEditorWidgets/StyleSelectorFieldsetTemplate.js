export const template =
	`
<div class="form-group">
	<legend>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-entity-selector") }}</legend>
	<div class="row">
		<div class="col">
			<div class="form-check">
				<input
					id="style-selector-input-use-custom"
					type="checkbox"
					v-model="shouldUseCustomSelector"
					class="form-check-input"
					v-bind:aria-controls="$attrs['aria-controls']"
				/>
				<label
					for="style-selector-input-use-custom"
					class="form-check-label"
				>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-use-custom-selector" ) }}</label>
			</div>
		</div>
	</div>
	<div v-if="shouldUseCustomSelector"
		class="row"
	>
		<div class="col">
			<p
				id="style-selector-label-warning-custom-selector"
				class="alert alert-warning"
				role="alert"
			>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-warning-assuming-advanced-user" ) }}</p>
			<div class="form-group">
				<label
					for="style-selector-input-custom-selector"
				>{{$t( "StyleEditorWidget.StyleSelector.selector.label-insert-custom-selector" )}}</label>
				<input
					id="style-selector-input-custom-selector"
					required="required"
					type="text"
					v-model="selector.custom"
					class="form-control"
					v-bind:aria-controls="$attrs['aria-controls']"
					aria-describedby="style-selector-label-warning-custom-selector"
				/>
			</div>
		</div>
	</div>
	<div v-else>
		<div class="row" >
			<div class="col">
				<div class="form-group">
					<label for="style-selector-input-element"
					>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-element") }}</label>
					<div class="input-group mb-2">
						<div class="input-group-prepend" role="presentation">
							<div role="presentation" class="input-group-text">&lt;</div>
						</div>
						<input
							id="style-selector-input-element"
							type="text"
							v-model="selector.tag"
							class="form-control"
							v-bind:aria-controls="$attrs['aria-controls']"
						/>
						<div class="input-group-append" >
							<div role="presentation" class="input-group-text">&sol;&gt;</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="form-group">
					<label for="style-selector-input-class"
					>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-class") }}</label>
					<div class="input-group mb-2">
						<div class="input-group-prepend">
							<div role="presentation" class="input-group-text">.</div>
						</div>
						<input
							id="attributeEditor-input-class"
							type="text"
							v-model="selector.class"
							class="form-control"
							v-bind:aria-controls="$attrs['aria-controls']"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="form-group">
					<label for="style-selector-input-id"
					>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-id") }}</label>
					<div class="input-group mb-2">
						<div class="input-group-prepend">
							<div role="presentation" class="input-group-text">#</div>
						</div>
						<input
							id="style-selector-input-id"
							type="text"
							v-model="selector.id"
							class="form-control"
							v-bind:aria-controls="$attrs['aria-controls']"
						/>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col">
				<fieldset class="form-group">
					<legend>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-attribute-selector") }}</legend>
					<div class="row">
						<div class="col-4">
							<div class="form-group text-wrap">
								<label
									for="style-selector-input-attr-name"
								>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-attribute-name") }}</label>
								<input
									id="style-selector-input-attr-name"
									type="text"
									v-model="selector.attrName"
									class="form-control"
									v-bind:aria-controls="$attrs['aria-controls']"
								/>
							</div>				
						</div>
						<div class="col-4">
							<div class="form-group text-wrap">
								<label
									for="style-selector-input-attrOp"
								>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-attribute-check-operator") }}</label>
								<select
									id="style-selector-input-attrOp"
									v-model="selector.attrOp"
									class="form-control"
									v-bind:aria-controls="$attrs['aria-controls']"
								>
									<option
										v-bind:value="null"
										selected="selected"
										disabled
									>{{ $t( "shared.label-select-option") }}</option>
									<option
										value="="
									>{{ $t( "StyleEditorWidget.StyleSelector.selector.attributeOp.label-equals") }}</option>
									<option
										value="~="
									>{{ $t( "StyleEditorWidget.StyleSelector.selector.attributeOp.label-contains-word") }}</option>
									<option
										value="^="
									>{{ $t( "StyleEditorWidget.StyleSelector.selector.attributeOp.label-start-with") }}</option>
									<option
										value="$="
									>{{ $t( "StyleEditorWidget.StyleSelector.selector.attributeOp.label-end-with") }}</option>
									<option 
										alue="*="
									>{{ $t( "StyleEditorWidget.StyleSelector.selector.attributeOp.label-contains") }}</option>
								</select>
							</div>
						</div>
						<div class="col-4">
							<div class="form-group text-wrap">
								<label
									for="style-selector-input-attr-value"
								>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-attribute-value") }}</label>
								<input
									id="style-selector-input-attr-value"
									type="text"
									v-model="selector.attrValue"
									class="form-control"
									v-bind:aria-controls="$attrs['aria-controls']"
								/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div class="form-group">
								<div class="form-check">
									<input
										id="style-selector-input-attr-insensitive"
										type="checkbox"
										value="i"
										v-model="selector.case"
										class="form-check-input"
										v-bind:aria-controls="$attrs['aria-controls']"
									/>
									<label
										for="style-selector-input-attr-insensitive"
										class="form-check-label"
									>{{ $t( "StyleEditorWidget.StyleSelector.selector.label-match-case-insensitive") }}</label>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col">
				<div class="form-group">
					<label
						for="style-selector-input-pseudo-class"
					>{{ $t("StyleEditorWidget.StyleSelector.selector.label-pseudo-class") }}</label>
					<div class="input-group mb-2">
						<div class="input-group-prepend">
							<div role="presentation" class="input-group-text">:</div>
						</div>
						<input
							id="style-selector-input-pseudo-class"
							list="style-selector-datalist-pseudo-class"
							type="text"
							v-model="selector.pseudoClass"
							class="form-control"
							v-bind:aria-controls="$attrs['aria-controls']"
						>
						<datalist
							id="style-selector-datalist-pseudo-class"
						>
							<option
								v-for="pseudoClass in pseudo.classes"
								v-bind:value="pseudoClass"
							>{{ pseudoClass }}</option>
						</datalist>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="form-group">
					<label
						for="style-selector-input-pseudo-element"
					>{{ $t("StyleEditorWidget.StyleSelector.selector.label-pseudo-element") }}</label>
					<div class="input-group mb-2">
						<div class="input-group-prepend">
							<div role="presentation" class="input-group-text">::</div>
						</div>
						<input
							id="style-selector-input-pseudo-element"
							list="style-selector-datalist-pseudo-element"
							type="text"
							v-model="selector.pseudoElement"
							class="form-control"
							v-bind:aria-controls="$attrs['aria-controls']"
						>
						<datalist
							id="style-selector-datalist-pseudo-element"
						>
							<option
								v-for="pseudoElement in pseudo.elements"
								v-bind:value="pseudoElement"
							>{{ pseudoElement }}</option>
						</datalist>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`