export const template =
		`
<component
	v-if="type in widgetsTable"
	v-bind:is="widgetsTable[type].list"
	v-on="$listeners"
	v-bind:class="classes"
>
  <component 
  	v-bind:is="widgetsTable[type].item"
    v-for="option in options"
    v-bind:value="option.value">
    {{ getContent(option) }}
  </component>
</component>
`