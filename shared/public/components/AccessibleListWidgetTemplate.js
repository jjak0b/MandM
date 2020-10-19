export const template =
		`
<div>
<b-list-group class="mb-2">
	<b-list-group-item 
	v-for="(item, index) in items"
	button
	v-on:click="$emit('select', index)" 
	v-bind:active="isActive(index)">
	{{ $t(item, locale) }}
		<div class="float-right">
			<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-move-up')" v-on:click.stop="$emit('move-up', index)">
				<b-icon-arrow-up-short v-bind:variant="getVariant(index)"></b-icon-arrow-up-short>
			</b-link>
			<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-move-down')" v-on:click.stop="$emit('move-down', index)">
				<b-icon-arrow-down-short v-bind:variant="getVariant(index)"></b-icon-arrow-down-short>
			</b-link>
			<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-copy')" v-on:click.stop="$emit('copy', index)">
				<b-icon-clipboard-plus v-bind:variant="getVariant(index)"></b-icon-clipboard-plus>
			</b-link>
			<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-paste')" v-on:click.stop="$emit('paste', index)">
				<b-icon-clipboard-check v-bind:variant="getVariant(index)"></b-icon-clipboard-check>
			</b-link>
			<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-delete')" v-on:click.stop="$emit('delete', index)">
				<b-icon-x v-bind:variant="getVariant(index)"></b-icon-x>
			</b-link>
		</div>
	</b-list-group-item>
	<b-list-group-item><b-link
	class="float-right font-weight-bold mr-3 text-decoration-none"
	v-on:click="$emit('add')">
	{{$t('shared.label-add')}}</b-link></b-list-group-item>
</b-list-group>
</div>
`