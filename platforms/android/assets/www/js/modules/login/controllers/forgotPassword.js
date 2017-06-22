

//COntroller containing all operations related to login
angular.module('LoginApp').controller('forgotPwdCtrl', function($scope, $rootScope,$timeout, $location,$routeParams, fbService, consumeAPIService) {

  $scope.linkSent = false;

  $scope.sendResetLink = function(formInput){
    if(formInput.$valid)
    {
      
      consumeAPIService.httpRequestWithPromise(Constants.URLS.sendResetLink.replace('{email}',$scope.signUpInfo.email), Constants.Global.METHOD.GET, null,Constants.Global.DefaultHTTPHeader, null)
      .then(
        function(resp) { 
          $scope.linkSent = true;
          alert('link sent');   
                
        }, function(resp) { 
          console.log('Error in sending rest link!');
        }
          
      );
    }
  }

});
