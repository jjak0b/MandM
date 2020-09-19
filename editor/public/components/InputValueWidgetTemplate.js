export const template =
    `
<div>
    <select v-model="type">
        <option value="Text">Text</option>
        <option value="Number">Number</option>
        <option value="Array">Array</option>
    </select>
    <div v-if="type == 'Number'" aria-describedby="Num">
    <b-alert show id="Num">Inserisci un numero, premendo Aggiungi il precedente viene sovvrascritto se presente, Save conferma il valore scelto</b-alert>
        <input type="number" v-model.number="temp" aria-describedby="Number">
        <button v-on:click="check()">Add</button>
    </div>
    <div v-else-if="type == 'Text'" aria-describedby="Tex">
    <b-alert show id="Tex">Inserisci un testo, premendo Aggiungi il precedente viene sovvrascritto se presente, Save conferma il valore scelto</b-alert>
        <input type="text" v-model="temp">
        <button v-on:click="check()" v-on:submit.prevent>Add</button>
    </div>
    <div v-else-if="type == 'Array'" aria-describedby="Ar">
    <b-alert show id="Ar">Inserisci i valori in una lista, premendo Aggiungi inserisci il valore nella lista, premendo Rimuovi toglie il valore dalla lista se presente</b-alert>
    <input type="text" v-model="temp">
    <select>
    <option v-for="comp in componentsType"
    v-bind:value="comp">
    {{comp}}
</option>
</select>
    <button v-on:click="param.push(temp)"v-on:submit.prevent aria-describedby="adda">Add</button>
    <button v-on:click="rem()" v-on:submit.prevent aria-describedby="remov">Remove</button>
    </div>
    <button v-on:click="$emit('value', param)">Save</button> 
    <div v-for="val in param">
        {{val}}
    </div>
</div>
`;