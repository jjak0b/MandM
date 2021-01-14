export const template =
`
<section>
<h3
	id="user-widget-editor-grid-header-name"
>{{ $t( 'UserWidgets.Grid.label-customize-grid-layout' ) }}</h3>
<b-form
	aria-labelledby="user-widget-editor-grid-header-name"
	v-on:submit.prevent
>

<b-form-group
	v-bind:label="$t('UserWidgets.Grid.grid.label-properties')"
>
	<label for="user-widget-editor-grid_grid-tag-input"
	>{{ $t('UserWidgets.Grid.label-html-tag-name') }}</label>
	<b-form-input
		id="user-widget-editor-grid_grid-tag-input"
		v-model.trim="component.props.gridTag"
	>
	</b-form-input>
	
	<label for="user-widget-editor-grid_grid-role-input"
	>{{ $t('UserWidgets.Grid.label-html-tag-role') }}</label>
	<b-form-input
		id="user-widget-editor-grid_grid-role-input"
		v-model="component.props.gridRole"
	>
	</b-form-input>
	
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
	></b-form-tags>
</b-form-group>

<b-form-group
	v-bind:label="$t('UserWidgets.Grid.row.label-properties')"
>
	<label for="user-widget-editor-grid_row-tag-input"
	>{{ $t('UserWidgets.Grid.label-html-tag-name') }}</label>
	<b-form-input
		id="user-widget-editor-grid_row-tag-input"
		v-model.trim="component.props.rowTag"
	>
	</b-form-input>
	
	<label for="user-widget-editor-grid_row-role-input"
	>{{ $t('UserWidgets.Grid.label-html-tag-role') }}</label>
	<b-form-input
		id="user-widget-editor-grid_row-role-input"
		v-model="component.props.rowRole"
	>
	</b-form-input>
	
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
	></b-form-tags>
</b-form-group>

<b-form-group
	v-bind:label="$t('UserWidgets.Grid.cell.label-properties')"
>
	<label for="user-widget-editor-grid_cell-tag-input"
	>{{ $t('UserWidgets.Grid.label-html-tag-name') }}</label>
	<b-form-input
		id="user-widget-editor-grid_cell-tag-input"
		v-model.trim="component.props.cellTag"
	>
	</b-form-input>
	
	<label for="user-widget-editor-grid_cell-role-input"
	>{{ $t('UserWidgets.Grid.label-html-tag-role') }}</label>
	<b-form-input
		id="user-widget-editor-grid_cell-role-input"
		v-model="component.props.cellRole"
	>
	</b-form-input>
	
	<label for="user-widget-editor-grid_cell-classes-input"
	>{{ $t('UserWidgets.Grid.label-class-name') }}</label>
	<b-form-tags
		tag-pills
		tag-variant="secondary"
		size="lg"
		input-id="user-widget-editor-grid_cell-classes-input"
		v-model="component.props.rowClass"
		separator=" ,;"
		remove-on-delete
		v-bind:tag-validator="(classname) => isClassValid(component.props.cellClass, classname)"
		v-bind:add-button-text="$t('shared.label-add')"
		add-button-variant="success"
		v-bind:duplicate-tag-text="$t('AttributeEditorWidget.label-duplicate-classes')"
		v-bind:placeholder="$t('AttributeEditorWidget.label-placeholder-insert-class')"
	></b-form-tags>
</b-form-group>

</b-form>
</section>
`