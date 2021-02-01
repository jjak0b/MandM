class SessionQueues {
	constructor( getSessionIDFunc ) {
		this.sessionQueues = new Map();
		this.getSessionIDFunc = getSessionIDFunc;
	}

	getQueueMiddleWare() {
		return this.queueMiddleware.bind( this );
	}

	queueMiddleware( req, res, next ) {
		let id = this.getSessionIDFunc( req, res );
		if( id ) {
			let queue = this.sessionQueues.get( id );
			if( !queue ) {
				queue = [];
				this.sessionQueues.set( id, queue );
			}
			queue.push( next );
			if( queue.length === 1 ) {
				next();
				this.handleDequeue( id, queue );
			}
		}
		else {
			next();
		}
	}

	handleDequeue(id, queue) {
		if( queue.length > 0 ) {
			// remove last executed
			queue.shift();
		}

		if( queue.length > 0 ) {
			let next = queue[ 0 ];
			next();
			this.handleDequeue(queue);
		}
		else {
			this.sessionQueues.delete( id );
		}
	}
}


module.exports = SessionQueues;

