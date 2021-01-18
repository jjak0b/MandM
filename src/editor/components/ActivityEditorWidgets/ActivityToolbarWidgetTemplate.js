export const template =
`
<div id="menu">
	<b-list-group role="menu">
		<b-list-group-item
			v-on:click="$emit('add')" 	
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-add' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="!isMission"
			role="menuitem"
			v-on:click="$emit('edit')" 
			href="#">
			{{ $t( 'shared.label-edit' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="!isMission"
			v-on:click="$emit('remove')" 
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-remove' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="!isMission"
			v-on:click="$emit('grab')" 
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-grab' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="grabbedActivity"
			v-on:click="$emit('drop')"
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-drop' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="!isMission"
			v-on:click="$emit('copy')"
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-copy' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="copiedActivity"
			v-on:click="$emit('paste')"
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-paste' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="!isMission && !active"
			v-on:click="$emit('enable')"
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-enable' ) }}
		</b-list-group-item>
		<b-list-group-item
			v-if="!isMission && active"
			v-on:click="$emit('enable')"
			role="menuitem"
			href="#">
			{{ $t( 'shared.label-disable' ) }}
		</b-list-group-item>
	</b-list-group>
</div>
`