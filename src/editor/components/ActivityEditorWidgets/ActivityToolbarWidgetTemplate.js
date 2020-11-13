export const template =
`
<ul id="menu">
	<li id="addToolbar">
		<div>{{ $t( 'shared.label-add' ) }}</div>
	</li>
	<li id="editToolbar" v-show="!isMission">
		<div>{{ $t( 'shared.label-edit' ) }}</div>
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
	<li id="copyToolbar" v-show="!isMission">
		<div>{{ $t( 'shared.label-copy' ) }}</div>
	</li>
	<li id="pasteToolbar" v-show="copiedActivity">
		<div>{{ $t( 'shared.label-paste' ) }}</div>
	</li>
	<li id="enableToolbar" v-show="!isMission && !active">
		<div>{{ $t( 'shared.label-enable' ) }}</div>
	</li>
	<li id="disableToolbar" v-show="!isMission && active">
		<div>{{ $t( 'shared.label-disable' ) }}</div>
	</li>
</ul>
`;