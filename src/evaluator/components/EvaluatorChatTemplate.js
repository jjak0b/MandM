export const template =
`
<chat-widget
	ref="chat"
	tabindex="0"
	:list-label="$t('Player.label-list-messages')"
	v-on:onMessageWasSent="sendMessage"
	v-on:onMessagesReceived="showMessagesNotification"
	v-bind:messageListProp="messages"
	v-bind:placeholder="placeholder"
	v-bind:participants="participants"
	v-bind:my-self="mySelf"
	v-bind:initOpenProp="true"
	v-bind:statusLabels="{
		pending: $t( 'ChatWidget.status.label-sending-message' ),
		sent: $t('ChatWidget.status.label-message-sent' ),
		rejected: $t( 'ChatWidget.status.label-unable-to-send-message' )
	}"
	class-chat-container="chat-container"
	class-message-list="chat-list"
	:class-message-list-item="[]"
	class-message-list-item-selected="bg-info"
	class-message="message"
	class-message-in="message-in"
	class-message-out="message-out"
	:class-message-header="[ 'message-header', 'mb-2', 'p-0' ]"
	:class-message-body="[ 'message-body', 'mb-2', 'p-0' ]"
	:class-message-footer="[ 'message-footer', 'text-info', 'mb-2', 'p-0' ]"
>
</chat-widget>
`;