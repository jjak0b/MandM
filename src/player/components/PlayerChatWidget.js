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
					body: "Hello"
				},
				{
					author: "me",
					body: "World !!"
				},
				{
					author: "notMe",
					body: "Hello2"
				},
				{
					author: "me",
					body: "World 2!!"
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