GEOLOCALISATON_UNSUPPORTED = 1
GEOLOCALISATON_FAILURE = 2

function getAdresse(idTab, successFindingAdresseCallback, errorFindingAdresseCallback){
	
	var options = {
		center: new google.maps.LatLng(41.850033, -87.6500523),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: true,
        panControlOptions: {
             position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
             style: google.maps.ZoomControlStyle.LARGE,
             position: google.maps.ControlPosition.TOP_left
        }
	};

	var map = new google.maps.Map(document.getElementById(idTab[0]), options);

	var marker = new google.maps.Marker({
    	map: map,
    	anchorPoint: new google.maps.Point(0, -29)
  	});
  	marker.setVisible(false);

	var input = document.getElementById(idTab[1]);
	var types = document.getElementById(idTab[2]);
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);


    geolocateMe(map)

	google.maps.event.addListener(map, 'click', function(event) {
		showMarker(event.latLng)

		var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
             "latLng": event.latLng
         }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                 /*var lat = results[0].geometry.location.lat(),
                     lng = results[0].geometry.location.lng(),*/

                input.value = results[0].formatted_address
				successFindingAdresseCallback(event.latLng, results[0].formatted_address)
            }
        });
	});

    google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
    	var place = autocomplete.getPlace();
    	//if (!place.geometry) {
      	//	return;
    	//}

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
         } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
         }

         showMarker(place.geometry.location);
         successFindingAdresseCallback(place.geometry.location, place.name)
     });

    setupClickListener('changetype-all', []);
  	setupClickListener('changetype-address', ['address']);
  	setupClickListener('changetype-establishment', ['establishment']);
  	setupClickListener('changetype-geocode', ['geocode']);

  	var centerControlDiv = document.createElement('div');
  	localisationControl(centerControlDiv, map);

  	centerControlDiv.index = 1;
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

	function onPositionError(msg){
		errorFindingAdresseCallback(msg)
		map.setZoom(10);
	}

	function setupClickListener(id, types) {
	    var radioButton = document.getElementById(id);
	    google.maps.event.addDomListener(radioButton, 'click', function() {
	      autocomplete.setTypes(types);
	    });
	  }

	function showMarker(position){
		marker.setVisible(true);
        marker.setPosition(position);
	}

	function geolocateMe(map){
		if (navigator.geolocation) {
        var options={enableHighAccuracy: true, maximumAge: 15000, timeout: 10000};
        
        navigator.geolocation.getCurrentPosition(function(position){
	        	console.log("[Success geolocating]")

	        	map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
	        },function(error) {
	        	console.warn("[Error geolocating]")
				onPositionError(GEOLOCALISATON_FAILURE)
        	},options);
	    }
	    else
	    	onPositionError(GEOLOCALISATON_UNSUPPORTED)
	}

	function localisationControl(controlDiv, map) {

		  // Set CSS for the control border
		  var controlUI = document.createElement('div');
		  controlUI.style.backgroundColor = '#fff';
		  controlUI.style.border = '2px solid #fff';
		  controlUI.style.borderRadius = '3px';
		  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
		  controlUI.style.cursor = 'pointer';
		  controlUI.style.marginBottom = '22px';
		  controlUI.style.textAlign = 'center';
		  controlUI.title = 'Click to center the map on my position';
		  controlDiv.appendChild(controlUI);

		  // Set CSS for the control interior
		  var controlText = document.createElement('div');
		  controlText.style.color = 'rgb(25,25,25)';
		  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
		  controlText.style.fontSize = '16px';
		  controlText.style.lineHeight = '38px';
		  controlText.style.paddingLeft = '5px';
		  controlText.style.paddingRight = '5px';
		  controlText.innerHTML = 'Ma position';
		  controlUI.appendChild(controlText);

	  	google.maps.event.addDomListener(controlUI, 'click', function() {
	    	geolocateMe(map)
	  	});

	}
}

//google.maps.event.addDomListener(window, 'load', _initialize);

function _initialize() {

	getAdresse(["map-canvas", "input-address", "type-selector"], function(position, address){
		console.log(position)
		console.log(address)

	}, function(msg){
		console.log(msg);
	})
}