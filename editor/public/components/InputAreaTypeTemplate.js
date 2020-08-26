export const template = `
<div>
       <select v-model="test">
            <option v-bind:value="1">Text</option>
            <option v-bind:value="2">Number</option>
        </select>
        </div>
        <div v-if="test == 1">
        <textarea v-model="valuear">
        </textarea> 
       </div>
       <div v-if="test == 2" min="1">
       <input type="number" v-model="valuenum">
       </div>
     
`;