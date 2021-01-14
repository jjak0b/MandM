export const template =
`
<ul id="menu">
	<li id="addToolbar">
		<div>{{ $t( 'shared.label-add' ) }}</div>
	</li>
	<li id="editToolbar" v-show="!isMission">
		<div v-bind:aria-disabled="isMission">{{ $t( 'shared.label-edit' ) }}</div>
	</li>
	<li id="removeToolbar" v-show="!isMission">
		<div v-bind:aria-disabled="isMission">{{ $t( 'shared.label-remove' ) }}</div>
	</li>
	<li id="grabToolbar" v-show="!isMission">
		<div v-bind:aria-disabled="isMission">{{ $t( 'shared.label-grab' ) }}</div>
	</li>
	<li id="dropToolbar" v-show="grabbedActivity">
		<div v-bind:aria-disabled="!grabbedActivity">{{ $t( 'shared.label-drop' ) }}</div>
	</li>
	<li id="copyToolbar" v-show="!isMission">
		<div v-bind:aria-disabled="isMission">{{ $t( 'shared.label-copy' ) }}</div>
	</li>
	<li id="pasteToolbar" v-show="copiedActivity">
		<div v-bind:aria-disabled="!copiedActivity">{{ $t( 'shared.label-paste' ) }}</div>
	</li>
	<li id="enableToolbar" v-show="!isMission && !active">
		<div v-bind:aria-disabled="!(!isMission && !active)">{{ $t( 'shared.label-enable' ) }}</div>
	</li>
	<li id="disableToolbar" v-show="!isMission && active">
		<div v-bind:aria-disabled="!(!isMission && active)">{{ $t( 'shared.label-disable' ) }}</div>
	</li>
</ul>
`