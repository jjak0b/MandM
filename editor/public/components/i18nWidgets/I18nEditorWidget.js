import {template} from "./I18nEditorWidgetTemplate.js";
import { i18n } from "/edit/components/Translations.js";
import { I18nUtils } from "/shared/js/I18nUtils.js";

let EditorContent = tiptap.EditorContent;
let EditorMenuBar = tiptap.EditorMenuBar;

export const component = {
	i18n: i18n,
	template: template,
	props: {
		locale: String,
		localeLabel: String,
		localesList: Array
	},
	components: {
		EditorContent,
		EditorMenuBar
	},
	watch: {
		locale: function () {
			this.editor.setContent(this.getContent());
		}
	},
	data() {
		return {
			I18nUtils: I18nUtils,
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
				content: this.getContent(),
				onUpdate: ({getHTML, getJSON}) => {
					let value = getHTML();
					this.setContentOf( this.locale, this.localeLabel, value)
				},
			}),
			beforeDestroy() {
				this.editor.destroy()
			},
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
		labelType(value) { return this.$t('UserWidgets.TextContent.label-' + value) },
		setContentOf( locale, label, value) {
			if(this.locale) {
				let obj = I18nUtils.buildObjectFromLabel(label, value);
				this.$i18n.mergeLocaleMessage(locale, obj);
			}
		},
		getContent(){
			if(this.locale) {
				if( !this.$i18n.te( this.localeLabel, this.locale ) ) {
					if( this.$i18n.te( this.localeLabel, 'en-US' ) ) {
						return this.$i18n.t(this.localeLabel, 'en-US');
					}
					else {
						for (const locale of this.localesList) {
							if( this.$i18n.te( this.localeLabel, locale ) ) {
								return this.$i18n.t(this.localeLabel, locale );
							}
						}
					}
				}
				if (this.$i18n.te(this.localeLabel, this.locale))
					return this.$i18n.t(this.localeLabel, this.locale);
			}
			return ""
		}
	},
}