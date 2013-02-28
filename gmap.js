		
	
	//declare variables needed for this page
	var gMap;
	var gGeoCoder = new google.maps.Geocoder();
	var gMarkersArray = [];
	var gInfoWindowsArray = [];
	function initialize() {
		//set default
		var gMapOptions = {
			zoom: 6,
			center: new google.maps.LatLng(42.7, -76),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		gMap = new google.maps.Map(document.getElementById('map_canvas'),
			gMapOptions);
	}

	//google.maps.event.addDomListener(window, 'load', initialize);
	
	
	function processAddress( address, map ) {
		//marker
		var marker = new google.maps.Marker({//create
			map: map,
			position: new google.maps.LatLng ( address.lat, address.lng )
		});
		gMarkersArray.push(marker);//store
		//window
		var infoWindow = new google.maps.InfoWindow({//create
            content: constructInfoContent( address )
        });
		gInfoWindowsArray.push(infoWindow);//store
		// bind marker click event
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.open(map,marker);
		});
	}
	
	function constructInfoContent( address ) {
		//construct content to be put into the tooltip
		var contentString = '';
		contentString += '<div class="gMap-tooltip">' + 
			'<h4>'+address.name+'</h4>' +
			'<div>'+address.street1+'</div>' ;
		if ( address.street2 ) {
			contentString += '<div>'+address.street2+'</div>';
		}
		contentString += '<div>'+address.city+', ' + address.state + ' ' + address.zip +
		'</div>';
		return contentString;
	}
	
	function processAddressList( array ) {
		for ( i=0;i<array.length;i++ ) {
			processAddress( array[i], gMap);
			$('#screenlist').append( "<li><a href='#' class='gmapAddress' data-index='"+i+"'>"+array[i].name+"</a></li>" )
		}
	}
		
	//geocode function
	/*
	function googleGeoCodeAddress( inputAddress ) {
		if (gMap == null) {
			initialize();
		}
		gGeoCoder.geocode( { 'address': inputAddress}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				gMap.setCenter(results[0].geometry.location);
				gMap.setZoom(12);
				gMapMarker = new google.maps.Marker({
					map: gMap,
					position: results[0].geometry.location
					});
				console.log(results[0].geometry.location);
				gMarkersArray.push(gMapMarker);
				
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
      }
	*/
	
	// extend clear functions
	google.maps.Map.prototype.clearMarkerOverlays = function() {
		if (gMarkersArray) {
		for (var i = 0; i < gMarkersArray.length; i++ ) {
			gMarkersArray[i].setMap(null);
			}
		}
	};
	google.maps.Map.prototype.clearWindowOverlays = function() {
		if (gInfoWindowsArray) {
		for (var i = 0; i < gMarkersArray.length; i++ ) {
			gInfoWindowsArray[i].setMap(null);
			}
		}
	};
	function infoWindowHook( obj ) {
		var index = obj.attr("data-index");
		var marker = gMarkersArray[index];
		var infoWindow = gInfoWindowsArray[index];
		gMap.clearWindowOverlays();
		gMap.setCenter( marker.getPosition() );
		gMap.setZoom(12);
		infoWindow.open(gMap, marker )
	}
	
