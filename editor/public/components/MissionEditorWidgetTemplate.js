export const template =
`<div class="row" >
	<div class="col-3">
		<label>{{ $t( 'MissionEditorWidget.label-mission-list' ) }}</label>
		<ul ref="mission-list" class="list-group overflow-auto">
			<li v-for="mission in missions" v-on:click="load( mission )" class="list-group-item list-group-item-action">{{ mission.title }}</li>
		</ul>
	</div>
	<form class="col-9" v-on:submit.prevent="save()" >
		<div class="form-group">
			<label for="mission-title">{{ $t( 'MissionEditorWidget.label-mission-title' ) }}</label>
			<input id="mission-title" name="missionTitle" type="text" required="required" class="form-control" v-model="missionTitle" >
		</div>
		<div class="form-group">
			<label for="mission-description"">{{ $t( 'MissionEditorWidget.label-mission-description' ) }}</label>
			<textarea id="mission-description" name="missionDescription" class="form-control" rows="4" v-model="missionDescription"></textarea>
		</div>
		<div class="form-group btn-group" role="group">
			<button type="submit" class="form-control btn btn-success">{{ $t( 'shared.label-save' ) }}</button>
			<button type="button" v-on:click="remove()" class="form-control btn btn-danger">{{ $t( 'shared.label-remove' ) }}</button>
		</div>
	</form>
</div>`
;


