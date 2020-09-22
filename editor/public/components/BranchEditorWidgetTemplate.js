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
        <div v-if="val.tag == 'Atom' && val.tag">
            <input-val
            v-on:taketype="val.type=$event"
        v-on:value="update($event)">
        
</input-val>
            <!--            v-bind:type="val.type"-->
        </div>
        <div v-if="val.tag == 'Range'&& val.tag" aria-describedby="Ran">
        <b-alert show id="Ran">{{ $t( 'ActivityEditorWidget.range-desc' ) }}</b-alert>
            <lable for="min">Min</lable>
            <input type="number" v-model.number="valmin" v-bind:max="this.valmax" id="min">
            <lable for="max">Max</lable>
            <input type="number" v-model.number="valmax" v-bind:min="this.valmin" id="max">
            <button v-on:click="mimax()">Aggiungi</button>
        </div>
        <div v-if="val.tag == 'Function' && val.tag">
        <b-alert>{{ $t( 'ActivityEditorWidget.function-desc' ) }}</b-alert>
            <select v-model="valuef">
                <option v-for="(functions, value) in functioVal" 
                v-bind:id="functions"
                v-bind:value="value"> {{ $t( functions  ) }}
                </option> 
            </select>
            <div v-if=" valuef === 'Array'">
                <select v-model="valueTypeSel">
                    <option v-for="(functions, value) in functionsN"
                    v-bind:id="functions"
                v-bind:value="value">{{$t(functions)}}</option>
                </select>
                <div v-if="valueTypeSel === 'eq'">
                   <input-val
            v-on:taketype="val.type=$event"
        v-on:value="update($event)">
        
        </input-val>
                </div>
                <div v-if="valueTypeSel === 'neq'">
                    <input-val
            v-on:taketype="val.type=$event"
        v-on:value="update($event)">
        </input-val>
                    <pre>{{ JSON.stringify(functionsType.Different.param, null, 2) }}</pre>
                </div>
                <div v-if="valueTypeSel === 'hasInside'">
                    <input-val
            v-on:taketype="val.type=$event"
        v-on:value="update($event)">
        </input-val>
                    <pre>{{ JSON.stringify(functionsType.Contains.param, null, 2) }}</pre>
                </div>
                <div v-if="valueTypeSel === 'isThere'">
                  <input-val
            v-on:taketype="val.type=$event"
        v-on:value="update($event)">
        </input-val>
                    <pre>{{ JSON.stringify(functionsType.Any.param, null, 2) }}</pre>
                </div>
                <div v-if="valueTypeSel === 'isInRange'">
                    <input-val
            v-on:taketype="val.type=$event"
        v-on:value="update($event)">
        </input-val>
                    <pre>{{ JSON.stringify(functionsType.Between.param, null, 2) }}</pre>
                </div>
            </div>
            <div v-if=" valuef === 'Value'">
            <input-val
            v-on:taketype="val.type=$event"
        v-on:value="update($event)">
        </input-val>
        </div>
        <div v-if=" valuef === 'Variable'">
            <select> 
            </select>
        </div>
    </div>
    <div style="float:right">
    <th>
    <td>{{$t( 'ActivityEditorWidget.label-tag' ) }}</td>
    <td>{{$t( 'ActivityEditorWidget.label-type' ) }}</td>
    <td>{{$t( 'ActivityEditorWidget.label-value' ) }}</td>
    </th>
    <tr>
    <td>{{val.tag}}</td>
    <td>{{val.type}}</td>
    <td>{{val.param}}</td>
    </tr>
</table>
<!--    :{{val.tag}} {{$t( 'ActivityEditorWidget.label-type' ) }}:{{val.type}} -->
<!--    <p v-if="val.tag== 'Function'">Type of Condition:{{valuef}}</p>-->
<!--    <label for="valor">{{$t( 'ActivityEditorWidget.label-value' ) }}:</label>-->
<!--    <div id="valor" v-for="val in val.param">-->
<!--    {{val}}-->
  </div>
</div>
    </fieldset>
</form>
`;