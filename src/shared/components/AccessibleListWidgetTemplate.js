export const template =
		`
<b-card
	no-body
	class="border border-info rounded"
	role="group"
>
	<b-card-header
		:header-class="[ variant ? 'list-group-item-' + variant : null, 'font-weight-bold', 'text-info' ]"
		v-bind:id="$attrs.id + '-list-widget-header'"
		aria-atomic="true"
	>
		<h3>{{ title }}</h3>
	</b-card-header>
	<b-card-body>
	<list-widget
		v-bind:aria-labelledby="$attrs.id + '-list-widget-header'"
		v-bind:aria-describedby="$attrs.id + '-list-widget-footer-description'"
		v-bind:id="$attrs.id + '-list-widget-list'"
		v-bind:list="items"
		tag="ol"
		tag-item="li"
		v-bind:value="selected"
		v-on:input="$emit('select', items.indexOf( $event ) )"
	>
	<template #item="{item, keyItem: index, isFocused, isSelected}">
		<b-container
			role="group"
			v-bind:aria-label="$t(item.title)"
		>
			<b-row> 
				<b-col>
					<borderless-input
						v-if="editable"
						style="min-width: 10em"
						v-bind:tabindex="isFocused ? 0 : -1"
						v-bind:locale="locale"
						v-bind:localesList="localesList"
						v-bind:locale-label="item.title"
					></borderless-input>
					<p v-else>{{ $t(item.title, locale) }}</p>
				</b-col>
				<b-col>
				<b-button-toolbar
					justify
					v-bind:key-nav="true"
					v-bind:tabindex="isFocused ? 0 : -1"
				>
					<b-button
						v-bind:tabindex="isFocused ? 0 : -1"
						variant="transparent"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-move-up')"
						v-on:click.stop="$emit('move-up', index)">
						<b-icon-arrow-up-short
							v-bind:variant="getVariant(index)"
						></b-icon-arrow-up-short>
					</b-button>
					<b-button
						v-bind:tabindex="isFocused ? 0 : -1"
						variant="transparent"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-move-down')"
						v-on:click.stop="$emit('move-down', index)">
						<b-icon-arrow-down-short
							v-bind:variant="getVariant(index)"
						></b-icon-arrow-down-short>
					</b-button>
					<b-button
						v-bind:tabindex="isFocused ? 0 : -1"
						variant="transparent"
						v-if="copyPaste"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-copy')"
						v-on:click.stop="$emit('copy', index)">
						<b-icon-clipboard-plus
							v-bind:variant="getVariant(index)"
						></b-icon-clipboard-plus>
					</b-button>
					<b-button
						v-bind:tabindex="isFocused ? 0 : -1"
						variant="transparent"
						v-if="copyPaste"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-paste')"
						v-on:click.stop="$emit('paste', index)">
						<b-icon-clipboard-check
							v-bind:variant="getVariant(index)"
						></b-icon-clipboard-check>
					</b-button>
					<b-button
						v-bind:tabindex="isFocused ? 0 : -1"
						v-if="disable"
						variant="transparent"
						v-b-tooltip.hover
						v-bind:title="!items[index].active ? $t('shared.label-enable') : $t('shared.label-disable')"
						v-on:click.stop="$emit('enable', index)">
						<b-icon-power
							v-bind:variant="getVariant(index)"
						></b-icon-power>
					</b-button>
					<b-button
						v-bind:tabindex="isFocused ? 0 : -1"
						variant="transparent"
						v-b-tooltip.hover
						v-bind:title="$t('shared.label-delete')"
						v-on:click.stop="$emit('delete', index)">
						<b-icon-x
							v-bind:variant="getVariant(index)"
						></b-icon-x>
					</b-button>
				</b-button-toolbar>
				</b-col>
			</b-row>
		</b-container>
	</template>
	</list-widget>
	</b-card-body>
	<b-card-footer
		:footer-class="[ variant ? 'list-group-item-' + variant : null, 'font-weight-bold', 'text-info' ]"
	>
		<div class="clearfix mb-2">
		<b-button-toolbar
			justify		
			class="float-right"
			v-bind:key-nav="true"
		>
			<b-button
				v-if="copyPaste"
				variant="transparent"
				v-b-tooltip.hover
				v-bind:title="$t('shared.label-paste')"
				v-on:click.stop="$emit('paste', items.length-1)">
				<b-icon-clipboard-check></b-icon-clipboard-check>
			</b-button>
			<b-button
				variant="transparent"
				v-b-tooltip.hover
				v-bind:title="$t('shared.label-add')"
				v-on:click.stop="$emit('add')">
				<b-icon-plus></b-icon-plus>
			</b-button>
		</b-button-toolbar>
		</div>
		<p
			v-bind:id="$attrs.id + '-list-widget-footer-description'"
		>{{ description }}</p>
	</b-card-footer>
</b-card>
`