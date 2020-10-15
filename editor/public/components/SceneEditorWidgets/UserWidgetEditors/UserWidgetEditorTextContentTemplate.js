export const template =
		`
<div>
<section id="editor-section">
	<h3 id="editorTitle" v-t="'UserWidgets.TextContent.label-text-content-editor'"></h3>
		<editor-menu-bar 
			class="mt-3"
			v-bind:editor="editor"
			v-slot="{ commands, isActive }">
			<div
			aria-labelledby="editorTitle"
			role="menu"
			tabindex="0">
				<b-icon
				v-for="item in menu"
				class="h2 mr-3" 
				v-bind:key="item.type + (item.level ? item.level.level : '')"
				v-bind:title="labelType(item.type + (item.level ? item.level.level : ''))"
				v-bind:icon="item.icon" 
				v-bind:class="{ 'is-active': (isActive[item.type])(item.level) }"
				v-on:click="commands[item.type](item.level)"
				role="menuitem"
				v-bind:aria-label="labelType(item.type + (item.level ? item.level.level : ''))"
				tabindex="0"
				></b-icon>
			</div>
		</editor-menu-bar>
		<editor-content 
			id="editor-content"
			class="mt-2"
			v-bind:editor="editor"/></section>
</section><hr>
<section>
	<h3 v-t="'shared.label-preview'"></h3>
	<text-content v-bind:localHTML="localHTML" v-bind:nextAssetId="nextAssetId"></text-content>
</section>
</div>
`