export const template =
		`
<component
	v-bind:is="widgetsTable[name].list"
	v-on="$listeners"
	v-bind:class="classes"
>
  <component 
  	v-bind:is="widgetsTable[name].item"
    v-for="option in options"
    v-bind:value="option.value">
    {{ getContent(option) }}
  </component>
</component>
`