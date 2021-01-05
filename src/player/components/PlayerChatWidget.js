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
				{
					author: "notMe",
					body: "Hello",
					timestamp: "2019-03-23T15:35"
				},
				{
					author: "me",
					body: "World !!",
					timestamp: "2019-03-24T15:35"
				},
				{
					author: "notMe",
					body: "Hello2",
					timestamp: "2019-03-25T15:35"
				},
				{
					author: "me",
					body: "World 2!!",
					timestamp: "2019-03-26T15:35"
				}
			],
			participants: [
				{
					id: "me",
					name: "Me"
				},
				{
					id: "notMe",
					name: "Helper"
				},
			],
			mySelf: {
				id: "me",
				name: "self"
			}
		}
	},
	methods: {
		sendMessage(message) {
			this.messages.push( message );
		}
	}
}