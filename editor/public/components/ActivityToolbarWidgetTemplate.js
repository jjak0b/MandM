export const template =
`
<ul id="menu">
	<li id="addToolbar">
		<div>{{ $t( 'shared.label-add' ) }}</div>
	</li>
	<li id="editToolbar">
		<div>Edit</div>
	</li>
	<li id="duplicateToolbar">
		<div>{{ $t( 'shared.label-duplicate' ) }}</div>
	</li>
	<li id="removeToolbar">
		<div>{{ $t( 'shared.label-remove' ) }}</div>
	</li>
	<li id="grabToolbar" v-if="showGrab">
		<div>Grab</div>
	</li>
	<li id="dropToolbar" v-if="!showGrab">
		<div>Drop</div>
	</li>
</ul>
`;