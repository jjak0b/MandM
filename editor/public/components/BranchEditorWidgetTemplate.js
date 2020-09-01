export const template = `
<form ref="form">
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
 v-bind:values="valueAr"></text-area-input>
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
<!--//FIXME: Using the component just reloads the page, probable resolution is to add $emit-->

<!--<text-area-input-->
<!-- v-bind:values="valueAr"-->
<!--v-on:add="addA(functionsType.Match)"></text-area-input>-->
       <div>
       <select v-model="test">
            <option v-bind:value="1" selected>Text</option>
            <option v-bind:value="2">Number</option>
        </select>
        <!-- Sezione con area dipende da val del select testo --->
            <div v-if="test === 1">
                <input v-model="valueAr" type="text">
            </div>
            <div v-if="test === 2" min="1">
                <input type="number" v-model.number="valueAr">
            </div>
            </div>
            <div v-if="valueTypeSel === 'eq'">
            <button @click="addA(functionsType.Match)">Aggiungi
            </button>
            <button @click="remA(functionsType.Match)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Match.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'neq'">
            <button @click="addA(functionsType.Different)">Aggiungi
            </button>
            <button @click="remA(functionsType.Different)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Different.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'hasInside'">
        <!-- Sezione con area dipende da val del select testo --->
            <button @click="addA(functionsType.Contains)">Aggiungi
            </button>
            <button @click="remA(functionsType.Contains)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Contains.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'isThere'">

        <!-- Sezione con area dipende da val del select testo --->
            <button @click="addA(functionsType.Any)">Aggiungi
            </button>
            <button @click="remA(functionsType.Any)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Any.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'isInRange'">
        <!-- Sezione con area dipende da val del select testo --->
<!--        <input type="text" v-model="valuear">-->
<!--        <input type="submit" value="Submit">-->
            <button @click="addA(functionsType.Between)">Aggiungi
            </button>
            <button @click="remA(functionsType.Between)">Togli ultimo
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Between.list, null, 2) }}</pre>
        </div>
    </div>
    <div v-if=" valuef === 'Value'">
    //FIXME:Single value input doesn't show
        <text-area-input v-bind:values="valueAr">
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