export const template =
`
<div
	role="group"
	v-bind:aria-labelledby="'asset-manager-browser-label-value_' + $attrs.id"
	v-bind:class="buttonOnly ? [ 'b-form-btn-label-control' ] : null"
	v-on:focusin="onFocusIn"
	v-on:focusout="onFocusOut"
> 
	<div
		class="b-form-btn-label-control d-flex h-auto align-items-stretch"
	>
		<b-button
			ref="button"
			type="button"
			aria-haspopup="dialog"
			v-bind:id="'asset-manager-browser-button_' + $attrs.id"
			v-bind:aria-expanded="visible ? 'true' : 'false'"
			v-on:click="visible = !visible"
	
			class="h-auto"
			v-bind:class="visible ? null : 'collapsed'"
		>
			<b-icon
				v-bind:icon="focused ? 'collection-play-fill' : 'collection-play'"
				aria-hidden="true"
			></b-icon>
		</b-button>
		<label
			v-bind:id="'asset-manager-browser-label-value_' + $attrs.id"
			v-bind:for="'asset-manager-browser-button_' + $attrs.id"
			class="form-control text-break text-wrap bg-transparent h-auto text-muted"
			v-bind:class="buttonOnly ? 'sr-only' : null"
		>{{ labelContent }}</label>
		<!-- Should we add a preview here ? -->
	</div>
	
	<div
		v-bind:aria-hidden="!visible"
	>
		<b-collapse
			ref="dialog"
			role="dialog"
			v-model="visible"
			aria-modal="false"
			v-bind:aria-labelledby="'asset-manager-browser-label-value_' + $attrs.id"
			v-on:show="setFocusOnDialog"
		>
			<b-form
				role="search"
				ref="dialogContent"
				tabindex="-1"
				autocomplete="off"
				v-on:submit.prevent="onSubmit"
			>
				<b-card
					bg-variant="light"
				>
					<b-card-header>
						<b-form-row>
							<b-col md class="d-flex">
								<b-form-input
									v-bind:id="'asset-manager-browser-input-search_' + $attrs.id"
									type="search"
									name="searchAsset"
									v-model="filter.search"
									v-on:input="updateList()"
									v-bind:placeholder="$t('AssetsManager.label-search-asset')"
									v-bind:aria-label="$t('AssetsManager.label-search-asset')"
									class="m-auto"
									aria-controls="asset-manager-browser-select-filter-list"
								>
								</b-form-input>
							</b-col>
							<b-col md >
								<b-form-group
									v-bind:label="$t('AssetsManager.label-filter-categories')"
								>
								<b-form-checkbox-group
									v-bind:id="'asset-manager-browser-checkbox-categories_' + $attrs.id"
									v-model="filter.categories"
									v-bind:options="optionsCategories"
									v-on:input="updateList()"
									name="categories"
									aria-controls="asset-manager-browser-select-filter-list"
									switches
								>
								</b-form-checkbox-group>
								</b-form-group>
							</b-col>
						</b-form-row>
					</b-card-header>
					<b-card-body>
						<b-form-row>
							<b-col md>
								<b-form-group
									v-bind:label-for="'asset-manager-browser-select-filter-list_' + $attrs.id"
									v-bind:label="$t('AssetsManager.label-result-list')"
								>
									<b-form-select
										v-bind:value="valueCurrent"
										aria-live="polite"
										v-bind:id="'asset-manager-browser-select-filter-list_' + $attrs.id"
										v-bind:select-size="6"
										v-model="selectedItem"
										required="required"
										v-bind:options="optionsAssets"
									>
									</b-form-select>	
								</b-form-group>
							</b-col>
						</b-form-row>
					</b-card-body>
					<b-card-footer>
						<b-form-row>
							<b-col md>
								<b-button
									v-bind:disabled="!selectedItem"
									type="submit"
									variant="secondary"
									v-t="'shared.label-select'"
								></b-button>
							</b-col>
						</b-form-row>
					</b-card-footer>
				</b-card>
			</b-form>
		</b-collapse>
	</div>
</div>
`