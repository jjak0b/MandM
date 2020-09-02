export const template =
`
<div>
	<label
		v-if="$attrs.type != 'checkbox' && $attrs.type != 'radio'"
		v-bind:for="$attrs.id"
		v-bind:class="labelClass"
	>
		<strong v-if="statusLabel != null" >{{ $t(statusLabel) }}</strong>
		<strong v-if="statusSymbol != null" v-html="statusSymbol"></strong>
		<slot></slot>
	</label>
	<div class="d-flex flex-row flex-wrap">
		<div class="flex-grow-1">
			<input
				v-on:input="onInput"
				v-bind="$attrs"
				v-on="$listeners"
				class="form-control"
				v-bind:aria-describedby="$attrs.id + '-description'"
			/>
		</div>
		<label
			v-if="$attrs.type == 'checkbox' || $attrs.type == 'radio'"
			v-bind:for="$attrs.id"
			class="flex-fill"
			v-bind:class="labelClass"
		>
			<strong v-if="statusLabel != null" >{{ $t(statusLabel) }}</strong>
			<strong v-if="statusSymbol != null" v-html="statusSymbol"></strong>
			<slot></slot>
		</label>
		<div
			v-bind:id="$attrs.id + '-description'"
			class="flex-grow-1"
			v-bind:class="messageClass"
			role="alert"
			aria-live="polite"
		>	
			<span v-if="statusMessageContent" v-html="statusMessageContent"></span>
			<slot v-else-if="statusValue == ValidityStates.Error"	name="error"></slot>
			<slot v-else-if="statusValue == ValidityStates.Ok" 		name="ok"></slot>
			<slot v-else-if="statusValue == ValidityStates.Warning" name="warning"></slot>
		</div>
	</div>
</div>
`;