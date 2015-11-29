var app = angular.module("sos", [/* 'ngMaterial' */]);

////////////      REQUEST CONTROLLER     ////////////////////
app.controller('RequestsController', ['$http', '$scope', function($http, $scope){

	var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

	var controller = this;

	var position = {
		coords: {
			latitude: 0,
			longitude: 0
		}
	};

	// GETS LOCATION
	function getLocation() {
		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
		} else {
				console.log("Geolocation is not supported by this browser.");
		}
	}
	function showPosition(position) {
		console.log("Latitude: " + position.coords.latitude +
		" Longitude: " + position.coords.longitude);
	}

	//GETS ALL REQUESTS
	this.getRequests = function () {
		$http.get('/requests.json').success(function(data) {
			console.log(data);
			controller.requests = data;
		}).error(function(err) {
			console.log(err);
		});
	};

	this.getRequests();

	//CREATES A NEW SOS REQUEST
	this.createRequest = function () {
		navigator.geolocation.getCurrentPosition(proceed);
		function proceed(position) {
			$http.post('/requests.json', {
				authenticity_token: authenticity_token,
				request: {
					name: controller.newRequestName,
					description: controller.newRequestDescription,
					skill_list: controller.newRequestSkillList,
					image: controller.image,
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
			}).success(function (data) {
				console.log(data);
				controller.getRequests();
				// switching to "my requests" tab isn't working
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

/////////////    LOCATION CONTROLLER - DOES NOT WORK ON HEROKU   ////////////////
app.controller('LocationController', ['$http', '$timeout',
function ($http, $timeout) {
	var controller = this;

	$.getJSON('http://www.telize.com/geoip?callback=?', function(json) {

		latitude = json.latitude;
		longitude = json.longitude;
	}).success(function () {
		console.log(latitude, longitude);
	});
}]);

/////////////    UI JS   ////////////////

//

// /////////// GREET CONTROLLER /////////////
// app.controller('GreetingController', ['$scope', '$http', function($scope, $http) {
// 	$http.get('/session.json').success(function(data, status, headers, config) {
// 			$scope.greeting = data;
// 	}).error(function(data, status, headers, config) {
// 			// log error
// 			console.log("ERRRROOOO");
// 	});
// 	$http.get('/todos.json').success(function(data, status, headers, config) {
// 			$scope.todos = data;
// 	}).error(function(data, status, headers, config) {
// 			// log error
// 			console.log("ERRRROOOO");
// 	});
// }]);
