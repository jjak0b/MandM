export const template =
    `
<div>
    <section>
        <b-form>
            <b-form-group>
            <template v-slot:label
			>{{ $t('UserWidgets.label-photo-settings') }}</template>
			<b-form-row>
            <b-col>
               
                <b-form-select v-bind:options="typeOfCapture" v-model="component.type">
                    {{ $t( 'UserWidgets.label.select-type-media' ) }}
                </b-form-select>
                 <b-form-radio-group v-if="component.type=='image/*'"
                 id="radio-group-1"
                 v-model="component.cap"
                 v-bind:options="side"
                 name="radio-options"
                ></b-form-radio-group>
<!--                     <b-form-radio v-if="typed.Value=='image/*'" v-model="typedValue.cap" value="user" selected>User</b-form-radio>-->
<!--                     <b-form-radio v-if="typed.Value=='image/*'" v-model="typedValue.cap" value="enviroment"">Enviroment</b-form-radio>-->
<!--               -->
            </b-col>
</b-form-row>
            </b-form-group>
        </b-form>
	    <h4 v-t="'shared.label-preview'"></h4>
	    <user-widget-photo
	    v-bind:type="component.type"
	    v-bind:cap="component.cap"
	    ></user-widget-photo>
    </section>
</div>
    `;