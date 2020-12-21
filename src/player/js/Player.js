import Story from "../../shared/js/Story.js";
import {Asset} from "../../shared/js/Asset.js";
// Adding these will register them as parsable Nodes
import ActivityNodeTell from "../../../shared/js/ActivityNodes/ActivityNodeTell.js";
import ActivityNodeQuest from "../../../shared/js/ActivityNodes/ActivityNodeQuest.js";
import ActivityNodeBranch from "../../../shared/js/ActivityNodes/ActivityNodeBranch.js";
import ActivityDataBranch from "../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataBranch.js";
import ActivityLogger from "./ActivityLogger.js";

export default class Player {
	constructor() {

		let url = new URL( window.location.href );

		/**
		 *
		 * @type {string|null}
		 */
		this.storyName = url.searchParams.get( "story" );
		/**
		 * @type {Story}
		 */
		this.story = null;
		this.current = {
			parentNodes : [],
			/**
			 * @type {Mission}
			 */
			mission: null,
			missionIndex: -1,
			/**
			 * @type {ActivityNode}
			 */
			activity: null,
			activityIndex: -1
		};

		this.logger = new ActivityLogger(`./log?story=${this.storyName}`);

		this.envVars = {
			userInput: undefined,
			score: 0
		}
	}

	/**
	 *
	 * @param activityBranchNodes {ActivityNodeBranch[]}
	 * @return number
	 */
	checkConditions( activityBranchNodes ) {
		for (let i = 0; i < activityBranchNodes.length; i++) {
			let branchNode = activityBranchNodes[ i ];

			if( branchNode.data.active ){
				let functionName = branchNode.data.condition.function;
				let functionParameters = branchNode.data.condition.params;
				if( !(functionName in ActivityDataBranch._functions) ) {
					console.error( `[${this.constructor.name}]`, "BranchNodeCondition of node", branchNode, `contains unknown function name named "${functionName}" with parameters`, functionParameters );
					continue;
				}
				let result = branchNode.data.check( this.envVars );
				if( result ) {
					return i;
				}
			}
		}

		// No Condition occurred
		return -1;
	}

	/**
	 * @type Player
	 */
	static instance;

	/**
	 *
	 * @returns {Player}
	 */
	static getInstance() {
		if( !this.instance )
			this.instance = new Player();
		return this.instance;
	}

	init() {
		console.log(`[${this.constructor.name}]`, "Init");
		let cachedStoryName = Cookies.get("storyNameInCache");
		return this.downloadStory( this.storyName );
	}

	downloadStory( storyName ) {

		if( !storyName )
			throw new Error("No story defined in URL");
		// let _reqJSONStory = fetch( `/player/js/init.js` );
		let reqJSONStory = fetch( `/stories/${storyName}?source=player` );
		return reqJSONStory
			.catch( (e) => {
				throw e;
			})
			.then( (response) => {
				return response.json();
			})
			.then( (json) => {
				this.story = new Story( json );

				let assetsRequests = [];
				for (const category in this.story.dependencies) {
					if( category === "locales") continue;
					/**
					 * @type { {asset: Asset, count: Number}[] }
					 */
					let assetsEntries = this.story.dependencies[ category ];
					for (const { asset } of assetsEntries) {
						assetsRequests.push( asset.fetch() );
					}
				}
				return assetsRequests;
			});
	}

	main() {
		this.startStory();
	}

	handleActivityBehavior() {
		if( this.current.activity ) {
			console.log(`[${this.constructor.name}]`, "Processing User activity behavior of activity", this.current.activity );
			if (this.current.activity instanceof ActivityNodeTell) {
				// nothing special

				// log end activity
				this.logger.log(
					this.current.mission.id,
					this.current.activity.id,
					{
						input: null,
					}
				);
			}
			else if (this.current.activity instanceof ActivityNodeQuest) {
				let indexBranch = this.checkConditions(this.current.activity.children);

				// select branchNode as parent Node
				if (indexBranch >= 0) {
					let branchNode = this.current.activity.children[indexBranch];
					this.current.parentNodes.push(branchNode);
					this.current.activityIndex = -1;
				}
				// else continue on following sibling activities as "else" branch
			}

			// log end activity
			this.logger.log(
				this.current.mission.id,
				this.current.activity.id,
				{
					input: this.envVars.userInput,
				}
			);
		}

		// go to next activity
		// if has no siblings then go to next mission and set next activity
		// continue while there are mission and there is no next activity
		let nextActivity, nextMission = this.current.mission;
		do {

			console.log(`[${this.constructor.name}]`, "Selecting Next Activity" );
			nextActivity = this.nextActivity();

			if( nextActivity ) {
				console.log(`[${this.constructor.name}]`, "Next Activity found", nextActivity );
			}
			else {
				console.warn(`[${this.constructor.name}]`, "No next Activity found in sequence, selecting next Mission" );
				nextMission = null;
			}

			if( !nextMission ) {
				console.warn(`[${this.constructor.name}]`, "No mission Detected, selecting new Mission" );
				nextMission = this.nextMission();
				if( nextMission ) {
					console.log(`[${this.constructor.name}]`, "next Mission found", nextMission );
					this.current.activityIndex = -1;
					this.current.parentNodes.push( nextMission.tree );
					console.log(`[${this.constructor.name}]`, "selecting first activity in sequence");
				}
				else {
					console.log(`[${this.constructor.name}]`, "No next mission found" );
				}
			}

		}while( !nextActivity && nextMission );

		// no activity left -> end the story
		if( !nextMission && !nextActivity ) {
			console.log(`[${this.constructor.name}]`, "No Activity to handle -> end story" );
			this.endStory();
		}
		else {
			// log new activity
			this.logger.log(
				this.current.mission.id,
				this.current.activity.id,
				null
			);
		}
	}

	nextActivity() {

		let next = null;

		/**
		 * @type {ActivityNode}
		 */
		let parentNode = this.current.parentNodes.length ? this.current.parentNodes[ this.current.parentNodes.length-1 ] : null;

		if( parentNode ) {
			let activities = parentNode.children;
			if( this.current.activityIndex < 0 ) {
				if( activities.length > 0 ) {
					this.current.activityIndex = 0;
				}
			}
			else {
				this.current.activityIndex ++;
				if( this.current.activityIndex >= activities.length ) {
					this.current.activityIndex = -1;
				}
			}

			if( 0 <= this.current.activityIndex && this.current.activityIndex < activities.length ) {
				this.current.activity = activities[ this.current.activityIndex ];
				return this.current.activity;
			}
		}

		return null;
	}

	nextMission() {
		let next = null;
		if( this.current.missionIndex < 0 ) {
			if( this.story.missions.length > 0 ) {
				this.current.missionIndex = 0;
			}
		}
		else {
			this.current.missionIndex ++;
			if( this.current.missionIndex >= this.story.missions.length ) {
				// this.current.missionIndex = -1;
			}
		}

		if( 0 <= this.current.missionIndex && this.current.missionIndex < this.story.missions.length ) {
			this.current.mission =  this.story.missions[ this.current.missionIndex ];
			return this.current.mission;
		}
		else {
			this.current.mission = null;
			// this.current.missionIndex = -1;
			return this.current.mission;
		}
	}

	startStory() {
		console.log( `[${this.constructor.name}]`,"start Story Life cycle");
		this.handleActivityBehavior();
	}

	endStory() {

	}
}