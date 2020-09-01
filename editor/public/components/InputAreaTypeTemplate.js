export const template = `
<div>
       <select v-model="type">
            <option value="1">Text</option>
            <option value="2">Number</option>
        </select>
        <div v-if="type == '1'">
        <input type="text" v-model="values">
       </div>
       <div v-if="type == '2'" min="1">
       <input type="number" v-model.number="values">
       </div>
       <button v-on:click="$emit('add')">Aggiungi
            </button>
       </div>
`;