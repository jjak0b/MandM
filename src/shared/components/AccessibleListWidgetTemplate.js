export const template =
		`
<div>
<b-list-group class="border border-info rounded" style="min-width: 20em;">
	<b-list-group-item v-bind:variant="variant" class="font-weight-bold text-info">
		{{ title }}
	</b-list-group-item>
	<b-list-group-item
		v-for="(item, index) in items"
		v-bind:variant="getVariant(index)"
		v-on:click="$emit('select', index)" 
		v-bind:active="isActive(index)">
		<b-container>
			<b-row> 
				<b-col>
					<borderless-input
						v-if="editable"
						v-bind:locale="locale"
						v-bind:localesList="localesList"
						v-bind:locale-label="item.title"
					></borderless-input>
					<p v-else>{{ $t(item.title, locale) }}</p>
				</b-col>
				<div class="float-right">
					<b-link
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-move-up')"
						v-on:click.stop="$emit('move-up', index)">
						<b-icon-arrow-up-short
							v-bind:variant="getVariant(index)"
						></b-icon-arrow-up-short>
					</b-link>
					<b-link
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-move-down')"
						v-on:click.stop="$emit('move-down', index)">
						<b-icon-arrow-down-short
							v-bind:variant="getVariant(index)"
						></b-icon-arrow-down-short>
					</b-link>
					<b-link
						v-if="copyPaste"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-copy')"
						v-on:click.stop="$emit('copy', index)">
						<b-icon-clipboard-plus
							v-bind:variant="getVariant(index)"
						></b-icon-clipboard-plus>
					</b-link>
					<b-link
						v-if="copyPaste"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-paste')"
						v-on:click.stop="$emit('paste', index)">
						<b-icon-clipboard-check
							v-bind:variant="getVariant(index)"
						></b-icon-clipboard-check>
					</b-link>
					<b-link
						v-if="disable && !items[index].active"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-enable')"
						v-on:click.stop="$emit('enable', index)">
						<b-icon-power
							v-bind:variant="getVariant(index)"
						></b-icon-power>
					</b-link>
					<b-link
						v-if="disable && items[index].active"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-disable')"
						v-on:click.stop="$emit('enable', index)">
						<b-icon-power
							v-bind:variant="getVariant(index)"
						></b-icon-power>
					</b-link>
					<b-link
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-delete')"
						v-on:click.stop="$emit('delete', index)">
						<b-icon-x
							v-bind:variant="getVariant(index)"
						></b-icon-x>
					</b-link>
				</div>
			</b-row>
		</b-container>
	</b-list-group-item>
		<b-list-group-item v-bind:variant="variant">
		<div class="float-right">
			<b-link
				v-if="copyPaste"
				v-b-tooltip.hover
				v-bind:title="$t('shared.label-paste')"
				v-on:click.stop="$emit('paste', items.length-1)">
				<b-icon-clipboard-check></b-icon-clipboard-check>
			</b-link>
			<b-link
				v-b-tooltip.hover
				v-bind:title="$t('shared.label-add')"
				v-on:click.stop="$emit('add')">
				<b-icon-plus></b-icon-plus>
			</b-link>
		</div>
		</b-list-group-item>
</b-list-group>
</div>
`