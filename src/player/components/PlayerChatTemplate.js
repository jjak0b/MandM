export const template =
`
<chat-widget
	v-on:onMessageWasSent="sendMessage"
	v-bind:messageListProp="messages"
	v-bind:participants="participants"
	v-bind:my-self="mySelf"
	:initOpenProp="true"
	class="h-100"
>
</chat-widget>
`;