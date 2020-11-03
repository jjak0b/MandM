export const template =
`<div
	role="gridcell"
	v-bind:class="classes"
	v-bind:tabindex="isSelected ? 0 : -1"
	v-on:click="onFocus"
>
	<div ref="styleEl">
		<component
			v-if="value.component && value.component.options"
			v-bind:locale="locale"
			v-bind:id="value.component.id"
			v-bind:class="value.component.class"
			:is="value.component.options"
			v-bind="value.component.props"
			v-bind:value="value.component.value"
			v-bind:tabindex="isSelected ? 0 : -1"
			v-bind:locales-list="localesList"
			v-bind:i18nCategory="i18nCategory"
		></component>
		<span v-else>&nbsp;</span>
	</div>
</div>`;