export const template = `
<fieldset class="form-group">
 <legend>{{ $t( "ActivityEditorWidget.label-input-type" ) }}</legend>
 <div v-for="(keyType, valueType) in inputTypes" class="form-check">
  <input type="radio"
	 class="form-check-input"
	 name="keyType"
	 v-bind:id="'input-type_' + keyType"
	 v-bind:value="valueType"
	 v-model="value"
	 v-bind:aria-describedby="keyType"
  />
  <label
	class="form-check-label"
	v-bind:for="'input-type_' + keyType"
  >{{ $t(keyType + '.label' ) }}</label>
 </div>
 <div v-if="value === 'Atom'">
 <text-area-input></text-area-input>
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
 <div v-if="value === 'Range'">
    <lable for="min">Min</lable>
    <textarea id="min"></textarea>
    <lable for="max">Max</lable>
    <textarea id="max"></textarea>
 </div>
 <div v-if="value === 'Function'">
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
       <select v-model="test">
            <option v-bind:value="1">Text</option>
            <option v-bind:value="2">Number</option>
        </select>
        <!-- Sezione con area dipende da val del select testo --->
            <div v-if="test === 1">
                <input v-model="valueAr" type="text">
<!--        <input type="text" v-model="valuear">-->
<!--        <input type="submit" value="Submit">-->
            </div>
            <div v-if="test === 2" min="1">
                <input type="number" v-model.number="valueAr">
            </div>
            <button @click="addM()">Aggiungi
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Match.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'neq'">
            <select v-model="test">
                <option v-bind:value="1">Text</option>
                <option v-bind:value="2">Number</option>
            </select>
        <!-- Sezione con area dipende da val del select testo --->
            <div v-if="test === 1">
                 <input v-model="valueAr" type="text">
<!--        <input type="text" v-model="valuear">-->
<!--        <input type="submit" value="Submit">-->
            </div>
            <div v-if="test === 2" min="1">
                <input type="number" v-model.number="valueAr">
            </div>
            <button @click="addN()">Aggiungi
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Different.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'hasInside'">
            <select v-model="test">
                <option v-bind:value="1">Text</option>
                <option v-bind:value="2">Number</option>
            </select>
        <!-- Sezione con area dipende da val del select testo --->
            <div v-if="test === 1">
                <input v-model="valueAr" type="text">
<!--        <input type="text" v-model="valuear">-->
<!--        <input type="submit" value="Submit">-->
            </div>
            <div v-if="test === 2" min="1">
                <input type="number" v-model.number="valueAr">
            </div>
            <button @click="addI()">Aggiungi
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Contains.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'isThere'">
            <select v-model="test">
                <option v-bind:value="1">Text</option>
                <option v-bind:value="2">Number</option>
            </select>
        <!-- Sezione con area dipende da val del select testo --->
            <div v-if="test === 1">
                <input v-model="valueAr" type="text">
<!--        <input type="text" v-model="valuear">-->
<!--        <input type="submit" value="Submit">-->
            </div>
            <div v-if="test === 2" min="1">
                <input type="number" v-model.number="valueAr">
            </div>
            <button @click="addT()">Aggiungi
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Any.list, null, 2) }}</pre>
        </div>
        <div v-if="valueTypeSel === 'isInRange'">
            <select v-model="test">
                <option v-bind:value="1">Text</option>
                <option v-bind:value="2">Number</option>
            </select>
        <!-- Sezione con area dipende da val del select testo --->
            <div v-if="test === 1">
                <input v-model="valueAr" type="text">
<!--        <input type="text" v-model="valuear">-->
<!--        <input type="submit" value="Submit">-->
            </div>
            <div v-if="test === 2" min="1">
                <input type="number" v-model.number="valueAr">
            </div>
            <button @click="addR()">Aggiungi
            </button>
            <pre>{{ JSON.stringify(this.functionsType.Between.list, null, 2) }}</pre>
        </div>
    </div>
    <div v-if=" valuef === 'Value'">
    //FIXME:Single value input doesn't show
        <text-area-input v-bind:values="valueAr"
        v-bind:inty="test">
      
        </text-area-input>
    </div>
    <div v-if=" valuef === 'Variable'">
        <select> 
        </select>
    </div>
 </div>
</fieldset>
`;