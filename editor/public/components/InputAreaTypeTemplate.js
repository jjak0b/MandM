export const template = `
<div>
       <select v-model="type">
            <option value="1">Text</option>
            <option value="2">Number</option>
        </select>
        <div v-if="type == '1'">
        <input v-bind:value="value" 
        v-on:input="$emit('input',$event.target.value)"
        type="text">
       </div>
       <div v-if="type == '2'" min="1">
       <input type="number" v-bind:value="value" 
        v-on:input="$emit('input',$event.target.value)">
       </div>
            <button v-on:click="$emit('agg')">Aggiungi </button>
       </div>
`;