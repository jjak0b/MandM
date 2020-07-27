export const template =
`<div class="row">
	<div class="col-3">
		<label>Mission list</label>
		<ul ref="mission-list" class="list-group overflow-auto">
			<li v-for="mission in missions" v-on:click="load( mission )" class="list-group-item">{{ mission.title }}</li>
		</ul>
	</div>
	<form class="col-9" v-on:submit.prevent="save()" >
		<div class="form-group">
			<label for="mission-title">Mission title</label>
			<input id="mission-title" name="missionTitle" type="text" required="required" class="form-control" v-model="missionTitle" >
		</div>
		<div class="form-group">
			<label for="mission-description"">Mission description</label>
			<textarea id="mission-description" name="missionDescription" class="form-control" rows="4" v-model="missionDescription"></textarea>
		</div>
		<div class="form-group">
			
		</div>
		<div class="form-group btn-group" role="group">
			<button type="submit" class="form-control btn btn-success">Save</button>
			<button type="button" v-on:click="remove()" class="form-control btn btn-danger">Delete</button>
		</div>
	</form>
</div>`
;


