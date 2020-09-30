export const template = `
<b-form v-on:submit.prevent>
		<b-form-group>
			<template v-slot:label
			>{{ $t( 'ActivityEditorWidget.label-input-type' ) }}</template>
			<b-form-row>
				<b-col>
    <!-- This is for saving the type of option the value the user is about to put is coming from --->
        <select class="form-check">
            <option  v-for="(nameType, keyType) in functionsN" 
	        class="form-check-input"
	        v-bind:id="'input-type_' + nameType"
	        v-bind:value="keyType"
	        v-model="val.tag"
            >{{$t(nameType)}}</option>
        </select>
        </b-col>
        <b-col>
        <select v-for="(element, self) in section" v-model="element.type">
        <option v-for="(nameType, keyType) in functioVal"
        v-bind:value="keyType">{{$t(nameType)}}</option>
</select>
<component v-for="(element, index) in section"
v-model="element.value"
        v-if="element.type"
        :is="functioValTag[element.type]"
        ></component>
</b-col>
<!--        <div v-if="val.tag == 'atom' && val.tag">-->
<!--            <single-input-->
<!--            v-on:changeT="placeType($event)"-->
<!--        v-on:agg="placeSingle($event)">-->
<!--        </single-input>-->
<!--            &lt;!&ndash;            v-bind:type="val.type"&ndash;&gt;-->
<!--        </div>-->
<!--        <div v-if="val.tag == 'range'&& val.tag" aria-describedby="Ran">-->
<!--        <b-alert show id="Ran">{{ $t( 'ActivityEditorWidget.range-desc' ) }}</b-alert>-->
<!--            <lable for="min">Min</lable>-->
<!--            <input type="number" v-model.number="valmin" v-bind:max="this.valmax" id="min">-->
<!--            <lable for="max">Max</lable>-->
<!--            <input type="number" v-model.number="valmax" v-bind:min="this.valmin" id="max">-->
<!--            <button v-on:click="mimax()">{{ $t('shared.label-save') }}</button>-->
<!--        </div>-->
<!--        <div v-if="val.tag == 'function' && val.tag">-->
<!--        <b-alert>{{ $t( 'ActivityEditorWidget.function-desc' ) }}</b-alert>-->
<!--            <select v-model="valuef" v-on:submit.prevent>-->
<!--&lt;!&ndash;            <option selected value="">Please select one</option>&ndash;&gt;-->
<!--                <option v-for="(functions, value) in functioVal" -->
<!--                v-bind:id="functions"-->
<!--                v-bind:value="value"> {{ $t( functions  ) }}-->
<!--                </option> -->
<!--            </select>-->
<!--            <select v-model="valueTypeSel">-->
<!--                    <option v-for="(functions, value) in functionsN"-->
<!--                    v-bind:id="functions"-->
<!--                v-bind:value="value">{{$t(functions)}}</option>-->
<!--                </select>-->
<!--            <div v-if=" valuef === 'Value'">-->
<!--            <input-val-->
<!--            v-on:taketype="placeType($event)"-->
<!--       		 v-on:input="update($event, true)">-->
<!--        </input-val>-->
<!--&lt;!&ndash;                <div v-if="valueTypeSel === 'Match'">&ndash;&gt;-->
<!--&lt;!&ndash;                  <text-area-input&ndash;&gt;-->
<!--&lt;!&ndash;                    v-model="valueAr" v-on:agg="addA(functionsType.Match)"></text-area-input>&ndash;&gt;-->
<!--&lt;!&ndash;                    <button @click="remA(functionsType.Match)">Togli ultimo&ndash;&gt;-->
<!--&lt;!&ndash;                    </button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <pre>{{ JSON.stringify(functionsType.Match.list, null, 2) }}</pre>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div v-if="valueTypeSel === 'neq'">&ndash;&gt;-->
<!--&lt;!&ndash;                    <pre>{{ JSON.stringify(functionsType.Different.list, null, 2) }}</pre>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div v-if="valueTypeSel === 'hasInside'">&ndash;&gt;-->
<!--&lt;!&ndash;                    <text-area-input&ndash;&gt;-->
<!--&lt;!&ndash;                    v-model="valueAr" v-on:agg="addA(functionsType.Contains)"></text-area-input>&ndash;&gt;-->
<!--&lt;!&ndash;                    <button @click="remA(functionsType.Contains)">Togli ultimo&ndash;&gt;-->
<!--&lt;!&ndash;                    </button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <pre>{{ JSON.stringify(functionsType.Contains.list, null, 2) }}</pre>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div v-if="valueTypeSel === 'isThere'">&ndash;&gt;-->
<!--&lt;!&ndash;                   <text-area-input&ndash;&gt;-->
<!--&lt;!&ndash;                    v-model="valueAr" v-on:agg="addA(functionsType.Any)"></text-area-input>&ndash;&gt;-->
<!--&lt;!&ndash;                    <button @click="remA(functionsType.Any)">Togli ultimo&ndash;&gt;-->
<!--&lt;!&ndash;                    </button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <pre>{{ JSON.stringify(functionsType.Any.list, null, 2) }}</pre>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div v-if="valueTypeSel === 'isInRange'">&ndash;&gt;-->
<!--&lt;!&ndash;                     <text-area-input&ndash;&gt;-->
<!--&lt;!&ndash;                    v-model="valueAr" v-on:agg="addA(functionsType.Between)"></text-area-input>&ndash;&gt;-->
<!--&lt;!&ndash;                    <button @click="remA(functionsType.Between)">Togli ultimo&ndash;&gt;-->
<!--&lt;!&ndash;                    </button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <pre>{{ JSON.stringify(functionsType.Between.param, null, 2) }}</pre>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </div>-->
<!--        <div v-else-if=" valuef === 'Variable'">-->
<!--            <select> -->
<!--            </select>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div style="float:right" v-if="val.tag">   -->
<!--    {{$t( 'ActivityEditorWidget.label-tag' ) }}:{{$t('ActivityEditorWidget.input-type.'+ val.tag)}} <br>-->
<!--    <p v-if="val.tag != 'any' && val.type!=''">{{$t( 'ActivityEditorWidget.label-type' ) }}: {{$t('shared.label-' +  val.type)}}</p><br>-->
<!--    <p v-if="val.tag== 'function' && valueTypeSel !=''">{{$t('ActivityEditorWidget.label-type-func')}}:{{ $t('ActivityEditorWidget.select-type-func.' + valueTypeSel)}}</p>-->
<!--    <label v-if="val.tag != 'any'" for="valor">{{$t( 'ActivityEditorWidget.label-value' ) }}:</label>-->
<!--   <b-list-group id="valor" v-for="val in val.param">-->
<!--  {{val}}-->
<!--  </b-list-group>-->
<!--</div>-->
</b-form-group>
</b-form>
`;