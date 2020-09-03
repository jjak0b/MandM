export const template = `
<div>
       <select v-model="inty">
            <option v-bind:value="1">Text</option>
            <option v-bind:value="2">Number</option>
        </select>
        </div>
        <div v-if="type == 1">
        <input type="text" v-model="value">
       </div>
       <div v-if="type == 2" min="1">
       <input type="number" v-model.number="value">
       </div>
`;