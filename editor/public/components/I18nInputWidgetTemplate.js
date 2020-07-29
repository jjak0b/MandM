export const template =
`<input
	v-if="tag == 'input'"
	v-bind="$attrs"
	v-on="$listeners"
	v-bind:disabled="locale ? false : true"
	v-model="localeDataRef[ endTargetLabel ]">
<textarea
	v-else-if="tag == 'textarea'"
	v-bind="$attrs"
	v-on="$listeners"
	v-bind:disabled="locale ? false : true"
	v-model="localeDataRef[ endTargetLabel ]"
></textarea>
`;
