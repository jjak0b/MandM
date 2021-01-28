export const template =
`
<section>
<h3
	id="user-widget-editor-grid-header-name"
>{{ $t( 'UserWidgets.label-grid-settings' ) }}</h3>
<b-form
	autocomplete="off"
	aria-labelledby="user-widget-editor-grid-header-name"
	v-on:submit.prevent
	class="d-flex flex-column"
>

<b-form-group
	v-bind:label="$t('UserWidgets.Grid.grid.label-properties')"
>
	<label for="user-widget-editor-grid_grid-tag-input"
	>{{ $t('UserWidgets.Grid.label-html-tag-name') }}</label>
	<b-form-input
		id="user-widget-editor-grid_grid-tag-input"
		v-model.trim="component.props.gridTag"
		type="text"
		class="mb-2"
	>
	</b-form-input>
	
	<b-card
		tag="section"
		bg-variant="info"
		text-variant="white"
		class="mb-2"
		no-body
		aria-labelledby="user-widget-editor-grid_grid-role-section-title"
	>
		<b-card-body>
			<b-card-title
				id="user-widget-editor-grid_grid-role-section-title"
			>{{ $t( 'accessibility.label' ) }}</b-card-title>
			
			<div class="mb-2">
				<label for="user-widget-editor-grid_grid-role-input"
				>{{ $t('UserWidgets.Grid.label-html-tag-role') }}</label>
				<b-form-input
					id="user-widget-editor-grid_grid-role-input"
					list="user-widget-editor-grid_grid-role-options"
					v-model.trim="component.props.gridRole"
					type="text"
				>
				</b-form-input>
				<datalist id="user-widget-editor-grid_grid-role-options">
					<option value="grid" />
				</datalist>
			</div>
			
			<div class="mb-2">
				<b-form-checkbox
					id="user-widget-editor-grid_grid-useIndexes-input"
					aria-describedby="user-widget-editor-grid_grid-useIndexes-description"
					v-model="component.props.useIndexes"
					switch
				>{{ $t('UserWidgets.Grid.label-use-auto-generated-indexes') }}</b-form-checkbox>
				<div
					id="user-widget-editor-grid_grid-useIndexes-description"
				>
					<small
						class="form-text form-muted"
					>{{ $t('UserWidgets.Grid.label-indexes_aria-rowcount_aria-colcount_aria-rowindex_aria-colindex') }}</small>
				</div>
			</div>
			
			<div class="mb-2">
				<b-form-checkbox
					id="user-widget-editor-grid_grid-use-navkey-input"
					aria-describedby="user-widget-editor-grid_grid-navkey-description"
					v-model="component.props.navKey"
					switch
				>{{ $t('UserWidgets.Grid.label-allow-grid-navigation-using-keyboard') }}</b-form-checkbox>
				<div
					id="user-widget-editor-grid_grid-navkey-description"
				>
					<small
						class="form-text form-muted"
					>{{ $t('UserWidgets.Grid.label-disable-it-if-using-for-layout-only') }}</small>
				</div>
			</div>
		</b-card-body>
	</b-card>

<!--
	Deprecated because selection can cause conflicts in player between grids
	<div class="mb-2">
		<b-form-checkbox
			id="user-widget-editor-grid_grid-use-selectable-input"
			aria-describedby="user-widget-editor-grid_grid-selectable-description"
			v-model="component.props.selectable"
			switch
		>{{ $t('UserWidgets.Grid.label-selection-provide-player-input-as-grid-coordinates') }}</b-form-checkbox>
		<div
			id="user-widget-editor-grid_grid-selectable-description"
			class="text-danger"
		>
			<small class="form-text"
			>{{ $t('UserWidgets.Grid.label-disable-it-if-using-for-layout-only' ) }}</small>
			<small class="form-text"
			>{{ $t('UserWidgets.Grid.label-its-recommended-to-enable-grid-navigation-for-accessibility-purpose-if-used') }}</small>
		</div>
	</div>
-->
	<div class="mb-2">
		<attribute-class-editor-widget
			v-model="component.props.gridClass"
		></attribute-class-editor-widget>
	</div>
</b-form-group>

<b-form-group
	v-bind:label="$t('UserWidgets.Grid.row.label-properties')"
>
	<div class="mb-2">
		<label for="user-widget-editor-grid_row-tag-input"
		>{{ $t('UserWidgets.Grid.label-html-tag-name') }}</label>
		<b-form-input
			id="user-widget-editor-grid_row-tag-input"
			v-model.trim="component.props.rowTag"
			type="text"
			class="mb-2"
		>
		</b-form-input>
	</div>
	<b-card
		tag="section"
		bg-variant="info"
		text-variant="white"
		class="mb-2"
		no-body
		aria-labelledby="user-widget-editor-grid_row-role-section-title"
	>
		<b-card-body>
			<b-card-title
				id="user-widget-editor-grid_row-role-section-title"
			>{{ $t( 'accessibility.label' ) }}</b-card-title>
			
			<label for="user-widget-editor-grid_row-role-input"
			>{{ $t('UserWidgets.Grid.label-html-tag-role') }}</label>
			<b-form-input
				id="user-widget-editor-grid_row-role-input"
				list="user-widget-editor-grid_row-role-options"
				v-model.trim="component.props.rowRole"
				type="text"
				class="mb-2"
			>
			</b-form-input>
			<datalist id="user-widget-editor-grid_row-role-options">
				<option value="row" />
			</datalist>
		</b-card-body>
	</b-card>
	
	<div class="mb-2">
		<attribute-class-editor-widget
			v-model="component.props.rowClass"
		></attribute-class-editor-widget>
	</div>
</b-form-group>

<b-form-group
	v-bind:label="$t('UserWidgets.Grid.cell.label-properties')"
>
	<div class="mb-2">
		<label for="user-widget-editor-grid_cell-tag-input"
		>{{ $t('UserWidgets.Grid.label-html-tag-name') }}</label>
		<b-form-input
			id="user-widget-editor-grid_cell-tag-input"
			v-model.trim="component.props.cellTag"
			class="mb-2"
		>
		</b-form-input>
	</div>
	<b-card
		tag="section"
		bg-variant="info"
		text-variant="white"
		class="mb-2"
		no-body
		aria-labelledby="user-widget-editor-grid_cell-role-section-title"
	>
		<b-card-body>
			<b-card-title
				id="user-widget-editor-grid_cell-role-section-title"
			>{{ $t( 'accessibility.label' ) }}</b-card-title>
			
			<label for="user-widget-editor-grid_cell-role-input"
			>{{ $t('UserWidgets.Grid.label-html-tag-role') }}</label>
			<b-form-input
				id="user-widget-editor-grid_cell-role-input"
				list="user-widget-editor-grid_cell-role-options"
				v-model.trim="component.props.cellRole"
				type="text"
				class="mb-2"
			>
			</b-form-input>
			<datalist id="user-widget-editor-grid_cell-role-options">
				<option value="gridcell" />
			</datalist>
		</b-card-body>
	</b-card>

	<div class="mb-2">
		<attribute-class-editor-widget
			v-model="component.props.cellClass"
		></attribute-class-editor-widget>
	</div>

	<b-form-group
		v-bind:description="$t('UserWidgets.Grid.label-current-unselected-cell-while-navigating')"
		class="mb-2"
		v-slot="{ ariaDescribedby, id, descriptionId, labelId }"
	>
		<attribute-class-editor-widget
			:label="$t('UserWidgets.Grid.label-cell-class-name-active-unselected')"
			v-model="component.props.cursorCellClass"
			:aria-describedby="ariaDescribedby" 
		></attribute-class-editor-widget>
	</b-form-group>
<!--
	Deprecated because selection can cause conflicts in player between grids
	<div class="mb-2">
		<attribute-class-editor-widget
			:label="$t('UserWidgets.Grid.label-cell-class-name-selected')"
			v-model="component.props.selectedCellClass"
		></attribute-class-editor-widget>
	</div>
-->
</b-form-group>

</b-form>
</section>
`