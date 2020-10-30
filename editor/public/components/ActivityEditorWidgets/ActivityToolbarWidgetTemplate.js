export const template =
`
<ul id="menu">
	<li id="addToolbar">
		<div>{{ $t( 'shared.label-add' ) }}</div>
	</li>
	<li id="editToolbar" v-show="!isMission">
		<div>{{ $t( 'shared.label-edit' ) }}</div>
	</li>
	<li id="duplicateToolbar" v-show="!isMission">
		<div>{{ $t( 'shared.label-duplicate' ) }}</div>
	</li>
	<li id="removeToolbar" v-show="!isMission">
		<div>{{ $t( 'shared.label-remove' ) }}</div>
	</li>
	<li id="grabToolbar" v-show="showGrab && !isMission">
		<div>{{ $t( 'shared.label-grab' ) }}</div>
	</li>
	<li id="dropToolbar" v-show="!showGrab && !isMission">
		<div>{{ $t( 'shared.label-drop' ) }}</div>
	</li>
</ul>
`;