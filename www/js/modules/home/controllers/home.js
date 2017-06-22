

//COntroller containing all operations related to login
angular.module('HomeApp', ['ngMaterial']).controller('homeCtrl', function($scope, $rootScope,$timeout,$window, $location, $mdSidenav,fbService, sessionStoreService) {

	$scope.openLeftMenu = function() {
       	$mdSidenav('left').toggle();
    };

    $scope.initiateUserObject = function(){
    	var userObject = sessionStoreService.getUserSession();
    	if(userObject)
    	{
    		$scope.loggedIn = true;
		 	$scope.user_name = userObject.first_name + " "+userObject.last_name ;
		 	$scope.user_pic_url = userObject.user_pic_url;	
    	}
    }
    $scope.navigateToContent = function(tab){
    	
    	switch(tab.index)
    	{
    		case 1:
	    		$timeout(function() {
	        		$location.path('/saloons/popular');
	    		}, 0);
	    		$rootScope.$broadcast('hideTheTab', { status: true });
	    		break;
	    	case 2:
	    		$timeout(function() {
	        		$location.path('/saloons/nearest');
	    		}, 0);
	    		$rootScope.$broadcast('hideTheTab', { status: true });
	    		break;
	    	case 3:
	    		$timeout(function() {
	        		$location.path('/saloons/offers');
	    		}, 0);
	    		$rootScope.$broadcast('hideTheTab', { status: true });
	    		break;
	    	default:
	    		break;

    	}
    };

    $scope.navigateFromLeftNav = function(nav){
    	
    	switch(nav)
    	{
    		case 'signin':
	    		$timeout(function() {
	        		$location.path('/signin/login');
	    		}, 0);
	    		$mdSidenav('left').close();
	    		$rootScope.$broadcast('hideTheTab', { status: false });
	    		break;
	    	case 'signup':
	    		$timeout(function() {
	        		$location.path('/signup/register');
	    		}, 0);
	    		$mdSidenav('left').close();
	    		$rootScope.$broadcast('hideTheTab', { status: false });
	    		break;
	    	case 'business':
	        	$location.path('/bizowner/');
	    		$mdSidenav('left').close();
	    		$rootScope.$broadcast('hideTheTab', { status: false });
	    		break;
	    	default:
	    		break;

    	}
    };
	
	
	$scope.tabs =[ {
			title: "Most Popular",
			index:1
		},
		{
			title: "Nearest",
			index: 2
		},
		{
			title: "Great Offers",
			index: 3
		}
	];

	$scope.$on("hideTheTab", function(e, args) {
	 	$scope.isTabActive = args.status;
	});

	$scope.$on("updateLoginStatus", function(e, args) {
	 	$scope.loggedIn = args.status;
	 	$scope.user_name = args.user_name;
	 	$scope.user_pic_url = args.user_pic_url;
	 	//$window.location.reload();
	 	$timeout(function() {
	        		$location.path('/');
	    }, 0);
	});

	$scope.signOut = function(){
		var userObject = sessionStoreService.getUserSession();
		$scope.loggedIn = false;
	 	
	 	switch(userObject.login_type){
	 		case 'FB':
	 			//fbService.logUserOut();
	 			break;
	 		case 'GOOGLE':
				  $("#btnSignout").click(function(){
				  	var auth2 = gapi.auth2.getAuthInstance();
				    auth2.signOut().then(function () {
				      console.log('User signed out.');
				    });
				  });
	 			break;
	 		case 'EMAIL':
	 			break;
	 	}	
	 	sessionStoreService.emptyUserSession();

	 	$window.location.reload();
	}
});
