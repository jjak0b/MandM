export const template =
    `
    <div>
<section>
	<b-form>
		<b-form-group>
			<template v-slot:label
			>{{ $t('UserWidgets.Inventory.label-settings') }}</template>
			<b-col class="col">
						<label for="inventoryEditor-input-operation">$t('UserWidgets.Inventory.label-object-operation')</label>
            <b-form-select
            id="inventoryEditor-input-operation"
            v-model="props.operation"
            v-bind:option="inventory"></b-form-select>
            </b-col>
        <b-col class="col">
		    <b-row class="row">
			<div v-if="props.operations == 'give' class="form-group">
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
			</div>
		</b-row>
		<b-row>
		<label for="inventoryEditor-input-name">{{ $t("UserWidgets.Inventory.label-object-name") }}
		</label>
		<input id="inventoryEditor-input-name" 
		class="form-control"
		v-model="props.name">
		</b-row>
		</b-col>
		<b-col>
		<b-row>
		<label for="inventoryEditor-input-desc">{{ $t("UserWidgets.Inventory.label-object-desc") }}
		</label>
		<textarea id="inventoryEditor-input-desc" 
		rows="4"
		class="form-control"
		v-model="props.desc">
		</textarea>
</b-row>
<b-row>
<label for="inventoryEditor-input-image">{{ $t("UserWidgets.Inventory.label-object-image") }}
		</label>
		<input
		                        v-model="props.img"
								type="file"
								name="file"
								id="inventoryEditor-input-image"
								required="required"
								accept="image/*"
<!--								v-on:change="(event) => { onFileload(event, 'main'); updateSource(); updateCaptions(); }"-->
								class="form-control"
							/>
</b-row>	
</b-col>

			</b-form-group>
			</b-form>
			</section>
			</div>
    
    
    
    
    `;