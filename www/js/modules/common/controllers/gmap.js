angular.module('CommonApp').controller('gmapCtrl',function($scope, $rootScope, gmapService) {
	$scope.initgmapCtrl = function(){
		//initiate google map API
        gmapService.getGMapLocation('map', 'pac-input');
	};

	$scope.initgmapCtrl();

	//Listen the event broadcasted by gmap service to popagate lat lang
	$scope.$on('fetchLatlng', function (event, args) {
		$rootScope.$broadcast('fetchLatlngToRoot', { data: args.data });
 	});	
});