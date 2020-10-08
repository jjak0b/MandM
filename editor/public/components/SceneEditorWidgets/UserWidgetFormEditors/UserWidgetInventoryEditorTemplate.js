export const template =
    `
    <div>
        <b-form-group>
<b-form-row v-on:submit.prevent>
		        <b-col>
		            <label for="storyEditor-inventory-id"> 
                    {{ $t("StoryEditor.label-id-inventory") }}</label>
                    <input
						id="storyEditor-inventory-id"
						class="form-control"
						v-model="inv.id"
						v-on:keydown.space.prevent
					/>
                </b-col>
                <b-col>
                    <div>
                        <label for="storyEditor-inventory-name"> 
                        {{ $t("StoryEditor.label-name-inventory") }}</label>
                        <input
                        type="text"                        
						id="storyEditor-inventory-id"
						class="form-control"
						v-model="inv.name"
					    />
					</div>
					<div>
                    <label for="storyEditor-inventory-desc"> 
                    {{ $t("StoryEditor.label-desc-inventory") }}</label>
                        <textarea
						id="storyEditor-inventory-id"
						class="form-control"
						rows="4"
						v-model="inv.desc"
					    >
					    </textarea>
					</div>
                </b-col>
                <b-col>
                <div>
                <label for="storyEditor-inventory-image">
                {{ $t("StoryEditor.label-image-inventory") }}</label>
                 <b-form-file
                           
		                    v-model="inv.image"
						    id="storyEditor-inventory-image"
							required="required"
							accept="image/*"
							class="form-control">
</b-form-file>
</div>
<b-button v-on:click="pushObject()">Aggiungi</b-button>
</b-col>
            </b-form-row>
        </b-form-group>
	</b-form>
	<div v-for="(self, index) in initInv" style="height:30%; width:30%;">
	<b-card
	v-bind:title="self.name"
	v-bind:img-src="self.image"
	img-top
	>
	<b-card-text width="20px" height="10px">
	{{self.desc}}
</b-card-text>
<b-button v-on:click="removeInv(self)">{{$t('shared.label-delete')}}</b-button>
</b-card>
</div>
<!--		<b-form-group>-->
<!--			<template v-slot:label-->
<!--			>{{ $t( 'UserWidget.Inventory.label-settings' ) }}</template>-->
<!--			    <b-form-row class="row">-->
<!--			        <b-col class="col">-->
<!--			            <b-row class="row">-->
<!--			                <label for="inventoryEditor-input-operation">{{$t('UserWidgets.Inventory.label-object-operation')}}</label>-->
<!--                                <b-form-select-->
<!--                                id="inventoryEditor-input-operation"-->
<!--                                v-model="props.operation"-->
<!--                                v-bind:options="inventory"></b-form-select>-->
<!--                            </b-row>-->
<!--                            <b-row>-->
<!--				                    <label for="inventoryEditor-input-id"-->
<!--				                    >{{ $t("UserWidgets.Inventory.label-object-id") }}</label>-->
<!--				                        <div class="input-group mb-2">-->
<!--					                        <div class="input-group-prepend">-->
<!--						                        <div class="input-group-text">#</div>-->
<!--					                            </div>-->
<!--					&lt;!&ndash;-TODO: Need to add an operation to check server id objects in case it already exist -&ndash;&gt;-->
<!--					                            <input-->
<!--						                        id="inventoryEditor-input-id"-->
<!--						                        type="text"-->
<!--						                        class="form-control"-->
<!--						                        v-model.trim="props.id"-->
<!--						                        v-on:keydown.space.prevent-->
<!--					                            />-->
<!--				                         </div>-->
<!--                              </b-row>-->
<!--                    </b-col>-->
<!--                    <b-col class="col">-->
<!--                    <b-row>-->
<!--			                <label for="inventoryEditor-input-name">{{ $t('UserWidgets.Inventory.label-object-name') }}-->
<!--		                    </label>-->
<!--		                    <input -->
<!--		                    id="inventoryEditor-input-name" -->
<!--		                    type="text"-->
<!--		                    class="form-control"-->
<!--		                    v-model="props.name">-->
<!--		                </b-row>-->
<!--		                <b-row>-->
<!--		                    <label for="inventoryEditor-input-desc">{{ $t("UserWidgets.Inventory.label-object-desc") }}-->
<!--		                    </label>-->
<!--		                    <textarea id="inventoryEditor-input-desc" -->
<!--		                    rows="4"-->
<!--		                    class="form-control"-->
<!--		                    v-model="props.desc">-->
<!--		                    </textarea>-->
<!--		                </b-row>-->
<!--		            </b-col>-->
<!--		            <b-col>-->
<!--		                <b-row>-->
<!--		                    <label for="inventoryEditor-input-image">{{ $t("UserWidgets.Inventory.label-object-image") }}-->
<!--		                    </label>-->
<!--		                    <b-form-file-->
<!--		                    v-model="props.img"-->
<!--						    id="inventoryEditor-input-image"-->
<!--							required="required"-->
<!--							accept="image/*"-->
<!--							class="form-control"/>-->
<!--&lt;!&ndash;							v-on:change="(event) => { onFileload(event, 'main'); updateSource(); updateCaptions(); }"&ndash;&gt;&ndash;&gt;						-->
<!--                        </b-row>-->
<!--                        <b-row>-->
<!--                        <b-img v-bind:src="props.img"></b-img>-->
<!--                        </b-row>-->
<!--                    </b-col>-->
<!--                </b-form-row>-->
<!--			</b-form-group>-->
<!--		</b-form>-->
<!--	</section>-->
<!--</div>    -->
    `;