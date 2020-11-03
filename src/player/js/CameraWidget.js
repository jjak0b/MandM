import QrScanner from '/qr-scanner/qr-scanner.min.js';
QrScanner.WORKER_PATH = '/qr-scanner/qr-scanner-worker.min.js';

const i18n = new VueI18n({
	locale: navigator.language,
	fallbackLocale: 'en',
	messages: null
});
$.get( "locales/"+navigator.language )
.then( (data) => {
	console.log( "locales response ", data );
	if( data ) Object.keys( data ).forEach( locale => i18n.mergeLocaleMessage(locale, data[ locale ] ) );
});

/* DOM Widget which handle camera, scanner functionalities */
export var CameraWidget = new Vue({
	i18n,
	el: '#app-camera',
	data: {
		hasCamera: null,
		hasFlash: false,
		isScanning: false,
		camera_type: "environment",
		camera_switch_timer: 350,
		scanner: null,
	},
	methods: {
		startScan: function(){
			console.log("starting scanning");
			return this.scanner.start();
		},
		stopScan: function() {
			var self = this;
			console.log("stopping scanning");
			// implementation of qr-scanner doesn't return a promise so based on QrScanner.stop() we would wait a timeout of 300 ms nad after that video.srcObject is deallocated
			return new Promise( function( resolve, reject ){
				self.isScanning = true;
				self.scanner.stop();
				setTimeout( () => {self.isScanning = false; resolve()}, self.camera_switch_timer );
			});
		},
		toggleFlash: function() {
			return this.scanner.toggleFlash();
		},
		isFlashOn: function () {
			return this.scanner.isFlashOn();
		},
		onScanDecode: function ( result ) {
			$("#qr-scanned").append( `<li><code>${result}</code></li>`);
			console.log("On scan decode:", result);
		},
		onScanError: function (error) {
			if( !(error instanceof DOMException) ) // se aperto con protocollo file, gli errori sono spammati
				console.error( "On scan error: ", error );
		},
		updateCamera: function () {
			var self = this;
			return new Promise( function( resolve, reject) {
				QrScanner.hasCamera()
					.then(hasCamera => {
						self.hasCamera = hasCamera;
						if( self.scanner ) {
							self.hasFlash = false;
							console.log("previous Scan detected: stopping it ...");
							if( self.isFlashOn() ) {
								self.toggleFlash();
								console.log("flash active detected: turned off");
							}
							self.stopScan().then( ()=>{
								console.log("stopped");
								resolve();
							});
						}
						else{
							resolve();
						}
					});
				})
				.then( ()=> {
					if( self.hasCamera ) {
						console.log("camera detected");
						// poichè v-if=hasCamera deve aggiornarsi e renderizzare, aspetto il tick succesivo così sarà disponibile nel DOM
						self.$nextTick( function() {
							let video_element;
							video_element = document.getElementById('camera-preview');
							console.log("test:", video_element);
							console.log(`creating scanner for ${self.camera_type}`);
							if( !self.scanner ){
								self.scanner = new QrScanner(
									video_element,
									self.onScanDecode,
									self.onScanError,
									400,
									self.camera_type
								);
							}
							else {
								self.scanner._preferredFacingMode =self.camera_type;
							}
							self.startScan()
								.then( () => {
									console.log("Scan really started");
									self.isScanning = true;
									self.scanner.hasFlash().then(hasFlash => self.hasFlash = hasFlash);
								})
								.catch( (err) => { console.error( err ) } );
						});
					}
					else {
						console.error("No camera detected")
					}
				});
		}
	},
	mounted: function () {
		var self = this;
		$('#collapse-camera').on('show.bs.collapse', function () {
			if( !self.hasCamera )
				self.updateCamera();
			else {
				self.startScan();
			}

		});
		$('#collapse-camera').on('hide.bs.collapse', function () {
			if( self.hasCamera )
				self.stopScan();
		});
	}
});