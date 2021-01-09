import {template} from "./EvaluatorChatTemplate.js";
import {component as chatWidget} from "../../shared/components/ChatWidget.js";

export const component = {
	template: template,
	components: {
		chatWidget
	},
	props: {
		enableNotifications: {
			type: Boolean,
			default: false
		},
		receiverID: String,
		mySelf: {
			type: Object,
			default: () => {
				return {
					id: "1",
					name: this.$t( "ChatWidget.label-myself" ),
					nameForReceiver: null
				}
			}
		},
		fetchTimeout: {
			type: Number,
			default: 1000
		}
	},
	data() {
		return {
			fetchInterval: null,
			messages: [],
			participants: []
		}
	},
	computed: {
		placeholder() { return this.$t('ChatWidget.label-type-your-message'); }
	},
	created() {
		let interval;
		function tryWhileFailing(timeout) {
			this.initChat()
				.then( () => clearInterval( interval ) )
				.catch( (error) => {
					interval = setInterval( tryWhileFailing.bind( this ), timeout, timeout );
					console.error( "[Chat]", "Unable to init chat, retry later", "cause:", error );
				})
		}

		const start = tryWhileFailing.bind( this );
		start( 2 * 1000 );
	},
	mounted() {
		this.fetchAll();
		this.fetchInterval = setInterval( this.fetchAll, this.fetchTimeout );
	},
	beforeDestroy() {
		clearInterval( this.fetchInterval );
	},
	methods: {
		initChat() {
			return Promise.all([
				this.registerSelfAsContact(),
				this.fetchAll()
			]);
		},
		registerSelfAsContact() {
			$.ajax(`/player/chat/${this.receiverID}/contacts/`, {
				method: "post",
				contentType: 'application/json',
				data: JSON.stringify([{
					id: this.mySelf.id,
					name: this.mySelf.nameForReceiver || this.mySelf.name
				}])
			});
		},
		fetchAll() {

			let requestChatStatus = Promise.resolve( $.get( `/player/chat/${this.receiverID}/status` ) );
			let status;
			return requestChatStatus
				.then( (response) => {
					status = response;
					if( status.online ) {
						let requestContacts = Promise.resolve( $.get( `/player/chat/${this.receiverID}/contacts/` ) );
						let requestMessages = Promise.resolve( $.get( `/player/chat/${this.receiverID}/messages/` ) );

						return Promise.all([requestContacts, requestMessages])
							.then((responses) => {
								let participants = responses[0];
								let messages = responses[1];
								let newMessages = [];

								for (const message of messages) {

									if (message.type === "text") {
										newMessages.push(message);
									}
								}

								this.messages = newMessages;
								this.participants = participants;
							})
							.catch((error) => {
								console.error("[Chat]", "Unable to fetch contacts and messages, cause:", error);
							});
					}
					else {
						return Promise.resolve();
					}
				})
				.catch((error) => {
					console.error("[Chat]", "Unable to fetch chat state, cause:", error);
				})
		},
		sendMessage(message) {
			let request = $.ajax( `/player/chat/${this.receiverID}/messages/`, {
				method: "put",
				contentType: 'application/json',
				data: JSON.stringify( message )
			});

			this.$set( message, "status", "pending" );
			this.messages.push( message );
			request
				.then( () => {
					this.$set( message, "status", "sent" );
				})
				.catch( () => {
					this.$set( message, "status", "rejected" );
				});
		},
		showMessagesNotification(messages) {
			if( !this.enableNotifications ) return;

			const h = this.$createElement;
			for (const message of messages) {
				// Create the message
				let vNodesMsg;

				if( message.type === "text" ) {
					vNodesMsg = h(
						'p',
						{class: ['text-center', 'mb-0']},
						[
							h('strong', message.body ),
						]
					);
				}
				else {
					vNodesMsg = h(
						'p',
						{class: ['text-center', 'mb-0']},
						[
							h('strong', this.$t('shared.ChatWidget.label-new-message') ),
						]
					);
				}

				// Create the title
				const vNodesTitle = h(
					'p',
					{
						class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'],
						"aria-label": this.$t( "shared.ChatWidget.label-new-message")
					},
					[
						h('strong', { class: 'mr-2' }, this.$refs.chat.getAuthorName( message.author ) ),
						h('small', { class: 'ml-auto text-italics' },
							[
								h( 'time', { datetime: message.timestamp}, new Date( message.timestamp).toLocaleTimeString() )
							]
						)
					]
				);

				this.$bvToast.toast(
					[vNodesMsg],
					{
						title: [vNodesTitle],
						appendToast: true,
						noAutoHide: true,
						isStatus: true,
						variant: "info",
						visible: this.enableNotifications
					}
				)
			}
		}
	}
}