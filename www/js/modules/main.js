

//COntroller containing all operations related to login
angular.module('MainApp').controller('mainCtrl', function($scope, $rootScope, $timeout,$mdSidenav,$mdMedia, sessionStoreService, configHttpReqService, $location) {
 
 	
	
	//$scope.titleToShowOnHeader = {};
	
	$scope.validateAuthentication = function(){
		

	 };

	$scope.openMenu = function($mdOpenMenu, e) {
		$mdOpenMenu(e);
    };

    $scope.logout = function() {
	
		//location.reload();
    };

  
});
