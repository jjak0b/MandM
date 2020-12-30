export default class PlayerSessionUtility {
	constructor( sessionStore ) {
		/**
		 * @type Store.load
		 */
		this.sessionStore = sessionStore;
	}

	/**
	 *
	 * @param storyName
	 * @return {Promise<Object>}
	 */
	async getPlayers( storyName ) {
		return new Promise( (resolve, reject) => {
			this.sessionStore.all( (err, sessions) => {
				if( err ) {
					reject( err )
				}
				else {
					let playersSessions = [];
					for (const sessionID in sessions) {
						let session = sessions[ sessionID ];
						if( session.storyName === storyName ) {
							playersSessions.push( session );
						}
					}
					resolve( playersSessions );
				}
			});
		});
	}
}

module.exports = PlayerSessionUtility;