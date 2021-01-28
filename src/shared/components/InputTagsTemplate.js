export const template =
`
<b-form-group
	:label="label"
	:description="description"
>
	<template #default="{ ariaDescribedby, id, descriptionId, labelId }" >
		<label
			:for="id + '-input-tags'"	
		>{{ labelTags }}</label>
		 <b-form-tags
			v-bind="formTagProps"
			v-on="$listeners"
			:input-id="id + '-input-tags'"
			:aria-describedby="ariaDescribedby"
			:input-attrs="{ 'aria-describedby': ariaDescribedby  }"
			v-model="value"
		></b-form-tags>
		
		<b-form
			@submit.prevent.stop="onAddOption( guessOption )"
			autocomplete="off"
			:aria-describedby="ariaDescribedby"
		>
			<b-form-group
				:label="fieldsetLabel"
				:description="fieldsetDescription"
			>
				<template #default="{ ariaDescribedby: ariaDescribedbyFieldset, id: idFieldset, descriptionId: descriptionIdFieldset, labelId: labelIdFieldset }">
					<div class="row no-gutters">
						<div class="col">
							<b-form-group
								:label="searchLabel"
								:label-for="id + '-tag-search-input'"
								:description="searchDescription"
							>
								<b-form-input
									:id="id + '-tag-search-input'"
									v-model="search"
									:placeholder="searchPlaceholder"
									type="search"
									size="sm"
									autocomplete="off"
									class="d-inline"
									style="height: 3rem; min-width: max-content;"
									:aria-details="ariaDescribedbyFieldset"
								></b-form-input>
							</b-form-group>
						</div>
						<div class="col">
							<b-form-group
								:label="labelSelect"
								:label-for="id + '-list-tags'"
								class="flex-grow-1 h-auto"
							>
								<template #default="{ ariaDescribedby: ariaDescribedby2, id: id2, descriptionId: descriptionId2, labelId: labelId2 }" >
									<div
										class="input-group"
										style="height: 3rem; min-width: max-content;"
									>
										<b-form-select
											:id="id + '-list-tags'"
											:options="availableOptions"
											v-model="guessOption"
											:aria-describedby="ariaDescribedby2"
											class="h-100"
											required
											:aria-details="ariaDescribedbyFieldset"
										>
											<template #first>
												<b-form-select-option
													:value="null"
													disabled
												>{{ firstSelectOptionLabel }}</b-form-select-option>
											</template>
										</b-form-select>
										<div class="input-group-append">
											<b-button
												aria-controls="id + '-list-tags'"
												type="submit"
												:variant="formTagProps.addButtonVariant"
											>{{ formTagProps.addButtonText }}</b-button>
										</div>
									</div>
								</template>
								<template #description>
									<slot name="options-description"></slot>
								</template>
							</b-form-group>
						</div>
					</div>
				</template>
			</b-form-group>
		</b-form>
	</template>
</b-form-group>
`;