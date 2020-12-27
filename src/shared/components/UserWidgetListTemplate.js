export const template =
		`
<component v-bind:is="widgetsTable[name].list">
  <component 
  	v-bind:is="widgetsTable[name].item"
    v-for="option in options"
    v-bind:value="option.value">
    {{ getContent(option.title) }}
  </component>
</component>
`