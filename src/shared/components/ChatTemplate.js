export const template =
`
<div>
<!--
	<div class="open-chat"
		:class="(isOpen ? 'hide' : 'show')"
		@click="toggleChatOpen"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path :fill="iconColorProp" d="M899.3 171.4l-1.7 294.8s-4.9 159.7-176.2 159.7H481L373.9 736.3l176.2 1.6 242.1 250.3 8.3-256.9s189.4 13.2 189.4-154.8V327.8s8.2-100.3-90.6-156.4zM690.1 584.8c87.3 0 158.1-70.8 158.1-158.1V169.8c0-87.3-70.8-158.1-158.1-158.1h-522C80.8 11.7 10 82.5 10 169.8v256.9c0 87.3 70.8 158.1 158.1 158.1h13.3l1.6 233.9 261.2-233.9h245.9z"/></svg>
	</div>
-->
	<div
		class="h-100"
		:class="(isOpen ? 'show' : 'hide')"
	>
		<b-card
			class="h-100"
			body-class="d-flex flex-column"
			:class="classChatContainer"
		>
		<!--
			<div
				class="close-chat"
				@click="toggleChatOpen"
				:style="{background: iconColorProp}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><g fill="none" stroke="#ffffff" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round"><path d="M10 10l45 45M10 55l45-45"/></g></svg>
			</div>-->

			<div
				class="position-relative h-100"
				role="log"
			>
				<list-widget
					ref="chatScrollbar"
					v-bind:id="$attrs.id + '-' + 'chat-widget'"
					class="position-absolute w-100"
					:list="messageListProp"
					:tag="'div'"
					:tag-item="'div'"
					:role-list="'mark'"
					:role-item="'comment'"
					readonly
					:class-list="classMessageList"
					:class-item="classMessageListItem"
					:class-item-active="classMessageListItemSelected"
					:aria-label="listLabel"
				>
				<template
					v-slot:item="{item: message}"
				>
				<b-card
					aria-atomic="true"
					:key="message.body"
					:class="getMessageClass( message )"
					no-body
				>
					<b-card-header
						:class="classMessageHeader"
					>
						<b-card-sub-title
							sub-title-tag="h4"
							:sub-title-text-variant="null"
						>{{ getAuthorName( message.author ) }}</b-card-sub-title>
					</b-card-header>
					<b-card-body
						:class="classMessageBody"
					>
						<b-card-text v-if="message.type === 'text'">
							<span v-text="message.body"></span>
						</b-card-text>
					</b-card-body>
					<b-card-footer
						footer-tag="div"
						class="clearfix"
						:class="classMessageFooter"
					>
						<span class="float-right">
							<span>
								<slot name="status-pending" v-if="message.status === 'pending'" >
									<b-spinner 
										type="border"
										small
										v-bind:label="statusLabels[ message.status ]"
									></b-spinner>
								</slot>
								<slot name="status-rejected" v-else-if="message.status === 'rejected'"
									role="status"
									aria-live="polite"
								>
									{{ statusLabels[ message.status ] }}
									<b-icon 
										icon="exclamation-triangle" variant="danger"
									></b-icon>
								</slot>
								<slot name="status-sent" v-else
									role="status"
									aria-live="polite"
								>
									{{ statusLabels.sent }}
									<b-icon
										icon="check-square" variant="success"
									></b-icon>
								</slot>
							</span>
							<span>
							<time
								v-bind:datetime="message.timestamp"
								dir="auto"
							>{{ new Date( message.timestamp ).toLocaleTimeString() }}</time>
							</span>
						</span>
					</b-card-footer>
				</b-card>
				</template>
				</list-widget>
			</div>
				<!--
				<p
					v-for="message in messageListProp"
					:key="message.body"
					class="message"
					:style="[message.author === mySelf.id ? {background: messageOutColorProp} : {background: messageInColorProp}]"
					:class="{'message-out': message.author === mySelf.id, 'message-in': message.author !== mySelf.id }"
				>
				  {{ message.body }}
				</p>
				-->
			<b-card-footer>
				<b-form
					@submit.prevent="handleOutboundMessage()"
					class="chat-form"
					autocomplete="off"
				>
					<b-input-group class="justify-content-between">
						<b-form-input
							required
							v-bind:placeholder="placeholder"
							v-model.trim="youMessage"
							class="chat-input"
						></b-form-input>
						<b-input-group-append>
							<b-btn pill type="submit" variant="secondary">{{ $t( 'ChatWidget.label-send' ) }}
								<!--<b-icon
									icon="send"
									:style="{color: iconColorProp, width: '30px'}"
								></b-icon>-->
							</b-btn>
						</b-input-group-append>
					</b-input-group>

				</b-form>
			</b-card-footer>
		</b-card>
	</div>
</div>
`;