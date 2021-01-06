import {template} from "./PlayerChatTemplate.js";
import {component as chatWidget} from "../../shared/components/ChatWidget.js";

export const component = {
	template: template,
	components: {
		chatWidget
	},
	data() {
		return {
			messages: [

			],
			participants: [

			],
			mySelf: {
				id: "0",
				name: this.$t( "ChatWidget.label-myself" )
			},
			fetchTimeout: 5 * 1000,
		}
	},
	computed: {
		placeholder() { return this.$t('ChatWidget.label-type-your-message'); }
	},
	created() {
		this.initChat()
			.catch( (error) => {
				console.error( "[Chat]", "Unable to init chat", "cause:", error );
			})
	},
	mounted() {

		function fetchAndWaitLoop(timeout) {
			this.fetchAll()
				.finally( () => {
					setTimeout(
						fetchAndWaitLoop.bind( this ),
						timeout,
						timeout
					);
				})
		}
		const start = fetchAndWaitLoop.bind( this );
		start( this.fetchTimeout );
	},
	methods: {
		initChat() {
			return Promise.all([
				this.registerSelfAsContact(),
				this.fetchAll()
			]);
		},
		registerSelfAsContact() {
			return $.get( `/player/chat/` )
				.then(ownerData => {
					this.mySelf.id = ownerData[ 0 ];
					return this.mySelf;
				})
				.catch(error => {
					console.error("[Chat]", "Unable to fetch chatID to detect itSelf", error);
				})
				.then((mySelf) => {
					return $.ajax("/player/chat/contacts/", {
						method: "post",
						contentType: 'application/json',
						data: JSON.stringify([{
							id: mySelf.id,
							name: "Player"
						}])
					});
				})

		},
		sendMessage(message) {
			let request = $.ajax( "/player/chat/messages/", {
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
		fetchAll() {

			let requestContacts = $.get( `/player/chat/contacts/` );
			let requestMessages = $.get( `/player/chat/messages/` );

			return Promise.all( [requestContacts, requestMessages] )
				.then( (responses) => {
					let participants = responses[ 0 ];
					let messages = responses[ 1 ];
					let newMessages = [];

					for (const message of messages) {

						if( message.type === "text" ) {
							newMessages.push( message );
						}
					}

					this.messages = newMessages;
					this.participants = participants;
				})
				.catch( (error) => {
					console.error( "[Chat]", "Unable to fetch contacts and messages, cause:", error );
				});
		},

		showMessagesNotification(messages) {
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
					}
				)
			}
		}
	}
}