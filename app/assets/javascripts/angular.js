var app = angular.module("sos", []);

////////////      REQUEST CONTROLLER     ////////////////////
app.controller('RequestsController', ['$http', '$scope', function($http, $scope){
	var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	var controller = this;

	// Position object created when app launches
	var globalPosition = {
		latitude: 0,
		longitude: 0
	};

	// Loads Google Map - NEED TO MAKE THIS MORE USEFUL
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
    	title: 'You'
  	});
	}
	google.maps.event.addDomListener(window, 'load', initialize);

	//GETS ALL REQUESTS
	this.getRequests = function () {
		$http.get('/requests.json').success(function(data) {
			data.forEach(function(request, i, array){
				var uluru = {lat: parseFloat(request.lat), lng: parseFloat(request.lng)};
				console.log(uluru);
				new google.maps.Marker({
		    	position: uluru,
		    	map: globalPosition.map,
		    	title: 'test'
		  	});
			});
			// console.log(data);
			controller.requests = data;
		}).error(function(err) {
			console.log(err);
		});
	};

	this.getRequests();

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

	// Upload Picture on file select or drop
  // this.upload = function (file) {
  //   Upload.upload({
  //     url: 'requests/' + request.id + '.json',
  //     method: 'PUT',
  //     headers: { 'Content-Type': false },
  //     fields: {
  //       'request[name]': request.name,
  //       'request[description]': request.description,
  //       'request[image]': file
  //     },
  //     file: file,
  //     sendFieldsAs: 'json'
  //   }).then(function (resp) {
  //     console.log('Success ' + resp.config.file.name + 'uploaded. Response: ' + resp.data);
  //   }, function (resp) {
  //     console.log('Error status: ' + resp.status);
  //   }, function (evt) {
  //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //     console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
  //   });
  // };

	// EDIT SOS REQUEST
	this.editRequest = function (request) {
		console.log(request);
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
		this.openModal = function(modal) {
			$('#modal1').openModal();
		};
}]);

/////////////    UI JS   ////////////////
