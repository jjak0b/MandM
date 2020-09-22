export const template =
    `
<div>
    <select id="selectType" v-model="type">
        <option value="Text">{{ $t('shared.label-text') }}</option>
        <option value="Number">{{ $t('shared.label-number') }}</option>
        <option value="Array">{{ $t('shared.label-array') }}</option>
        <option value="timepicker">{{ $t('shared.label-time') }}</option>
    </select>
    <div v-if="type == 'Number'" aria-describedby="Num">
    <b-alert show id="Num">{{ $t('ActivityEditorWidget.number-desc') }}</b-alert>
        <input type="number" v-model.number="temp" aria-describedby="Number">
        <button v-on:click="check()">{{ $t('shared.label-add') }}</button>
    </div>
    <div v-else-if="type == 'Text'" aria-describedby="Tex">
    <b-alert show id="Tex">{{ $t('ActivityEditorWidget.text-desc') }}</b-alert>
        <input type="text" v-model="temp">
        <button v-on:click="check()" v-on:submit.prevent>{{ $t('shared.label-add') }}</button>
    </div>
    <div v-else-if="type == 'Array'" aria-describedby="Ar">
    <b-alert show id="Ar">{{ $t('ActivityEditorWidget.array-desc') }}</b-alert>
    <input type="text" v-model="temp">
    <select v-model="arrayType">
    <option v-for="(comp, type) in componentsType"
    v-bind:value="type">
    {{type}}
</option>
</select>
    <button v-on:click="param.push(temp)"v-on:submit.prevent>{{ $t('shared.label-add') }}</button>
    <button v-on:click="rem()" v-on:submit.prevent>{{ $t('shared.label-remove') }}</button>
    <component v-if="arrayType"
    v-bind:is="componentsType[arrayType]"
    v-model="temp">
    </component>
    </div> 
    <button v-on:click="$emit('value', param, type)">{{ $t('shared.label-save') }}</button> 
    <div v-for="val in param">
        {{val}}
    </div>
    
</div>
`;