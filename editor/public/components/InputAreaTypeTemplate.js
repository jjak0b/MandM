export const template =
    //FIXME:Can't display template when using v-model=type, gives error
    `
<select v-model="type">
<option v-bind:value="text">Text</option>
<option v-bind:value="number">Number</option>
</select>
<!--<textarea v-if="type === 'text'" name="txtar" -->
<!--placeholder="Enter text" v-model="svalue"></textarea>-->
<!--<input v-if="type === 'number'" name="innum" v-model="svalue">-->
`;