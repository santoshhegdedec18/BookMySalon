
'use strict';

//COntroller containing all operations related to login
angular.module('ListApp',['ngAnimate', 'ngTouch']).controller('listCtrl', function($scope, $rootScope,$filter,$timeout, $location, $mdSidenav, $routeParams, consumeAPIService, sessionStoreService) {

 

$scope.initListCtrl = function(){
	$scope.businessList = [];
	$scope.collapsed= true;
	$scope.searchBiz ='';
	$scope.business = {};
	$scope.staticMapURl = '';
	$scope.opened = true;
	$scope.getAllBusiness();
	$scope.listCategory = $routeParams.category;
	$scope.rating = 5;
	$scope.today = getWeekDay();
};
$scope.calculateAverage = function(MyData){ 
    var sum = 0; 
    for(var i = 0; i < MyData.length; i++){
        sum += parseInt(MyData[i].rating, 10); 
    }

    var avg = sum/MyData.length;

    return avg; 
};
function getWeekDay ()
{
	var date = new Date();
	var dayOfWeek = date.getDay();
	return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

function addRating(rating)
{
	var user = sessionStoreService.getUserSession();
	if(user)
	{
		var userRating = {
			user_id : user._id,
			business_id : $scope.business._id,
			rating : rating,
			rating_date : new Date()
		}
	 	consumeAPIService.httpRequestWithPromise(Constants.URLS.addRating, Constants.Global.METHOD.POST, userRating,Constants.Global.DefaultHTTPHeader, null)
	    .then(
	        function(resp) { 
				console.log('Rating added successfully.')		            
	        }, function(resp) { 
	          console.log('Error in adding the rating!');
	        }
     	);
	}
	else
	{
		alert('Please login to Rate!');
	}

}

$scope.addReview = function(formInfo){
	
	var user = sessionStoreService.getUserSession();
	if(formInfo.$valid)
	{
		

		if(user)
		{
			var userReview = {
				user_id : user._id,
				business_id : $scope.business._id,
				review_content : $scope.business.reviewDesc,
				review_date : new Date()
			}
		 	consumeAPIService.httpRequestWithPromise(Constants.URLS.addReview, Constants.Global.METHOD.POST, userReview,Constants.Global.DefaultHTTPHeader, null)
		    .then(
		        function(resp) { 
					console.log('Review added successfully.');
					$scope.collapsed= true;
					$scope.getBusinessReviews($scope.business._id);
		        }, function(resp) { 
		          console.log('Error in adding the review!');
		        }
	     	);
		}
		else
		{
			alert('Please login to add Review!');
		}
	}
	else
	{
		alert("Please type in your review and then press submit button!"); 
		return;
	}
}

function getBusinessRating (bizId){
	consumeAPIService.httpRequestWithPromise(Constants.URLS.getBusinessRating.replace('{bizid}',bizId), Constants.Global.METHOD.GET, null,Constants.Global.DefaultHTTPHeader, null)
		.then(
			function(resp) { 
				if( resp.length > 0 ){
					$scope.business.rating = resp[0].avgRating;
					return resp[0].avgRating;
				}
			}, function(resp) { 
				console.log('Error' + resp);
				alert('Error in retrieving Rating');
			}
		);
}

$scope.getBusinessReviews = function(bizId){
	consumeAPIService.httpRequestWithPromise(Constants.URLS.getBusinessReviews.replace('{bizid}',bizId), Constants.Global.METHOD.GET, null,Constants.Global.DefaultHTTPHeader, null)
		.then(
			function(resp) { 
				if( resp.length > 0 ){
					$scope.business.reviews = resp;
				}
			}, function(resp) { 
				console.log('Error' + resp);
				alert('Error in retrieving Rating');
			}
		);
}
 $scope.getSelectedRating = function (rating) {
        //console.log(rating);
        addRating(rating);
    }

$scope.getAllBusiness = function(){
		consumeAPIService.httpRequestWithPromise(Constants.URLS.getAllBusiness, Constants.Global.METHOD.GET, null,Constants.Global.DefaultHTTPHeader, null)
		.then(
			function(resp) { 
				if( resp.length > 0 ){
					$scope.businessList = resp;
					
				}
			}, function(resp) { 
				console.log('Error');
				alert('Error in retrieving all business');
			}
		);
}

$scope.loadBusinessDetails = function(business){
	$scope.business = business;
	if(business)
	{
		$scope.staticMapURl = "https://maps.googleapis.com/maps/api/staticmap?center="
		+ business.lat +"," + business.lng + "&zoom=14&size=600x300&maptype=roadmap&markers=color:red|" + business.lat  +"," + business.lng ;
	}
	$scope.getBusinessReviews(business._id);
	
}

$scope.initListCtrl();

// start Picture gallery related functions
// initial image index
$scope._Index = 0;
// if a current image is the same as requested image
$scope.isActive = function (index) {
	return $scope._Index === index;
};
// show prev image
$scope.showPrev = function () {
	$scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.business.pictures_gallery_urls.length - 1;
};
// show next image
$scope.showNext = function () {
	$scope._Index = ($scope._Index < $scope.business.pictures_gallery_urls.length - 1) ? ++$scope._Index : 0;
};
// show a certain image
$scope.showPhoto = function (index) {
	$scope._Index = index;
};
// end Picture gallery related functions


})
.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="starRating">' + 
        '   <li ng-repeat="star in stars" ng-class="star" ng-click="toggleFunck($index)">' + 
        '\u2605' + '</li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onStarRating: '&'
        },
          	 

        link: function (scope, elem, attrs) {
        	// var initializeStars = function () {
         //    	scope.stars = [];    
         //        for (var i = 0; i < scope.max; i++) {
         //            scope.stars.push({
         //                filled: false
         //            });
         //        }
         //    };

        	// initializeStars();
            var updateRating = function() {
		          //This is global level collection.
		          scope.stars = [];
		          //Loop called with the help of data-max directive input and push the stars count.
		          for (var i = 0; i < scope.max; i++) {
		            scope.stars.push({
		              filled: i < scope.ratingValue
		            });
		          }
		    };


            scope.toggleFunck = function(index) {
	          //This is used to count the default start rating and sum the number of imput index.
	          scope.ratingValue = index + 1;
	          scope.onStarRating({
	            rating: index + 1
	          });
	        };

           scope.$watch('ratingValue',
	          function(oldV, newV) {
	            if (newV) {
	              updateRating();
	            }
	        });

        }
    }
});

