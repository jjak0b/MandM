import Story from "../../shared/js/Story.js";
import {Asset} from "../../shared/js/Asset.js";
// Adding these will register them as parsable Nodes
import ActivityNodeTell from "../../../shared/js/ActivityNodes/ActivityNodeTell.js";
import ActivityNodeQuest from "../../../shared/js/ActivityNodes/ActivityNodeQuest.js";
import ActivityNodeBranch from "../../../shared/js/ActivityNodes/ActivityNodeBranch.js";
import ActivityDataBranch from "../../shared/js/ActivityNodes/ActivityDataTypes/ActivityDataBranch.js";
import ActivityLogger from "./ActivityLogger.js";
import {TypedValue} from "../../shared/js/Types/TypedValue.js";
import Time from "../../shared/js/Types/Time.js";

export default class Player {
	constructor() {

		// reuse already created references in dependencies fetch when Asset constructor will be called
		Asset.shouldReuseCache = true;

		/**
		 *
		 * @type {string|null}
		 */
		this.storyName = null;

		/**
		 *
		 * @type {Number|null}
		 */
		this.team = null;

		/**
		 *
		 * @type {string|null}
		 */
		this.storyURL = null;

		/**
		 *
		 * @type {Mission[]}
		 */
		this.missionsPool = [];

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


		/**
		 *
		 * @type {ActivityLogger}
		 */
		this.logger = null;

		this.envVars = {
			score: new TypedValue({ type: Number.name, value: 0} )
		}
	}

	/**
	 *
	 * @param activityBranchNodes {ActivityNodeBranch[]}
	 * @param localEnvVars {Object}
	 * @return number
	 */
	checkConditions( activityBranchNodes, localEnvVars ) {
		for (let i = 0; i < activityBranchNodes.length; i++) {
			let branchNode = activityBranchNodes[ i ];

			if( branchNode.data.active ){
				let functionName = branchNode.data.condition.function;
				let functionParameters = branchNode.data.condition.params;
				if( !(functionName in ActivityDataBranch._functions) ) {
					console.error( `[${this.constructor.name}]`, "BranchNodeCondition of node", branchNode, `contains unknown function name named "${functionName}" with parameters`, functionParameters );
					continue;
				}
				let result = branchNode.data.check( localEnvVars );
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

	/**
	 * Init Player returning the promise of asset download
	 * @param storyName
	 * @param team
	 * @return {Promise<[]>}
	 */
	init( storyName, team ) {
		console.log(`[${this.constructor.name}]`, "Init");

		if( !storyName ){
			return Promise.reject( new Error( "NO_STORY" ) );
		}

		this.storyName = storyName;
		this.team = team;
		this.storyURL = `/stories/${this.storyName}`;
		this.logger = new ActivityLogger(`./log?story=${this.storyName}`);

		return Promise.resolve();
	}

	/**
	 *
	 * @return {Promise<Response>}
	 */
	fetchStory() {
		return fetch( `${this.storyURL}?source=player` )
			.then( (response) => {
				if( response && response.ok ) {
					return response.json();
				}
				else {
					switch( response.status ) {
						case 403:
							return Promise.reject( new Error("FORBIDDEN_STORY") );
							break;
						case 404:
							return Promise.reject( new Error("INVALID_STORY") );
							break;
						default:
							return Promise.reject( response );
					}
				}
			})
			.then( (json) => {
				this.story = new Story( json );
			});
	}

	/**
	 *
	 * @return {Promise<Response>[]}
	 */
	fetchAssets() {
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
	}

	/**
	 * Setup player to run the story, like fill the missionsPool based on gamemode, team, etc ...
	 * @param story {Story}
	 */
	initStory( story ) {
		console.log(`[${this.constructor.name}]`, "Init Story", story );

		if( !story ) throw new Error("NO_STORY");

		switch( story.gamemode ) {
			// Competitions mode
			case "2":
				if( this.team && (this.team in story.groups) ) {
					let missionsData = story.groups[this.team];
					this.missionsPool = story.missions.filter((mission) => missionsData.some(missionData => missionData.id === mission.id));
				}
				else if (!this.team) {
					throw new Error("NO_TEAM");
				}
				else {
					throw new Error("INVALID_TEAM");
				}
				break;
			// Single player mode
			case "1":
			case "0":
			default:
				this.missionsPool = story.missions;
				break;
		}
	}

	main() {
		this.startStory();
	}

	/**
	 *
	 * @param inputMap {Map<string, string | Array>}
	 * @return {null|boolean}
	 */
	handleActivityBehavior( inputMap ) {
		let shouldChoseNextActivity = true;
		let playerInput = null;
		let valueToEvaluate = null;
		let rewardPoints = 0;
		if( this.current.activity ) {
			console.log(`[${this.constructor.name}]`, "Processing User activity behavior of activity", this.current.activity );
			if (this.current.activity instanceof ActivityNodeTell) {
				// nothing special
			}
			else if (this.current.activity instanceof ActivityNodeQuest) {

				// collects values in widgets
				let components = this.current.activity.data.scene.body
					.filter( (component) => !!component.props.name );
				playerInput = {};
				// add input name and value pair to local Env Vars
				for ( const component of components ) {
					let variableName = component.props.name;
					let variableValue = component.value;

					variableValue = this.guessAndParseToTypedValue( variableValue );

					if( variableName in playerInput && playerInput[ variableName ] ) {
						if( !(playerInput[ variableName ].isType( Array.name ) ) ) {
							let oldValue = playerInput[ variableName ];
							playerInput[ variableName ] = new TypedValue({
								type: Array.name,
								value: [ oldValue ]
							});
						}

						if( variableValue ) {
							if (variableValue.isType(Array.name)) {
								playerInput[variableName].value = playerInput[variableName].value.concat(variableValue.value);
							}
							else {
								playerInput[variableName].value.push(variableValue);
							}
						}
					}
					else {
						playerInput[ variableName ] = variableValue;
					}
				}
				console.log( `[${this.constructor.name}]`, "Got player input", playerInput );
				
				let localEnvVars = Object.assign( {}, playerInput, this.envVars );
				let indexBranch = this.checkConditions(this.current.activity.children, localEnvVars );

				console.log( `[${this.constructor.name}]`, "chose index branch", indexBranch );
				// select branchNode as parent Node
				if (indexBranch >= 0) {
					let branchNode = this.current.activity.children[indexBranch];

					if ( branchNode.data.condition.rewardPoints ) {
						rewardPoints = branchNode.data.condition.rewardPoints;
						this.envVars.score.value += rewardPoints;
					}

					if ( branchNode.data.condition.requireHumanEvaluation ) {
						valueToEvaluate =  branchNode.data.condition.params[0];
					}

					this.current.parentNodes.push(branchNode);
					this.current.activityIndex = -1;
				}
				else {
					let behaviorType = this.current.activity.data.noBranchBehavior;
					switch ( behaviorType ) {
						case "continue":
							// continue on following sibling activities as "else" branch
							shouldChoseNextActivity = true;
							break;
						case "message":
							shouldChoseNextActivity = false;
							break;
						case "nothing":
						default:
							shouldChoseNextActivity = false;
							break;
					}
				}
			}

			// log end activity
			this.logger.log(
				this.current.mission.id,
				this.current.activity.id,
				{
					input: playerInput,
					score: rewardPoints,
					end: shouldChoseNextActivity,
					valueToEvaluate: valueToEvaluate
				}
			);
		}

		if( !shouldChoseNextActivity ) return true;

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
					{
						start: true
					}
			);
		}
		return null;
	}

	/**
	 *
	 * @param value
	 * @return TypedValue
	 */
	guessAndParseToTypedValue( value ) {
		console.log( "check", value );

		if( value && !( value instanceof TypedValue) ) {
			console.log( "is Not instance", value );
			if (typeof value === "string") {
				let number = Number.parseInt(value);
				if (!isNaN(number))
					return new TypedValue({ type:Number.name, value:number } );

				let date = new Date(value).getTime();
				if (!isNaN(date))
					return new TypedValue({ type: Date.name, value: value });

				let dateTime = new Date(`1970-01-02T${value}`).getTime();
				if (!isNaN(dateTime))
					return new TypedValue({ type: Time.name, value:value} );

				return new TypedValue( { type: String.name, value: value } );
			}
			else if( typeof value === "number") {
				return new TypedValue({ type: Number.name, value: value } );
			}
			else if ( value instanceof Array ) {
				return new TypedValue({
					type: Array.name,
					value: value.map( (item) => item ? this.guessAndParseToTypedValue( item ) : undefined )
				});
			}
			else if( value instanceof Object ) {
				if( value.type ) {
					let newValue = this.guessAndParseToTypedValue( value.value );
					if( newValue ) {
						return new TypedValue({
							type: value.type,
							value: newValue
						});
					}
					else {
						return null;
					}
				}
			}

			console.log( `${this.constructor.name}`, "unable to parse value", value);
			return new TypedValue( { type: value.constructor ? value.constructor.name : Object.name, value: value } );
		}
		else {
			console.log( "is instance", value );
			return value;
		}
	}

	nextActivity() {
		/**
		 * @type {ActivityNode}
		 */
		let parentNode = this.current.parentNodes.length ? this.current.parentNodes[ this.current.parentNodes.length-1 ] : null;

		if( parentNode ) {
			let activities = parentNode.children;
			let chosenActivity;

			while( !chosenActivity && activities.length > 0 && this.current.activityIndex < activities.length ) {

				if (this.current.activityIndex < 0) {
					if (activities.length > 0) {
						this.current.activityIndex = 0;
					}
				}
				else {
					this.current.activityIndex++;
				}

				if (0 <= this.current.activityIndex && this.current.activityIndex < activities.length) {
					chosenActivity = activities[this.current.activityIndex];
					if( chosenActivity && chosenActivity.data.active ){
						this.current.activity = chosenActivity;
					}
					else {
						console.log( `[${this.constructor.name}]`, "Skipping disabled activity", chosenActivity );
						chosenActivity = null;
					}
				}
				else {
					chosenActivity = null;
				}
			}

			if (this.current.activityIndex >= activities.length) {
				this.current.activityIndex = -1;
				this.current.activity = null;
			}
			return chosenActivity;
		}

		return null;
	}

	nextMission() {
		let missions = this.missionsPool;
		let chosenMission;

		while( !chosenMission && missions.length > 0 && this.current.missionIndex < missions.length ) {

			if (this.current.missionIndex < 0) {
				if (missions.length > 0) {
					this.current.missionIndex = 0;
				}
			}
			else {
				this.current.missionIndex++;
			}

			if (0 <= this.current.missionIndex && this.current.missionIndex < missions.length) {
				chosenMission = missions[this.current.missionIndex];
				if( chosenMission && chosenMission.active ) {
					this.current.mission = chosenMission;
				}
				else {
					console.log( `[${this.constructor.name}]`, "Skipping disabled mission", chosenMission );
					chosenMission = null;
				}
			}
			else {
				chosenMission = null;
			}
		}

		if (this.current.missionIndex >= missions.length || !chosenMission ) {
			this.current.missionIndex = -1;
			this.current.mission = null;
		}
		return chosenMission;
	}

	startStory() {
		console.log( `[${this.constructor.name}]`,"start Story Life cycle");
		this.handleActivityBehavior();
	}

	endStory() {

	}
}