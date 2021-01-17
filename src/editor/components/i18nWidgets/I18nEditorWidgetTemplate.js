export const template =
		`
<div id="editor-section">
	<h3 id="editorTitle" v-t="'UserWidgets.TextContent.label-text-content-editor'"></h3>
		<editor-menu-bar 
			class="mt-3"
			v-bind:editor="editor"
			v-slot="{ commands, isActive }"
		>
			<b-button-toolbar		
				aria-labelledby="editorTitle"
				key-nav
				class="justify-content-around align-items-center"
			>
				<b-button
					v-for="item in menu"
					variant="outline-secondary"
					v-bind:key="item.type + (item.level ? item.level.level : '')"
					v-bind:title="labelType(item.type + (item.level ? item.level.level : ''))"
					v-bind:aria-label="labelType(item.type + (item.level ? item.level.level : ''))"
					class="h2" 
					v-on:click="commands[item.type](item.level)"
					v-bind:pressed="(isActive[item.type])(item.level)"
				>
					<b-icon
						aria-hidden="true"
						v-bind:icon="item.icon" 
					></b-icon>
				</b-button>
			</b-button-toolbar>
		</editor-menu-bar>
		<editor-content 
			id="editor-content"
			class="mt-2"
			v-bind:editor="editor"/></div>
</div>
`