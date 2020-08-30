export const template =
`
<div
	class="overflow-auto"
>
	<ol
		v-if="tag == 'ol'"
		tabindex="0"
		class="list-group"
		style="list-style-position: inside"
	>
		<li
			v-bind="$attrs"
			v-on="$listeners"
			v-for="(item, keyItem) in list"
			class="list-group-item"
			style="display: list-item"
		>
			<slot
				name="item"
				v-bind="{item, keyItem}"
			></slot>
		</li>
	</ol>
	<ul
		v-else
		tabindex="0"
		class="list-group"
		style="list-style-position: inside"
	>
		<li
			v-bind="$attrs"
			v-on="$listeners"
			v-for="( item, keyItem ) in list"
			class="list-group-item"
		>
			<slot
				name="item"
				v-bind="{item, keyItem}"
			></slot>
		</li>
	</ul>
</div>
`;