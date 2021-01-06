export const template =
`
<chat-widget
	ref="chat"
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
	class="h-100"
>
</chat-widget>
`;