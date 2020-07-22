Vue.component('objective-item', {
	props : [
		"quest_name",
		"objective_name",
		"objective_progress_perc",
		"objective_message_redeem_reward",
		"objective_description",
		"objective_hint",
		"objective_hint_label"
	],
	template:
		`<details class="container">
			<summary>
				<div class="objective-header row">
					<div class="col"><label>{{quest_name}}</label></div>
					<div class="col"><label>{{objective_name}}</label></div>
					<div class="col row">
						<div class="col"><label>Completamento: {{objective_progress_perc}}&nbsp;%</label></div>
						<div class="col"><meter v-bind:value="objective_progress_perc/100.0">{{ objective_progress_perc }} %</meter></div>
					</div>
				</div>
				<div class="objective-main row justify-content-start">
					<button class="objective-reward btn btn-lg" disabled="disabled" >{{ objective_message_redeem_reward }}</button>
				</div>
			</summary>
			<div class="objective-description row justify-content-center">
				<p class="text-justify" v-html="objective_description"></p>
			</div>
			<div class="objective-description-footer row justify-content-start">
				<button type="button" role="button" class="objective-help-btn btn btn-lg btn-danger" data-toggle="popover" data-placement="right" data-html="true" v-bind:data-content="objective_hint">{{ objective_hint_label }}</a>
			</div>
		</details>`
});
var objective_default_data1 = {
	quest_name:					 	"Nome quest 1",
	objective_name:				 	"Nome obiettivo",
	objective_progress_perc:		50,
	objective_message_redeem_reward:"Ottieni la ricompensa",
	objective_description:		  	"Breve descrizione dell'obiettivo, <br>che sicuramente sarà molto importante per capire cosa deve fare il giocatore",
	objective_hint:				 	"Questo &eacute; un possibile consiglio fornito dall'autore della storia, che pu&oacute; fornire un aiuto al giocatore se ha difficolt&aacute;",
	objective_hint_label:		   	"Mi serve aiuto"
};

var objective_default_data2 = {
	quest_name:						"Nome quest 2",
	objective_name:					"Nome obiettivo",
	objective_progress_perc:		20,
	objective_message_redeem_reward:"Ottieni la ricompensa",
	objective_description:			"Breve descrizione dell'obiettivo, <br>che sicuramente sarà molto importante per capire cosa deve fare il giocatore",
	objective_hint:					"Questo &eacute; un possibile consiglio fornito dall'autore della storia, che pu&oacute; fornire un aiuto al giocatore se ha difficolt&aacute;",
	objective_hint_label:			"Mi serve aiuto"
};
var missionsList = [ objective_default_data1, objective_default_data2 ];
var comp_obj_item = new Vue({ el: '.quest_objective', data: objective_default_data1 } );
var comp_obj_list = new Vue({
	el: '.quest_list',
	data: {
		missionsList: missionsList
	}
});

var questApp = new Vue({
	el: '#questApp'
});
QrScanner.WORKER_PATH = '/qr-scanner/qr-scanner-worker.min.js';


var cameraApp = new Vue({
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
								(result) =>{
									$("#qr-scanned").append( `<li><code>${result}</code></li>`);
									console.log("On scan decode:", result);
								},
								(error) => {
									if( !(error instanceof DOMException) ) // se aperto con protocollo file, gli errori sono spammati
										console.error( "On scan error: ", error );
								},
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