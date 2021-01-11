/**
 * call
 * @param seconds {number}
 * @param tokCallback {Function} first paramer is count of seconds left
 * @param clockCallback {Function}
 * @return {null|number} The IntervalHandler that can be cleared
 */
export function clock( seconds, tokCallback, clockCallback ) {

	let intervalHandler;

	function onTimerEnd() {
		if( intervalHandler )
			clearInterval( intervalHandler );
		if( clockCallback )
			clockCallback()
	}

	function tok() {
		seconds--;
		if( tokCallback )
			tokCallback( seconds );
		if( seconds <= 0  ) {
			onTimerEnd();
		}
	}

	if( seconds > 0 ) {
		intervalHandler = setInterval( tok, 1000 );
	}
	else {
		onTimerEnd();
		return null;
	}

	return intervalHandler;
}

/**
 * Wait for time and resolve promise
 * @param time
 * @return {Promise<void>}
 */
export function wait( time ) {
	return new Promise( (resolve) => {
		setTimeout( resolve, time );
	})
}

