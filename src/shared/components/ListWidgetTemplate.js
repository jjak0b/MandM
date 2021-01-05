export const template =
`
	<component
		v-bind:is="tag"
		ref="node"
		v-bind:role="roleList"
		v-bind:aria-activedescendant="activedescendant"
		v-on:keyup="KeyHandler"
		v-on:keydown="keyPreventHandler"
		v-on:keyup.enter="setSelected( activedescendantKey )"
		tabindex="0"
		v-bind:class="classList"
		v-bind:style="getStyle"
	>
		<component
			v-bind:is="tagItem"
			v-for="(item, keyItem ) in list"
			v-bind:ref="'li' + keyItem"
			v-bind:role="roleItem"
			v-bind:id="$attrs.id + '_li_' + keyItem"
			v-bind:aria-selected="keyItem == selectedKeyIndex || null"
			v-bind:class="getItemClasses(keyItem)"
			v-on:click="setSelected( keyItem )"
		>
			<slot
				name="item"
				v-bind="{item, keyItem}"
			></slot>
		</component>
	</component>
`;