export const template =
`
<div
	class="h-100"
>
	<div
		v-if="!isChatEnabled"
		class="h-100 d-flex"
	>
		<div
			class="m-auto text-center"
		>
			<h2 v-t="'Player.label-do-you-need-help'"></h2>
			<div
				class="mx-auto"
			>
				<div
					class="mb-2"
				>
					<b-btn
						v-t="'Player.label-i-need-help'"
						variant="danger"
						size="lg"
						v-bind:pressed.sync="isHelpRequested"
					>
					</b-btn>
				</div>
				<div
					v-if="isHelpRequested"
					class="mb-2"
				>
					<b-spinner
						aria-labelledby="player-chat-help-btn-label-waiting"
						aria-live="polite"
						variant="black"
						type="grow"
						style="width: 2rem"
					></b-spinner>
					<i
						id="player-chat-help-btn-label-waiting"
						v-t="'Player.label-waiting'"
					></i>
				</div>
			</div>
		</div>
	</div>
	<div
		v-else
		class="h-100 d-flex flex-column"
	>
		<h4
			class="text-center"
			id="player-chat-description"
		>{{ $t('Player.label-chat-and-ask-help') }}</h4>
		<chat-widget
			ref="chat"
			id="player-chat"
			aria-describedby="player-chat-description"
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
			class="h-100 flex-grow-1"
		>
		</chat-widget>
	</div>
</div>
`;