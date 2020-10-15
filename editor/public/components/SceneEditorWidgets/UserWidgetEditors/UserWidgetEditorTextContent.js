import {template} from "./UserWidgetEditorTextContentTemplate.js";
import {component as textContentComponent} from "/shared/components/UserWidgetTextContent.js";

let EditorContent = tiptap.EditorContent;
let EditorMenuBar = tiptap.EditorMenuBar;

export const component = {
	template: template,
	props: {
		props: Object,
		locale: String,
		nextAssetId: Number
	},
	components: {
		EditorContent,
		EditorMenuBar,
		"text-content": textContentComponent
	},
	data() {
		return {
			editor: new window.tiptap.Editor({
				extensions: [
					new tiptapExtensions.CodeBlock(),
					new tiptapExtensions.Heading({levels: [1, 2, 3]}),
					new tiptapExtensions.BulletList(),
					new tiptapExtensions.OrderedList(),
					new tiptapExtensions.ListItem(),
					new tiptapExtensions.Bold(),
					new tiptapExtensions.Italic(),
					new tiptapExtensions.Link(),
					new tiptapExtensions.Strike(),
					new tiptapExtensions.Underline(),
					new tiptapExtensions.History(),
				],
				onUpdate: ({getHTML, getJSON}) => {
					this.$emit("inputLocalHTML", getHTML());
					this.localHTML = getHTML();
				},
			}),
			beforeDestroy() {
				this.editor.destroy()
			},
			localHTML: "",
			menu: {
				Heading1: {
					icon: "type-h1",
					type: "heading",
					level: { level: 1 }
				},
				Heading2: {
					icon: "type-h2",
					type: "heading",
					level: { level: 2 }
				},
				Heading3: {
					icon: "type-h3",
					type: "heading",
					level: { level: 3 }
				},
				Bold: {
					icon: "type-bold",
					type: "bold"
				},
				Italic: {
					icon: "type-italic",
					type: "italic"
				},
				Underline: {
					icon: "type-underline",
					type: "underline"
				},
				Strike: {
					icon: "type-strikethrough",
					type: "strike"
				},
				CodeBlock: {
					icon: "code-slash",
					type: "code_block"
				},
				BulletList: {
					icon: "list-ul",
					type: "bullet_list"
				},
				OrderedList: {
					icon: "list-ol",
					type: "ordered_list"
				}
			},
		}
	},
	methods: {
		labelType(value) { return this.$t('UserWidgets.TextContent.label-' + value) }
	},
}