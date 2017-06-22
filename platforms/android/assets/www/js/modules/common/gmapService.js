

//Service containing all operations related to google map operations
angular.module('CommonApp').service('gmapService', function($http, $rootScope) {
 
		//Load Google API for google map
	this.getGMapLocation = function(mapPlaceholder, searchPlaceholder) {

			
		 	var myLatLng = {lat: 12.9716, lng: 77.5946};
		    var map = new google.maps.Map(document.getElementById(mapPlaceholder), {
		      center: myLatLng,
		      zoom: 13
		    });

		    var defaultBounds = new google.maps.LatLngBounds(
  				new google.maps.LatLng(12.9716, 77.5946),
  				new google.maps.LatLng(12.9716, 77.5946));

		    var input = document.getElementById(searchPlaceholder);
		    var options = {
  					bounds: defaultBounds,
  					types: ['establishment']
				};
			 map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			var autocomplete = new google.maps.places.Autocomplete(input);
			autocomplete.bindTo('bounds', map);
			autocomplete.setOptions({strictBounds: true})
		
		    var infowindow = new google.maps.InfoWindow();
		    var marker = new google.maps.Marker({
		      position :  myLatLng,
		      map: map,
		      draggable:true,
		      clickable: true,
		      title: 'lat: ' + myLatLng.lat+ '\n' +'lng: '+ myLatLng.lng
		      

		    });
		    marker.addListener('click', function() {
		      infowindow.open(map, marker);
		    });

		    google.maps.event.addListener(marker, 'dragend', function(marker){
		        var latLng = marker.latLng; 
		        currentLatitude = latLng.lat();
		        currentLongitude = latLng.lng();
		   
		       	myLatLng.lat = latLng.lat();
		       	myLatLng.lng = latLng.lng();
		       	$rootScope.$broadcast('fetchLatlng', { data: myLatLng });

		        
		       if( infowindow)
		       {
		       	 infowindow.close();
		       }
		     });

		     autocomplete.addListener('place_changed', function() {
		      infowindow.close();
		      var place = autocomplete.getPlace();
		      if (!place.geometry) {
		        return;
		      }

		      if (place.geometry.viewport) {
		        map.fitBounds(place.geometry.viewport);
		      } else {
		        map.setCenter(place.geometry.location);
		        map.setZoom(17);
		       
		      }
		 
		      	myLatLng.lat = place.geometry.location.lat();
		       	myLatLng.lng =  place.geometry.location.lng();
		      	$rootScope.$broadcast('fetchLatlng', { data: myLatLng });
		      marker.setOptions({
		      		draggable: true,
		      		place: place.place_id,
		      		position: place.geometry.location
		      });

		      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          			place.formatted_address);
      		   infowindow.open(map, marker);
		     
		    });
		   
		    setTimeout(function() { google.maps.event.trigger(map, "resize"); },100);
		    return myLatLng;

	};
 
});
