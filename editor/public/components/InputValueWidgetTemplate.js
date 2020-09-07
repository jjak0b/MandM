export const template =
    `<div>
<select v-model="val.tag">
<option value="Text">Text</option>
<option value="Number">Number</option>
<option value="Array">Array</option>
</select>
    <div v-if="val.tag == 'Number'">
        <input type="number" v-model.number="temp">
        <button v-on:click="check()">Add</button>
    </div>
    <div v-if="val.tag == 'Text'">
    <input type="text" v-model="temp">
    <button v-on:click="check()">Add</button>
</div>
<div v-if="val.tag == 'Array'">
<input type="text" v-model="temp">
<button v-on:click="val.param.push(temp)">Add</button>
<button v-on:click="val.param.pop()">Remove</button>
</div>
<button v-on:click="$emit('val')">Save</button> 
</div>

`;