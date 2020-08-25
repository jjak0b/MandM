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
 <select>
 <option v-for="func in functionsType">{{func.name}}</option>
</select>
    <select v-model="valuef">
        <option v-for="(functions, value) in functioVal" 
        v-bind:id="functions"
        v-bind:value="value"> {{ $t( functions + '.label'  ) }}
        </option>
    </select>
    <div v-if=" valuef === 'Array'">
       <div>
        <textarea v-model="valueAr">
        </textarea> 
        <select>
            <option value="Text">text</option>
            <option value="Number">Number</option>
        </select>
       </div>
       <button v-on:click="save()">Add</button>
    </div>
    <div v-if=" valuef === 'Value'">
    //FIXME:Single value input doesn't show
       <select v-model="valueAr">
            <option v-bind:value="Text">text</option>
            <option v-bind:value="Number">Number</option>
        </select>
       <div v-if="valuear === 'Text'">
        <textarea>
        </textarea> 
        </div>
        <div v-if="valuear === 'Number'">
       </div>
    </div>
    <div v-if=" valuef === 'Variable'">
        <select> 
        </select>
    </div>
 </div>
</fieldset>
`;