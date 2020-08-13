export const template = `
<div v-for="(keyType, valueType) in inputTypes" class="form-check">
								<input
									type="radio"
									class="form-check-input"
									name="inputTy"
									v-bind:id="'input-type_' + keyType"
									v-bind:value="valuetype"
									v-model="value.type"
								/>
								<label
									class="form-check-label"
									v-bind:for="'input-type_' + type"
								>{{ $t(localeLabel + '.label' ) }}</label>
							</div>
</div> 
`