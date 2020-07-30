export const template =
`<div class="row" >
	<div class="col-3">
		<label for="mission-list">{{ $t( 'MissionEditorWidget.label-mission-list' ) }}</label>
		<ul id="mission-list" class="list-group overflow-auto">
			<li v-for="(mission, index) in missions" v-bind:tabindex='index+1'  v-on:click="load( mission )" v-bind:class="['list-group-item', 'list-group-item-action', value == mission ? 'active' : '' ]">
				<i18n-input-widget
					v-bind:tag="'label'"
					v-bind:locale="locale"
					v-bind:locales-data="localesData"
					v-bind:locale-label="mission.title"> 
				</i18n-input-widget>
			</li>
		</ul>
	</div>

	<form class="col-9" v-on:submit.prevent="save()" >
		<div class="form-group">
			<label for="mission-title">{{ $t( 'MissionEditorWidget.label-mission-title' ) }}</label>
			<i18n-input-widget
				v-bind:tag="'input'"
				id="mission-title"
				name="missionTitle"
				type="text"
				required="required"
				class="form-control"
				v-bind:locale="locale"
				v-bind:locales-data="localesData"
				v-bind:locale-label="localeTitle"></i18n-input-widget>
		</div>
		<div class="form-group">
			<label for="mission-description"">{{ $t( 'MissionEditorWidget.label-mission-description' ) }}</label>
			<i18n-input-widget
				v-bind:tag="'textarea'"
				id="mission-description"
				name="missionDescription"
				class="form-control"
				rows="4"
				v-bind:locale="locale"
				v-bind:locales-data="localesData"
				v-bind:locale-label="localeDescription"></i18n-input-widget>
		</div>
		<div class="form-group btn-group" role="group">
			<button type="submit" class="form-control btn btn-success" >{{ value ? $t( 'shared.label-save' ) : $t( 'shared.label-add' ) }}</button>
			<button type="button" v-on:click="remove()" class="form-control btn btn-danger" v-if="value != null ">{{ $t( 'shared.label-remove' ) }}</button>
		</div>
	</form>
</div>`
;


