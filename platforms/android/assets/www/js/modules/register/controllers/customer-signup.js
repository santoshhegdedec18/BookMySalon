

//COntroller containing all operations related to login
angular.module('HomeApp').controller('homeCtrl', function($scope, $rootScope,$timeout, $location, $mdSidenav) {

	$scope.openLeftMenu = function() {
       	$mdSidenav('left').toggle();
    };

    $scope.navigateToContent = function(tab){
    	
    	switch(tab.index)
    	{
    		case 1:
	    		$timeout(function() {
	        		$location.path('/saloons/saloons');
	    		}, 0);
	    		break;
	    	case 2:
	    		$timeout(function() {
	        		$location.path('/parlours/parlours');
	    		}, 0);
	    		break;
	    	case 3:
	    		$timeout(function() {
	        		$location.path('/spas/spas');
	    		}, 0);
	    		break;
	    	default:
	    		break;

    	}
    };
	
	$scope.tabs =[ {
			title: "Saloons",
			index:1
		},
		{
			title: "Parlours",
			index: 2
		},
		{
			title: "Spas",
			index: 3
		}
	];
});
