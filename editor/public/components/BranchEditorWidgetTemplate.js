export const template = `
<div>
 <div>
  <select v-for="(valueType, keyType) in inputType">
    <option v-bind:value="keytype">{{ $t( valueType ) }}</option>
 </div>
 <div v-if="keytype==Range">
  <label for="min">Min</label>
  <input v-model="min" placeholder="min" id="min">
  <label for="max">Max</label>
  <input v-model="max" placeholder="max" id="max">
 </div>
 <div v-if="keytype==Atom">
  <input v-model="value">
  <p>{{ value }}</p>
  <select name="type">
   <option>{{ $t( text )}}</option>
   <option>{{ $t( number )}}</option>
  </select>
 </div>
  <div v-if="keytype==Function">
   <select name="type" v-for="function in Functions">
	<option v-bind="function">{{ $t( function )}}</option>
   </select>
 </div>
</div> 
`