!(function startExpressService (root) {
	'use strict'

	if (!root.navigator) {
		console.error('Missing navigator')
		return
	}

	if (!root.navigator.serviceWorker) {
		console.error('Sorry, not ServiceWorker feature, maybe enable it?')
		console.error('http://jakearchibald.com/2014/using-serviceworker-today/')
		return
	}

	function getCurrentScriptFolder () {
		var scriptEls = document.getElementsByTagName('script')
		var thisScriptEl = scriptEls[scriptEls.length - 1]
		var scriptPath = thisScriptEl.src
		return scriptPath.substr(0, scriptPath.lastIndexOf('/') + 1)
	}

	var serviceScriptUrl = getCurrentScriptFolder() + 'express-service.js'
	var scope = './'

	/**
	 *
	 * @param registration {ServiceWorkerRegistration}
	 */
	function registeredWorker (registration) {
		console.log('express-service registered...')
		const sw = registration.installing || registration.waiting || registration.active;
		if (sw) {
			sw.addEventListener('statechange', function(e) {
				if( e.target.state === "activated" ) {
					// let the Express take over, even the index page
					setTimeout(  () => window.location.reload(), 2000 );
				}
			})
		}
	}

	function onError (err) {
		if (err.message.indexOf('missing active') !== -1) {
			// the service worker is installed
			window.location.reload()
		} else {
			console.error('express service worker error', err)
		}
	}

	root.navigator.serviceWorker.register(serviceScriptUrl, { scope: scope })
		.then(registeredWorker)
		.catch(onError)
}(window));