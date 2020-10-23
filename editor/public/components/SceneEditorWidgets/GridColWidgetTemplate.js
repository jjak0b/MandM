export const template =
`<div
	role="gridcell"
	v-bind:class="classes"
	v-bind:tabindex="isSelected ? 0 : -1"
	v-on:click="onFocus"
>
	<div ref="styleEl">
		<component
			v-if="value.component && value.component.getOptions"
			v-bind:locale="locale"
			v-bind:id="value.component.id"
			v-bind:class="value.component.class"
			:is="value.component.getOptions()"
			v-bind="value.component.props"
			v-bind:value="value.component.value"
			v-bind:tabindex="isSelected ? 0 : -1"
			v-bind:nextAssetId="nextAssetId"
			v-bind:locales-list="localesList"
		></component>
		<span v-else>&nbsp;</span>
	</div>
</div>`;