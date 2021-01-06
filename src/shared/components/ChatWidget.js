import {template} from "./ChatTemplate.js";
import {component as listWidgetComponent } from "./ListWidget.js";

export const component = {
	template: template,
	inheritAttrs: false,
	components: {
		listWidget: listWidgetComponent
	},
	props: {
		iconColorProp: {
			type: String,
			default: '#e6e6e6'
		},
		messageBackgroundColorProp: {
			type: String,
			default: '#ffffff'
		},
		messageOutColorProp: {
			type: String,
			default: '#3d7e9a'
		},
		messageInColorProp: {
			type: String,
			default: '#f1f0f0'
		},
		statusLabels: {
			type: Object,
			default: () => {
				return {
					pending: "Sending",
					sent: "Sent",
					rejected: "Sending failed",
				}
			}
		},
		placeholder: String,
		mySelf: Object,
		participants: Array,
		messageListProp: Array,
		initOpenProp: Boolean
	},
	data: () => {
		return {
			youMessage: '',
			isOpen: false,
			mineMessagesClass: ['message-out'],
			othersMessagesClass: ['message-in'],
			lastOtherMessagesCount: 0
		}
	},
	watch: {
		"messageListProp": function (newMessages) {
			this.messageScroll();

			let otherMessages = this.otherMessages;
			if( otherMessages.length >= this.lastOtherMessagesCount ) {
				let newMessages = otherMessages.slice( this.lastOtherMessagesCount, otherMessages.length );
				this.$emit( 'onMessagesReceived', newMessages );
			}
			else {
				this.$emit( 'onMessagesReceived', otherMessages );
			}
			this.lastOtherMessagesCount = otherMessages.length;
		}
	},
	computed: {
		otherMessages() {
			return this.messageListProp.filter( (message) => message.author !== this.mySelf.id )
		}
	},
	methods: {
		getAuthorName( id ) {
			if( id === this.mySelf.id ) {
				return this.mySelf.name;
			}
			else {
				let users = this.participants.filter( user => user.id === id );
				return users[ 0 ].name;
			}
		},
		handleOutboundMessage() {
			if (!this.youMessage) {
				return
			}
			this.$emit('onMessageWasSent', {
				body: this.youMessage,
				author: this.mySelf.id,
				type: "text",
				timestamp: new Date().toISOString()
			})
			this.youMessage = ''
			this.$nextTick(() => {
				this.messageScroll()
			})
		},
		toggleChatOpen() {
			this.isOpen = !this.isOpen
			this.$emit('onToggleOpen', this.isOpen)
		},
		messageScroll() {
			let scrollbar = this.$refs.chatScrollbar;
			scrollbar.scrollTop = scrollbar.scrollHeight;
		}
	},
	mounted() {
		this.isOpen = this.initOpenProp || false
		if (this.messageListProp) {
			this.messageScroll()
		}
	}
}