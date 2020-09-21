export const template = `
<form ref="form" v-on:submit.prevent>
    <fieldset class="form-group">
    <!-- This is for saving the type of option the value the user is about to put is coming from --->
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
            <input-val
        v-on:value="update($event)"
        v-bind:type="val.type"></input-val>
            <!--            v-bind:type="val.type"-->
        </div>
        <div v-if="val.tag == 'Range'&& val.tag" aria-describedby="Ran">
        <b-alert show id="Ran">Inserisci il valore minimo e massimo premendo aggiungi</b-alert>
            <lable for="min">Min</lable>
            <input type="number" v-model.number="valmin" v-bind:max="this.valmax" id="min">
            <lable for="max">Max</lable>
            <input type="number" v-model.number="valmax" v-bind:min="this.valmin" id="max">
            <button v-on:click="mimax()">Aggiungi</button>
        </div>
        <div v-if="val.tag == 'Function' && val.tag">
        <b-alert>Crea una serie di oggetti con valori diversi e funzionalità diverse</b-alert>
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
                    <!--FIXME: I want to save the value into the object param.value but it doesnt appear to happen --->
                    <div v-if="functionsType.Match.param.value">
                    <p>lol</p>
                    </div>
                </div>
                <div v-if="valueTypeSel === 'neq'">
                    <text-area-input
                    v-model="valueAr" v-on:agg="addA(functionsType.Different)"></text-area-input>
                    <button @click="remA(functionsType.Different)">Togli ultimo
                    </button>
                    <pre>{{ JSON.stringify(functionsType.Different.param, null, 2) }}</pre>
                </div>
                <div v-if="valueTypeSel === 'hasInside'">
                    <text-area-input
                    v-model="valueAr" v-on:agg="addA(functionsType.Contains)"></text-area-input>
                    <button @click="remA(functionsType.Contains)">Togli ultimo
                    </button>
                    <pre>{{ JSON.stringify(functionsType.Contains.param, null, 2) }}</pre>
                </div>
                <div v-if="valueTypeSel === 'isThere'">
                    <text-area-input
                    v-model="valueAr" v-on:agg="addA(functionsType.Any)"></text-area-input>
                    <button @click="remA(functionsType.Any)">Togli ultimo
                    </button>
                    <pre>{{ JSON.stringify(functionsType.Any.param, null, 2) }}</pre>
                </div>
                <div v-if="valueTypeSel === 'isInRange'">
                    <text-area-input
                    v-model="valueAr" v-on:agg="addA(functionsType.Between)"></text-area-input>
                    <button @click="remA(functionsType.Between)">Togli ultimo
                    </button>
                    <pre>{{ JSON.stringify(functionsType.Between.param, null, 2) }}</pre>
                </div>
            </div>
            <div v-if=" valuef === 'Value'">
            <text-area-input v-model="valueAr">
            </text-area-input>
        </div>
        <div v-if=" valuef === 'Variable'">
            <select> 
            </select>
        </div>
    </div>
    <div style="float:right">
    <p>Tag:{{val.tag}}</p>
    <label for="valor">Valori:</label>
    <div id="valor" v-for="val in val.param">
    {{val}}
    </div>
</div>
    </fieldset>
</form>
`;