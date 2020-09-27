export const template = `
<div>
       <select v-model="type" v-on:change="$emit('changeT',type)">
            <option value="Text">{{$t('shared.label-Text')}}</option>
            <option value="Number">{{$t('shared.label-Number')}}</option>
        </select>
        <div v-if="type == 'Text'">
        <input v-model="value" 
        type="text">
       </div>
       <div v-else-if="type == 'Number'">
       <input type="number" v-model="value">
       </div>
            <button v-on:click="$emit('agg', value)">{{ $t('shared.label-add')}} </button>
       </div>
`;