export const template =
`
<div
	role="alert"
	aria-live="assertive"
	aria-atomic="true"
	v-bind:data-autohide="autohide"
	v-bind:data-delay="delay"
	class="toast"
	style="position: relative; top: 0px; right: 0px;"
	>
	<div class="toast-header">
		<img
			v-if="previewImg"
			v-bind:src="previewImg"
			v-bind:alt="previewAlt"
			class="rounded mr-2"
		/>
		<strong
			class="mr-auto"
		>{{ title }}</strong>
		<small class="text-muted">{{ subTitle }}</small>
		<button
			type="button"
			data-dismiss="toast"
			v-bind:aria-label="$t( 'shared.label-close' )"
			class="ml-2 mb-1 close"
		>
			<span
				aria-hidden="true"
			>&times;</span>
		</button>
	</div>
	<div
		class="toast-body"
	>{{ body }}</div>
</div>
`
;

export const _template =
`
<div ref="myt" class="toast" role="alert" aria-live="assertive" aria-atomic="true" v-bind:data-delay="delay" v-bind:data-autohide="autohide">
	<div class="toast-header">
		<strong class="mr-auto">Bootstrap</strong>
		<small class="text-muted">just now</small>
		<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	<div class="toast-body">
		See? Just like this.
	</div>
</div>
`;