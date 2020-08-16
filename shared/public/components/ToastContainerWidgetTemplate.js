export const template =
`
<aside
	aria-live="polite"
	aria-atomic="true"
	style="position: absolute; top: 0px; right: 0px;"
>
	<toast-widget
		v-for="(toast, index ) in toasts"
		:key="toast"
		v-bind:title="toast.title"
		v-bind:subTitle="toast.subTitle"
		v-bind:body="toast.body"
		v-bind:delay="toast.delay"
		v-bind:autohide="toast.autohide"
		v-bind:previewImg="toast.previewImg"
		v-bind:previewAlt="toast.previewAlt"
		v-on:remove="remove( toast )"
	></toast-widget>
</aside>
`;
// :key="toast" is needed ( just something of unique ) because if not set or left as index,
// when some items are removed there is a chance, that other items which replaced the index of removed ones will be removed