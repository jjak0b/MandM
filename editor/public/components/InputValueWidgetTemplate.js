export const template =
    `<div>
<select v-model="tag">
<option value="Text">Text</option>
<option value="Number">Number</option>
<option value="Array">Array</option>
</select>
    <div v-if="tag == 'Number'">
        <input type="number" v-model.number="temp">
        <button v-on:click="check()">Add</button>
    </div>
    <div v-if="tag == 'Text'">
    <input type="text" v-model="temp">
    <button v-on:click="check()" v-on:submit.prevent>Add</button>
</div>
<div v-if="tag == 'Array'">
<input type="text" v-model="temp">
<button v-on:click="param.push(temp)"v-on:submit.prevent>Add</button>
<button v-on:click="param.pop()" v-on:submit.prevent>Remove</button>
</div>
<button v-on:click="$emit('value')">Save</button> 
<div v-for="val in param">
{{val}}
</div>
</div>


`;