export const template = `
<form ref="form" v-on:submit.prevent>
    <fieldset class="form-group">
    <!-- This is for saving the type of option the value the user is about to put is coming from --->
    <legend>{{ $t( 'ActivityEditorWidget.label-input-type' ) }}</legend>
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
        >{{ $t(keyType ) }}</label>
        </div>
        <div v-if="val.tag == 'atom' && val.tag">
            <input-val
            v-on:taketype="placeType($event)"
        v-on:value="update($event, false)">
        
</input-val>
            <!--            v-bind:type="val.type"-->
        </div>
        <div v-if="val.tag == 'range'&& val.tag" aria-describedby="Ran">
        <b-alert show id="Ran">{{ $t( 'ActivityEditorWidget.range-desc' ) }}</b-alert>
            <lable for="min">Min</lable>
            <input type="number" v-model.number="valmin" v-bind:max="this.valmax" id="min">
            <lable for="max">Max</lable>
            <input type="number" v-model.number="valmax" v-bind:min="this.valmin" id="max">
            <button v-on:click="mimax()">{{ $t('shared.label-save') }}</button>
        </div>
        <div v-if="val.tag == 'function' && val.tag">
        <b-alert>{{ $t( 'ActivityEditorWidget.function-desc' ) }}</b-alert>
            <select v-model="valuef" v-on:submit.prevent>
<!--            <option selected value="">Please select one</option>-->
                <option v-for="(functions, value) in functioVal" 
                v-bind:id="functions"
                v-bind:value="value"> {{ $t( functions  ) }}
                </option> 
            </select>
            <select v-model="valueTypeSel">
                    <option v-for="(functions, value) in functionsN"
                    v-bind:id="functions"
                v-bind:value="value">{{$t(functions)}}</option>
                </select>
            <div v-if=" valuef === 'Value'">
            <input-val
            v-on:taketype="placeType($event)"
        v-on:value="update($event, true)">
        </input-val>
<!--                <div v-if="valueTypeSel === 'Match'">-->
<!--                  <text-area-input-->
<!--                    v-model="valueAr" v-on:agg="addA(functionsType.Match)"></text-area-input>-->
<!--                    <button @click="remA(functionsType.Match)">Togli ultimo-->
<!--                    </button>-->
<!--                    <pre>{{ JSON.stringify(functionsType.Match.list, null, 2) }}</pre>-->
<!--                </div>-->
<!--                <div v-if="valueTypeSel === 'neq'">-->
<!--                    <pre>{{ JSON.stringify(functionsType.Different.list, null, 2) }}</pre>-->
<!--                </div>-->
<!--                <div v-if="valueTypeSel === 'hasInside'">-->
<!--                    <text-area-input-->
<!--                    v-model="valueAr" v-on:agg="addA(functionsType.Contains)"></text-area-input>-->
<!--                    <button @click="remA(functionsType.Contains)">Togli ultimo-->
<!--                    </button>-->
<!--                    <pre>{{ JSON.stringify(functionsType.Contains.list, null, 2) }}</pre>-->
<!--                </div>-->
<!--                <div v-if="valueTypeSel === 'isThere'">-->
<!--                   <text-area-input-->
<!--                    v-model="valueAr" v-on:agg="addA(functionsType.Any)"></text-area-input>-->
<!--                    <button @click="remA(functionsType.Any)">Togli ultimo-->
<!--                    </button>-->
<!--                    <pre>{{ JSON.stringify(functionsType.Any.list, null, 2) }}</pre>-->
<!--                </div>-->
<!--                <div v-if="valueTypeSel === 'isInRange'">-->
<!--                     <text-area-input-->
<!--                    v-model="valueAr" v-on:agg="addA(functionsType.Between)"></text-area-input>-->
<!--                    <button @click="remA(functionsType.Between)">Togli ultimo-->
<!--                    </button>-->
<!--                    <pre>{{ JSON.stringify(functionsType.Between.param, null, 2) }}</pre>-->
<!--                </div>-->
            </div>
        <div v-else-if=" valuef === 'Variable'">
            <select> 
            </select>
        </div>
    </div>
    <div style="float:right" v-if="val.tag">   
    {{$t( 'ActivityEditorWidget.label-tag' ) }}:{{$t('ActivityEditorWidget.input-type.'+ val.tag)}} <br>
    <p v-if="val.tag != 'any' && val.type!=''">{{$t( 'ActivityEditorWidget.label-type' ) }}: {{$t('shared.label-' +  val.type)}}</p><br>
    <p v-if="val.tag== 'function' && valueTypeSel !=''">{{$t('ActivityEditorWidget.label-type-func')}}:{{ $t('ActivityEditorWidget.select-type-func.' + valueTypeSel)}}</p>
    <label v-if="val.tag != 'any'" for="valor">{{$t( 'ActivityEditorWidget.label-value' ) }}:</label>
   <div id="valor" v-for="val in val.param">
  {{val}}
  </div>
</div>
    </fieldset>
</form>
`;