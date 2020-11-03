export const template =
`
<div class="form-group">
	<label
		v-if="$attrs.type != 'checkbox' && $attrs.type != 'radio'"
		v-bind:for="$attrs.id"
		v-bind:class="labelClass"
	>
		<strong v-if="statusLabel != null" v-t="statusLabel"></strong>
		<strong v-if="statusSymbol != null" v-html="statusSymbol"></strong>
		<slot></slot>
	</label>
	<div class="d-flex flex-row flex-wrap">
		<div class="flex-grow-1">
			<input
				ref="input"
				v-bind="$attrs"
				v-bind:value="value"
				v-on:input="onInput"
				v-on="inputListeners"
				class="form-control"
				v-bind:aria-describedby=" hasDescription ? $attrs.id + '-description' : null"
			/>
		</div>
		<label
			v-if="$attrs.type == 'checkbox' || $attrs.type == 'radio'"
			v-bind:for="$attrs.id"
			class="flex-fill"
			v-bind:class="labelClass"
		>
			<strong v-if="statusLabel != null" v-t="statusLabel"></strong>
			<strong v-if="statusSymbol != null" v-html="statusSymbol"></strong>
			<slot></slot>
		</label>
		<div
			v-if="hasDescription"
			v-bind:id="$attrs.id + '-description'"
			class="flex-grow-1"
			v-bind:class="messageClass"
			role="alert"
			aria-live="polite"
		>	
			<span v-if="statusMessageContent">{{ statusMessageContent }}</span>
			<slot v-else-if="statusValue == ValidityStates.Error"	name="error"	v-t="statusLabel"></slot>
			<slot v-else-if="statusValue == ValidityStates.Ok" 		name="ok"		v-t="statusLabel"></slot>
			<slot v-else-if="statusValue == ValidityStates.Warning" name="warning"	v-t="statusLabel"></slot>
		</div>
	</div>
</div>
`;