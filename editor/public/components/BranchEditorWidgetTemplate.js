export const template = `
<form ref="form" v-on:submit.prevent>
<fieldset class="form-group">
 <legend>{{ $t( "ActivityEditorWidget.label-input-type" ) }}</legend>
 <div v-for="(keyType, valueType) in inputTypes" class="form-check">
  <input type="radio"
	 class="form-check-input"
	 name="keyType"
	 v-bind:id="'input-type_' + keyType"
	 v-bind:value="valueType"
	 v-model="val.tag"
	 v-bind:aria-describedby="keyType"
  />
  <label
	class="form-check-label"
	v-bind:for="'input-type_' + keyType"
  >{{ $t(keyType + '.label' ) }}</label>
 </div>
 <div v-if="val.tag == 'Atom' && val.tag">
 <text-area-input
 v-model="valueAr"
 v-on:agg="advise()"></text-area-input>
<!--  <textarea v-if="valueAr === 'text'" name="valuea"></textarea>-->
<!--  <lable v-if="valueAr === 'text'" for="valuea">Text</lable>-->
<!--  <input type="number" v-if="valueAr === 'number'" name="valuen">-->
<!--  <label for="valuen">Number</label>-->
<!--  <label for="tipo">Type</label>-->
<!--  <select v-model="valueAr" name="tipo">-->
<!--   <option v-bind:value="number">Number</option>-->
<!--   <option v-bind:value="text">Text</option>-->
<!--  </select>-->
 </div>
 <div v-if="val.tag == 'Range'&& val.tag">
    <lable for="min">Min</lable>
    <input type="number" min=1 id="min">
    <lable for="max">Max</lable>
    <input type="number" id="max">
 </div>
 <div v-if="val.tag == 'Function' && val.tag">
    <select v-model="valuef">
        <option v-for="(functions, value) in functioVal" 
        v-bind:id="functions"
        v-bind:value="value"> {{ $t( functions + '.label'  ) }}
        </option> 
    </select>
    <div v-if=" valuef === 'Array'">
    <select v-model="valueTypeSel">
        <option v-for="func in functionsType">{{func.name}}</option>
    </select>

            <div v-if="valueTypeSel === 'eq'">
<text-area-input
v-model="valueAr" v-on:agg="addA(functionsType.Match)"></text-area-input>
            
            <button @click="remA(functionsType.Match)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(functionsType.Match.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'neq'">
            <text-area-input
v-model="valueAr" v-on:agg="addA(functionsType.Different)"></text-area-input>
            <button @click="remA(functionsType.Different)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(functionsType.Different.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'hasInside'">
            <text-area-input
v-model="valueAr" v-on:agg="addA(functionsType.Contains)"></text-area-input>
            <button @click="remA(functionsType.Contains)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(functionsType.Contains.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'isThere'">
<text-area-input
v-model="valueAr" v-on:agg="addA(functionsType.Any)"></text-area-input>
            <button @click="remA(functionsType.Any)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(functionsType.Any.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'isInRange'">
        <text-area-input
        v-model="valueAr" v-on:agg="addA(functionsType.Between)"></text-area-input>
            <button @click="remA(functionsType.Between)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(functionsType.Between.list, null, 2) }}</pre>
        </div>
    </div>
    <div v-if=" valuef === 'Value'">
    //FIXME:Single value input doesn't show
        <text-area-input v-model="valueAr">
        </text-area-input>
    </div>
    <div v-if=" valuef === 'Variable'">
        <select> 
        </select>
    </div>
 </div>
</fieldset>
</form>
`;