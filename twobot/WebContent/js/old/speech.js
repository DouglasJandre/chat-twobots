/*global webkitSpeechRecognition */

(function() {
	'use strict';

	// check for support (webkit only)
	if (! ('webkitSpeechRecognition' in window) ){ 
        console.log('Não é um browser compatível');
        return;
    }

	var talkMsg = 'start talking';

	// seconds to wait for more input after last
	var patience = 6;

	function capitalize(str) {
		return str.length ? str[0].toUpperCase() + str.slice(1) : str;
	}

	var inputEls = document.getElementsByClassName('speech-input');

	[].forEach.call(inputEls, function(inputEl) {
		
		// setup recognition
		var finalTranscript = '';
		var recognizing = false;
		var timeout;
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;

		function restartTimer() {
			timeout = setTimeout(function() {
				recognition.stop();
			}, patience * 1000);
		}

		recognition.onstart = function() {
	        recognizing = true;
			restartTimer();
		};

		recognition.onend = function() {
			recognizing = false;
			clearTimeout(timeout);
		};

		recognition.onresult = function(event) {
			clearTimeout(timeout);
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					finalTranscript += event.results[i][0].transcript;
				}
			}
			finalTranscript = capitalize(finalTranscript);
			console.log(finalTranscript);
			restartTimer();
		};
        

		micBtn.addEventListener('click', function(event) {
			event.preventDefault();
			if (recognizing) {
				recognition.stop();
				return;
			}
			inputEl.value = finalTranscript = '';
			recognition.start();
		}, false);
	});
})();
