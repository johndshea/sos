var app = angular.module("sos", []);

////////////      REQUEST CONTROLLER     ////////////////////
app.controller('RequestsController', ['$http', '$scope', function($http, $scope){
	var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	var controller = this;

	// Placeholder position object created when app launches
	var globalPosition = {
		latitude: 0,
		longitude: 0
	};

	// On initial page load, loads Google Maps, then loads all SOS requests
	navigator.geolocation.getCurrentPosition(initialize);
	function initialize(position) {
		var mapProp = {
	    center:new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
	    zoom:15,
			scrollwheel: false,
	  };
	  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
			globalPosition.latitude = position.coords.latitude;
			globalPosition.longitude = position.coords.longitude;

		globalPosition.map = map;

		var mainMarker = new google.maps.Marker({
    	position: {lat: position.coords.latitude, lng: position.coords.longitude},
    	map: map,
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    	title: 'You'
  	});

		$http.get('/requests.json').success(function(data) {
			data.forEach(function(request, i, array){
				request.lat = parseFloat(request.lat);
				request.lng = parseFloat(request.lng);

				var contentString = '<div id="content">'+
	      '<div id="siteNotice">'+'</div>'+
	    	'<h5 id="firstHeading" class="firstHeading">' + request.name + '</h5>'+
	      '<div id="bodyContent">'+
	      	'<p>' + request.description + '</p>'+
	      	'<p><a href="#' + request.id + '">Help me</a></p>'+
	      '</div>'+
	      '</div>';

				var infowindow = new google.maps.InfoWindow({
    			content: contentString
  			});

				var marker = new google.maps.Marker({
    			position: {lat: request.lat, lng: request.lng},
    			map: map,
    			title: 'request.name'
  			});

				marker.addListener('click', function() {
    			infowindow.open(map, marker);
  			});

			});

			controller.requests = data;

		}).error(function(err) {
			console.log(err);
		});
	}

	this.createComment = function(request_id, current_user_id, current_user_email) {
		console.log(request_id, current_user_id, current_user_email, controller.newCommentBody);
		$http.post('/requests/'+ request_id +'/comments.json', {
			authenticity_token: authenticity_token,
			comment: {
				body: controller.newCommentBody,
				request_id: request_id,
				user_id: current_user_id,
				user_email: current_user_email
			}
		}).success(function (data) {
			console.log(data);
			controller.newCommentBody = '';
			controller.getRequests();
		});
	};

	//GETS ALL REQUESTS - THIS IS CALLED AS-NEEDED RATHER THAN ON LOAD
	this.getRequests = function () {
		$http.get('/requests.json').success(function(data) {
			data.forEach(function(request, i, array){
				request.lat = parseFloat(request.lat);
				request.lng = parseFloat(request.lng);

				var marker = new google.maps.Marker({
    			position: {lat: -25.363, lng: 131.044},
    			map: globalPosition.map,
    			title: 'title'
  			});

			});

			controller.requests = data;
		}).error(function(err) {
			console.log(err);
		});
	};

	//CREATES A NEW SOS REQUEST
	this.createRequest = function () {
		// redoes the location call, just in case
		navigator.geolocation.getCurrentPosition(proceed);
		function proceed(position) {
			$http.post('/requests.json', {
				authenticity_token: authenticity_token,
				request: {
					name: controller.newRequestName,
					description: controller.newRequestDescription,
					skill_list: controller.newRequestSkillList,
					image: controller.image,
					lat: position.coords.latitude || globalPosition.latitude,
					lng: position.coords.longitude || globalPosition.longitude
				}
			}).success(function (data) {
				console.log(data);
				controller.getRequests();

				$('ul.tabs').tabs('select_tab', 'mine');
				$("#create_name").val('');
				$("#create_desc").val('');
			});
		}
	};

	// EDIT SOS REQUEST
	this.editRequest = function (request) {
		$http.patch('/requests/' + request.id, {
				authenticity_token: authenticity_token,
				request: {
					name: request.name,
					description: request.description,
					skill_list: request.skill_list
				}
			}).success(function (data) {
				controller.getRequests();
			});
		};

	// DELETE SOS REQUEST
	this.deleteRequest = function (request) {
		$http.delete('/requests/' + request.id + '.json', {
			authenticity_token: authenticity_token
		}).success(function (data) {
			controller.getRequests();
		}).error(function(err) {
			console.log(err);
		});
	};

}]);

/////////////    UI JS   ////////////////
var flash = document.querySelector('.flash');
if(flash.innerHTML){Materialize.toast(flash, 3000);}

$(document).ready(function(){
	$(".button-collapse").sideNav();
});
