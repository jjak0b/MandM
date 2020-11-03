export const template =
`
<div
>
	<ol
		v-if="tag == 'ol'"
		ref="node"
		v-bind:role="roleList"
		v-bind:aria-activedescendant="activedescendant"
		v-on:keyup="KeyHandler"
		v-on:keydown="keyPreventHandler"
		v-on:keyup.enter="setSelected( activedescendantKey )"
		tabindex="0"
		class="overflow-auto list-group"
		style="list-style-position: inside;"
		v-bind:style="getStyle"
	>
		<li
			v-for="(item, keyItem ) in list"
			v-bind:ref="'li' + keyItem"
			v-bind:role="roleItem"
			v-bind:id="$attrs.id + '_li_' + keyItem"
			v-bind:aria-selected="keyItem == selectedKeyIndex || null"
			class="list-group-item list-group-item-action"
			v-bind:class="( keyItem == activedescendantKey ? 'active' : ( keyItem == selectedKeyIndex ? 'list-group-item-success' : null ) )"
			v-on:click="setSelected( keyItem )"
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
		ref="node"
		v-bind:role="roleList"
		v-bind:aria-activedescendant="activedescendant"
		v-on:keyup="KeyHandler"
		v-on:keydown="keyPreventHandler"
		v-on:keyup.enter="setSelected( activedescendantKey )"
		tabindex="0"
		class="overflow-auto list-group"
		style="list-style-position: inside;"
		v-bind:style="getStyle"
	>
		<li
			v-for="(item, keyItem ) in list"
			v-bind:ref="'li' + keyItem"
			v-bind:role="roleItem"
			v-bind:id="$attrs.id + '_li_' + keyItem"
			v-bind:aria-selected="keyItem == selectedKeyIndex || null"
			class="list-group-item list-group-item-action"
			v-bind:class="( keyItem == activedescendantKey ? 'active' : ( keyItem == selectedKeyIndex ? 'list-group-item-success' : null ) )"
			v-on:click="setSelected( keyItem )"
		>
			<slot
				name="item"
				v-bind="{item, keyItem}"
			></slot>
		</li>
	</ul>
</div>
`;