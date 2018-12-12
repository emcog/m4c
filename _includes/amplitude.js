	Amplitude.init({
		"songs": [
			{
				"name": "Three minute reset",
				"album": "M4C Make a change course",
				"url": "/assets/audio/Three-step-reset.mp3"
			}
		]
	});

	document.getElementById('song-played-progress').addEventListener('click', function(e){
	    var offset = this.getBoundingClientRect();
	    var x = e.pageX - offset.left;
	
	    Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
	});