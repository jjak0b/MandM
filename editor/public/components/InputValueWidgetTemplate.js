export const template =
    `
<div>
    <select id="selectType" v-model="type" v-on:change="$emit('taketype',type)">
        <option value="Text">{{ $t('shared.label-Text') }}</option>
        <option value="Number">{{ $t('shared.label-Number') }}</option>
        <option value="Array">{{ $t('shared.label-Array') }}</option>
        <option value="Time">{{ $t('shared.label-Time') }}</option>
        <option value="Date">{{$t('shared.label-Date')}}</option>
    </select>
    <div v-if="type == 'Number'" aria-describedby="Num">
    <b-alert show id="Num">{{ $tc('ActivityEditorWidget.tnt-desc', 'shared.label-Number') }}</b-alert>
        <input type="number" v-model.number="temp" aria-describedby="Number">
        <button v-on:click="check()">{{ $t('shared.label-add') }}</button>
    </div>
    <div v-else-if="type == 'Text'" aria-describedby="Tex">
    <b-alert show id="Tex">{{ $tc('ActivityEditorWidget.tnt-desc', 'shared.label-Text') }}</b-alert>
        <input type="text" v-model="temp">
        <button v-on:click="check()" v-on:submit.prevent>{{ $t('shared.label-add') }}</button>
    </div>
    <div v-else-if="type == 'Array'" aria-describedby="Ar">
    <b-alert show id="Ar">{{ $t('ActivityEditorWidget.array-desc') }}</b-alert>
    <select v-model="arrayType">
    <option v-for="(comp, type) in componentsTag"
    v-bind:value="comp">
    {{$t('shared.label-'+ type)}}
</option>
</select>
<component
  :is="arrayType.name"
  v-bind:type="arrayType.attrs"
    v-model="temp"
></component>
<!--   ? componentsTag[arrayType].attrs:{}-->
    <button v-on:click="param.push(temp)"v-on:submit.prevent>{{ $t('shared.label-add') }}</button>
    <button v-on:click="rem()" v-on:submit.prevent>{{ $t('shared.label-remove') }}</button>
<!--    <component v-if="arrayType"-->
<!--    v-bind:is="componentsType[arrayType]"-->
<!--    v-model="temp">-->
<!--    </component>-->
    </div> 
    <!--TODO: Need to add locale attribute for time, based on the value in 18 translations--> 
    <div v-else-if="type == 'Time'" aria-describedby="Ti" locale="locale">
    <b-alert show id="Ti">{{ $tc('ActivityEditorWidget.tnt-desc', 'shared.label-Time') }}</b-alert>
    <b-time v-model="temp"></b-time>
     <button v-on:click="check()" v-on:submit.prevent>{{ $t('shared.label-add') }}</button>
</div>
<div v-else-if="type == 'Date'" aria-describedby="Da">
    <b-alert show id="Da">{{ $tc('ActivityEditorWidget.tnt-desc', 'shared.label-Date') }}</b-alert>
        <input type="date" aria-describedby="Da" v-model="temp">
        <button v-on:click="check()">{{ $t('shared.label-add') }}</button>
    </div>
    <button v-on:click="$emit('value', param)">{{ $t('shared.label-save') }}</button> 
    <div v-for="val in param">
        {{val}}
    </div>
    
</div>
`;