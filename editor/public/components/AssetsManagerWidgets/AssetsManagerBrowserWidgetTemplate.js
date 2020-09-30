export const template =
`
<b-form
	v-on:submit.prevent
>
	<b-row>
		<b-col md >
			<b-form-input
				id="asset-manager-browser-input-search"
				type="search"
				name="searchAsset"
				v-model="filter.search"
				v-bind:placeholder="$t('AssetManager.label-search-asset')"
				v-bind:aria-label="$t('AssetManager.label-search-asset')"
				class="m-auto"
				v-on:input="updateList()"
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
				switches
			>
			</b-form-checkbox-group>
		</b-col>
	</b-row>
	
	<b-form-group
		label-for="asset-manager-browser-select-filter-list"
		v-bind:label="$t('AssetManager.label-result-list')"
	>
		<b-form-select
			id="asset-manager-browser-select-filter-list"
			select-size="6"
			v-model="selectedItem"
			required="required"
			v-bind:options="optionsAssets"
		>
		</b-form-select>	
	</b-form-group>
	
	<b-button
		type="submit"
		variant="primary"
		v-t="'shared.label-select'"
	></b-button>
</b-form>
`