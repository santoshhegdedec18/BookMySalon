

//COntroller containing all operations related to login
angular.module('RegisterApp').controller('registerCtrl', function($scope, $rootScope,$timeout, $location, $mdSidenav, consumeAPIService, gmapService, $mdMedia) {
	
	$scope.initRegisterCtrl = function(){
		//control loading spinner
		$scope.loadingSpinnerInSignUp = false;
		$scope.isBizUserIdExists = false;
		$scope.weekdays = [ {'id': 1, 'name': 'Monday'},{'id':2, 'name': 'Tuesday'}, {'id':3, 'name':'Wednesday'},{'id':4, 'name': 'Thursday'}, {'id':5, 'name':'Friday'},{'id':6, 'name': 'Saturday'},{'id':7, 'name': 'Sunday'}];
		$scope.startTime = {
       		value: new Date(1970, 0, 1, 14, 57, 0)
     	};
     	$scope.weekday = 'Monday';
     	$scope.start_time = new Date(1970, 0, 1, 9, 0, 0);
     	$scope.end_time = new Date(1970, 0, 1, 20, 0, 0);
     	$scope.isHoliday = false;
							     	
     							   

		//Type of bisiness options
		$scope.biz_types = [{
				"name":"Saloon",
				"selected":false
			},
			{
				"name":"Beauty parlour",
				"selected":false
			},
			{
				"name":"Spa",
				"selected":false
			},
			{
				"name":"Yoga",
				"selected":false
			},
			{
				"name":"Gym",
				"selected":false
			},
			{
				"name":"Pets Parlour",
				"selected":false
		}];

			//Type of services options
		$scope.serviceType = [
			{label: 'Women and children', value: 'L'},
			{label: 'Men', value: 'M'},
			{label: 'Unisex (both men and women)', value: 'U'}
		];

			//List of states to display in address and location in signup
	   	$scope.states = [
	   		'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajashthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
	   	];

	   	$scope.offered_services = [{
	   			"name":"Hair cutting",
	   			"id":"1",
				"selected":false
			},
			{
				"name":"Bridal Makeup",
	   			"id":"2",
				"selected":false
			},
			{
				"name":"Manicure",
	   			"id":"3",
				"selected":false
			},
			{
				"name":"Pedicure",
	   			"id":"4",
				"selected":false
			},
			{
				"name":"Waxing",
	   			"id":"5",
				"selected":false
			},
			{
				"name":"Eyebrows",
	   			"id":"6",
				"selected":false
			},
			{
	   			"name":"Hair colouring",
	   			"id":"7",
				"selected":false
		}];

	   	$scope.signup = {
		   "bizName": "",
		   "userName": "",
		   "password": "",
		   "confirmPassword":"",
		   "phone": "",
		   "email":"",
		   "lat": 0,
		   "lng": 0,
		   "primary_image_url":"",
		   "logo_url": "",
		   "biz_type":[],
		   "address1":"",
		   "address2":"",
		   "city":"",
		   "state":"Karnataka",
		   "pin":"",	
		   "locality":"",
		   "contact_person_fname":"",
		   "contact_person_lname":"",
		   "service_type":'U',
		   "offered_services":[],
		   "pictures_gallery_urls" : [],
		   "active": true,
		   "approved": false,
		   "joined_on": "",
		   "approved_on": "",
		   "left_on": "",
		   "business_hours": []
		 };
		 
	};
	$scope.setHoliday = function(holiday){
		
		$scope.isHoliday = holiday;
		
	};
	var workHoursCollection = [];
	
	$scope.addWorkHours = function(){
	if($scope.weekday && $scope.start_time && $scope.end_time)
	{
		var newItem = {'weekday': $scope.weekday, 'start_time': $scope.start_time, 'end_time': $scope.end_time,'is_holiday': $scope.isHoliday };		
		
		//var removedItemIndex = '';
		angular.forEach($scope.signup.business_hours, function(item, index){
			if($scope.weekday == item.weekday)
			{
				$scope.signup.business_hours.splice(index, 1);
				//removedItemIndex = value;
			}
		});
		$scope.signup.business_hours.push(newItem)
		// if(removedItemIndex)
		// {
		// 	$scope.signup.business_hours.splice(removedItemIndex, 1,newItem);	
		// }
		// else
		// {
		// 	$scope.signup.business_hours.push(newItem)
		// }
	}
	else
	{
		alert('please select all the field values before adding!');
	}
		 
	};

	$scope.initRegisterCtrl();
	$scope.$on('fetchLatlngToRoot', function (event, args) {
		$scope.signup.lat = args.data.lat;
    	$scope.signup.lng =  args.data.lng;
 	});	
	
	$scope.$on("spinnerInSignUp", function(e, data) {
		$scope.loadingAdditionalPage = data;
	});

	$scope.$on("updatePrimaryImageModel", function(e, res) {
		$scope.signup.primary_image_url = res.data.files[0];
		$scope.signup.pictures_gallery_urls.push(res.data.files[0]);
		//console.log($scope.signup.primary_image_url);
	});

	$scope.$on("updateLogoImageModel", function(e, res) {
		$scope.signup.logo_url = res.data.files[0];
		//console.log($scope.signup.primary_image_url);
	});

   	$scope.changeOnBizType = function(bizType) {
		if(bizType.selected) {
			$scope.signup.biz_type.push(bizType);
		} 
		else
		{
			$scope.signup.biz_type.pop(bizType);
		}
	};

	$scope.changeOnOfferServices = function(offerObj) {
		if(offerObj.selected) {
			$scope.signup.offered_services.push(offerObj);
		}
		else
		{
			$scope.signup.offered_services.pop(offerObj);
		}
	};

	$scope.validateBizUserId = function(name) {
		consumeAPIService.httpRequestWithPromise(Constants.URLS.getBusinessByUserNane.replace('{username}',name), Constants.Global.METHOD.GET, null,Constants.Global.DefaultHTTPHeader, null)
		.then(
			function(resp) { 
				if( resp.length > 0 ){
					$scope.isBizUserIdExists = true;
				}else {
					$scope.isBizUserIdExists = false;
				}
			}, function(resp) { 
				console.log('Error');
			}
		);
	};

	

	$scope.registerUser = function(formInfo){
		if(formInfo.$valid)
		{
			$scope.validateBizUserId($scope.signup.userName);
			if($scope.isRestoUserIdExists)
			{
				alert("User name already exists! you can try logging in with your password. OR try some other user names.");	
				return;
			}

			if(!$scope.signup.primary_image_url || !$scope.signup.logo_url)
			{
				alert('Please upload primary image and a logo image!');
				return;
			}

			if($scope.signup.conditions)
			{
			  consumeAPIService.httpRequestWithPromise(Constants.URLS.createBusiness, Constants.Global.METHOD.POST, $scope.signup,Constants.Global.DefaultHTTPHeader, null)
		      .then(
		        function(resp) { 
					alert('Your business has been registered successfully.')		            
		        }, function(resp) { 
		          console.log('Error in creating the user!');
		        }
		      );
	  		}
	  		else
	  		{
	  			alert("Not accepted the Terms and Conditions!!");
	  		}

		}
		else
		{
			alert('Invalid form');
		}
	};


});
