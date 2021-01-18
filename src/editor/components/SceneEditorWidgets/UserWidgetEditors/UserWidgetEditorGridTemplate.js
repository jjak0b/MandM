export const template =
`
<section>
<h3
	id="user-widget-editor-grid-header-name"
>{{ $t( 'UserWidgets.label-grid-settings' ) }}</h3>
<b-form
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
	
	<div class="mb-2">
		<label for="user-widget-editor-grid_grid-classes-input"
		>{{ $t('UserWidgets.Grid.label-class-name') }}</label>
		<b-form-tags
			tag-pills
			tag-variant="secondary"
			size="lg"
			input-id="user-widget-editor-grid_grid-classes-input"
			v-model="component.props.gridClass"
			separator=" ,;"
			remove-on-delete
			v-bind:tag-validator="(classname) => isClassValid(component.props.gridClass, classname)"
			v-bind:add-button-text="$t('shared.label-add')"
			add-button-variant="success"
			v-bind:duplicate-tag-text="$t('AttributeEditorWidget.label-duplicate-classes')"
			v-bind:placeholder="$t('AttributeEditorWidget.label-placeholder-insert-class')"
			class="mb-2"
		></b-form-tags>
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
		<label for="user-widget-editor-grid_row-classes-input"
		>{{ $t('UserWidgets.Grid.label-class-name') }}</label>
		<b-form-tags
			tag-pills
			tag-variant="secondary"
			size="lg"
			input-id="user-widget-editor-grid_row-classes-input"
			v-model="component.props.rowClass"
			separator=" ,;"
			remove-on-delete
			v-bind:tag-validator="(classname) => isClassValid(component.props.rowClass, classname)"
			v-bind:add-button-text="$t('shared.label-add')"
			add-button-variant="success"
			v-bind:duplicate-tag-text="$t('AttributeEditorWidget.label-duplicate-classes')"
			v-bind:placeholder="$t('AttributeEditorWidget.label-placeholder-insert-class')"
			class="mb-2"
		></b-form-tags>
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
		<label for="user-widget-editor-grid_cell-classes-input"
		>{{ $t('UserWidgets.Grid.label-class-name') }}</label>
		<b-form-tags
			tag-pills
			tag-variant="secondary"
			size="lg"
			input-id="user-widget-editor-grid_cell-classes-input"
			v-model="component.props.cellClass"
			separator=" ,;"
			remove-on-delete
			v-bind:tag-validator="(classname) => isClassValid(component.props.cellClass, classname)"
			v-bind:add-button-text="$t('shared.label-add')"
			add-button-variant="success"
			v-bind:duplicate-tag-text="$t('AttributeEditorWidget.label-duplicate-classes')"
			v-bind:placeholder="$t('AttributeEditorWidget.label-placeholder-insert-class')"
			class="mb-2"
		></b-form-tags>
	</div>
	
	<b-form-group
		v-bind:label="$t('UserWidgets.Grid.label-cell-class-name-active-unselected')"
		label-for="user-widget-editor-grid_cell-cursor-class-input"
		v-bind:description="$t('UserWidgets.Grid.label-current-unselected-cell-while-navigating')"
		class="mb-2"
		v-slot="{ ariaDescribedby, id, descriptionId, labelId }"
	>
		<b-form-tags
		 	v-bind:input-attrs="{ 'aria-describedby': ariaDescribedby }"
			tag-pills
			tag-variant="secondary"
			size="lg"
			input-id="user-widget-editor-grid_cell-cursor-class-input"
			v-model="component.props.cursorCellClass"
			separator=" ,;"
			remove-on-delete
			v-bind:tag-validator="(classname) => isClassValid(component.props.cursorCellClass, classname)"
			v-bind:add-button-text="$t('shared.label-add')"
			add-button-variant="success"
			v-bind:duplicate-tag-text="$t('AttributeEditorWidget.label-duplicate-classes')"
			v-bind:placeholder="$t('AttributeEditorWidget.label-placeholder-insert-class')"
		></b-form-tags>
	</b-form-group>
		
	<div class="mb-2">
		<label for="user-widget-editor-grid_cell-selected-class-input"
		>{{ $t('UserWidgets.Grid.label-cell-class-name-selected') }}</label>
		<b-form-tags
			tag-pills
			tag-variant="secondary"
			size="lg"
			input-id="user-widget-editor-grid_cell-selected-class-input"
			v-model="component.props.selectedCellClass"
			separator=" ,;"
			remove-on-delete
			v-bind:tag-validator="(classname) => isClassValid(component.props.selectedCellClass, classname)"
			v-bind:add-button-text="$t('shared.label-add')"
			add-button-variant="success"
			v-bind:duplicate-tag-text="$t('AttributeEditorWidget.label-duplicate-classes')"
			v-bind:placeholder="$t('AttributeEditorWidget.label-placeholder-insert-class')"
			class="mb-2"
		></b-form-tags>
	</div>
</b-form-group>

</b-form>
</section>
`