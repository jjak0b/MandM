export const template =
    `<div>
<select v-model="data.tag">
<option value="Text">Text</option>
<option value="Number">Number</option>
<option value="Array">Array</option>
</select>
    <div v-if="data.tag == 'Number'">
        <input type="number" v-on:input="$emit('input',$event.target.value)">
    </div>
    <div v-if="data.tag == 'Text'">
    <input type="text" v-on:input="$emit('input',$event.target.value)">
</div>
<div v-if="data.tag == 'Array'">
<input type="text">
<button v-on:click="data.param.push($event.target.value)">Add</button>
<button v-on:click="data.param.pop()">Remove</button>
</div>
</div>

`;