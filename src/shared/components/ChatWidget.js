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
		classChatContainer: [Array, String],
		classMessageList: [Array, String],
		classMessageListItem: [Array, String],
		classMessageListItemSelected: [Array, String],
		classMessage: [Array, String],
		classMessageIn: [Array, String],
		classMessageOut: [Array, String],
		classMessageHeader: [Array, String],
		classMessageBody: [Array, String],
		classMessageFooter: [Array, String],


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

			let otherMessages = this.otherMessages;
			if( otherMessages.length != this.lastOtherMessagesCount ) {
				let newMessages = otherMessages.slice( this.lastOtherMessagesCount, otherMessages.length );
				this.$emit( 'onMessagesReceived', newMessages );
				this.messageScroll();
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
		getMessageClass( message ) {
			let classes = new Array( this.classMessage );
			let specificClass = message.author === this.mySelf.id ? this.classMessageOut : this.classMessageIn;
			return classes.concat( specificClass );
		},
		getAuthorName( id ) {
			if( id === this.mySelf.id ) {
				return this.mySelf.name;
			}
			else {
				let users = this.participants.filter( user => user.id === id );
				return users.length > 0 ? users[ 0 ].name : "";
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