export const template =
`
<div
	role="group"
	v-bind:aria-labelledby="'asset-manager-browser-label-value_' + $attrs.id"
	v-bind:class="buttonOnly ? [ 'b-form-btn-label-control', 'btn-group' ] : null"
> 
	<div
		class="b-form-btn-label-control form-control d-flex h-auto align-items-stretch"
		tabindex="-1"
	>
		<button
			ref="button"
			type="button"
			aria-haspopup="dialog"
			v-bind:id="'asset-manager-browser-button_' + $attrs.id"
			v-bind:aria-expanded="visible ? 'true' : 'false'"
			v-on:click="visible = !visible"
	
			class="btn h-auto"
			v-bind:class="visible ? null : 'collapsed'"
		>
			<b-icon
				v-bind:icon="focused ? 'collection-play-fill' : 'collection-play'"
				aria-hidden="true"
			></b-icon>
		</button>
		<label
			v-bind:id="'asset-manager-browser-label-value_' + $attrs.id"
			v-bind:for="'asset-manager-browser-button_' + $attrs.id"
			class="form-control text-break text-wrap bg-transparent h-auto text-muted"
			v-bind:class="buttonOnly ? 'sr-only' : null"
		>{{ labelContent }}</label>
		<!-- Should we add a preview here ? -->
	</div>
	
	<div class="position-relative"
	>
		<b-collapse
			ref="dialog"
			role="dialog"
			v-model="visible"
			tabindex="-1"
			aria-modal="false"
			v-bind:aria-labelledby="'asset-manager-browser-label-value_' + $attrs.id"
			v-on:show="setFocusOnDialog"
			class="position-absolute m-2"
		>
			<b-form
				ref="dialogContent"
				tabindex="-1"
				v-on:submit.prevent="onSubmit"
			>
				<b-card
					bg-variant="light"
					text-variant="light"
				>
					<b-card-header>
						<b-form-row>
							<b-col md class="d-flex">
								<b-form-input
									id="asset-manager-browser-input-search"
									type="search"
									name="searchAsset"
									v-model="filter.search"
									v-bind:placeholder="$t('AssetManager.label-search-asset')"
									v-bind:aria-label="$t('AssetManager.label-search-asset')"
									class="m-auto"
									v-on:input="updateList()"
									aria-controls="asset-manager-browser-select-filter-list"
								>
								</b-form-input>
							</b-col>
							<b-col md >
								<b-form-checkbox-group
									id="asset-manager-browser-checkbox-categories"
									v-model="filter.categories"
									v-bind:options="optionsCategories"
									v-on:checked="updateList()"
									name="categories"
									aria-controls="asset-manager-browser-select-filter-list"
									switches
								>
								</b-form-checkbox-group>
							</b-col>
						</b-form-row>
					</b-card-header>
					<b-card-body>
						<b-form-row>
							<b-col md>
								<b-form-group
									label-for="asset-manager-browser-select-filter-list"
									v-bind:label="$t('AssetManager.label-result-list')"
								>
									<b-form-select
										v-bind:value="valueCurrent"
										aria-live="polite"
										id="asset-manager-browser-select-filter-list"
										select-size="6"
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