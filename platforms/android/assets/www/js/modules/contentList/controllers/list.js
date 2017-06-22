

//COntroller containing all operations related to login
angular.module('ListApp').controller('listCtrl', function($scope, $rootScope,$timeout, $location, $mdSidenav, $routeParams) {

$scope.listType = $routeParams.category;
	
});
