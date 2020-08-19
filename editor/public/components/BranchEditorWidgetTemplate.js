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
  <textarea name="valuea"></textarea>
  <lable for="valuea">Valore</lable>
  <select name="tipo">
   <option>Number</option>
   <option>Text</option>
  </select>
  <label for="tipo">Type</label>
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
    <div v-if=" valuef === 'Array' ">
    <ul>
    <li v-for="functions in functionsType">
    <div v-bind:class="'array-func' + functions"
    <p>{{functions.name}}</p>
</li>
</ul>
    
</div>
    <div v-if=" valuef === 'Value' ">
        <textarea name="txtFV" placeholder="Insert correlated value..">
        </textarea>
        <label for="txtFV">Insertvalue</label>
        <select>
            <option>Number</option>
            <option>Text</option>
        </select>
    </div>
    <div v-if=" valuef === 'Variable'">
        <select> 
        </select>
    </div>
 </div>
</fieldset>
`;