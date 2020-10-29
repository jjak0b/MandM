export const template =
		`
<div>
<b-list-group class="border border-info rounded">
	<b-list-group-item variant="info" class="font-weight-bold text-info">
		{{ $t(title) }}
	</b-list-group-item>
	<b-list-group-item
		v-for="(item, index) in items"
		v-on:click="$emit('select', index)" 
		v-bind:active="isActive(index)">
		<b-container>
			<b-row> 
				<b-col>
					<borderless-input
						v-bind:locale="locale"
						v-bind:localesList="localesList"
						v-bind:locale-label="item"
					></borderless-input>
				</b-col>
				<div class="float-right">
					<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-move-up')" v-on:click.stop="$emit('move-up', index)">
						<b-icon-arrow-up-short></b-icon-arrow-up-short>
					</b-link>
					<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-move-down')" v-on:click.stop="$emit('move-down', index)">
						<b-icon-arrow-down-short></b-icon-arrow-down-short>
					</b-link>
					<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-copy')" v-on:click.stop="$emit('copy', index)">
						<b-icon-clipboard-plus></b-icon-clipboard-plus>
					</b-link>
					<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-paste')" v-on:click.stop="$emit('paste', index)">
						<b-icon-clipboard-check></b-icon-clipboard-check>
					</b-link>
					<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-delete')" v-on:click.stop="$emit('delete', index)">
						<b-icon-x></b-icon-x>
					</b-link>
				</div>
			</b-row>
		</b-container>
	</b-list-group-item>
		<b-list-group-item variant="info">
		<div class="float-right">
			<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-paste')" v-on:click.stop="$emit('paste', items.length-1)">
				<b-icon-clipboard-check></b-icon-clipboard-check>
			</b-link>
			<b-link v-b-tooltip.hover v-bind:title="$t('shared.label-add')" v-on:click.stop="$emit('add')">
				<b-icon-plus></b-icon-plus>
			</b-link>
		</div>
		</b-list-group-item>
</b-list-group>
</div>
`