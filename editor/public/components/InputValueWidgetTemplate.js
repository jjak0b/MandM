export const template =
    `
<div>
    <select v-model="type">
        <option value="Text">Text</option>
        <option value="Number">Number</option>
        <option value="Array">Array</option>
    </select>
    <div v-if="type == 'Number'">
        <input type="number" v-model.number="temp">
        <button v-on:click="check()">Add</button>
    </div>
    <div v-else-if="type == 'Text'">
        <input type="text" v-model="temp">
        <button v-on:click="check()" v-on:submit.prevent>Add</button>
    </div>
    <div v-else-if="type == 'Array'">
    <input type="text" v-model="temp">
    <select>
    <option v-for="comp in componentsType"
    v-bind:value="comp">
    {{comp}}
</option>
</select>
    <button v-on:click="param.push(temp)"v-on:submit.prevent>Add</button>
    <button v-on:click="rem()" v-on:submit.prevent>Remove</button>
    </div>
    <button v-on:click="$emit('value', param)">Save</button> 
    <div v-for="val in param">
        {{val}}
    </div>
</div>
`;