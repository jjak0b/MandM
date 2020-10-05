export const template =
    `
    <div>
<b-form-row v-on:submit.prevent>
		<b-form-group>
			<template v-slot:label
			>{{ $t( 'UserWidget.Inventory.label-settings' ) }}</template>
			    <b-form-row class="row">
			        <b-col class="col">
			            <b-row class="row">
			                <label for="inventoryEditor-input-operation">{{$t('UserWidgets.Inventory.label-object-operation')}}</label>
                                <b-form-select
                                id="inventoryEditor-input-operation"
                                v-model="props.operation"
                                v-bind:options="inventory"></b-form-select>
                            </b-row>
                            <b-row>
				                    <label for="inventoryEditor-input-id"
				                    >{{ $t("UserWidgets.Inventory.label-object-id") }}</label>
				                        <div class="input-group mb-2">
					                        <div class="input-group-prepend">
						                        <div class="input-group-text">#</div>
					                            </div>
					<!---TODO: Need to add an operation to check server id objects in case it already exist --->
					                            <input
						                        id="inventoryEditor-input-id"
						                        type="text"
						                        class="form-control"
						                        v-model.trim="props.id"
						                        v-on:keydown.space.prevent
					                            />
				                         </div>
                              </b-row>
                    </b-col>
                    <b-col class="col">
		                <b-row class="row">
			                <label for="inventoryEditor-input-name">{{ $t('UserWidgets.Inventory.label-object-name') }}
		                    </label>
		                    <b-form-text id="inventoryEditor-input-name" 
		                    class="form-control"
		                    v-model="props.name">
		                </b-row>
		                <b-row>
		                    <label for="inventoryEditor-input-desc">{{ $t("UserWidgets.Inventory.label-object-desc") }}
		                    </label>
		                    <b-form-textarea id="inventoryEditor-input-desc" 
		                    rows="4"
		                    class="form-control"
		                    v-model="props.desc">
		                    </b-form-textarea>
		                </b-row>
		            </b-col>
		            <b-col>
		                <b-row>
		                    <label for="inventoryEditor-input-image">{{ $t("UserWidgets.Inventory.label-object-image") }}
		                    </label>
		                    <b-form-file
		                    v-model="props.img"
						    id="inventoryEditor-input-image"
							required="required"
							accept="image/*"
							class="form-control"/>
<!--							v-on:change="(event) => { onFileload(event, 'main'); updateSource(); updateCaptions(); }"&ndash;&gt;-->						
                        </b-row>
                        <b-row>
                        <b-img v-bind:src="props.img"></b-img>
                        </b-row>
                    </b-col>
                </b-form-row>
			</b-form-group>
		</b-form>
	</section>
</div>    
    `;