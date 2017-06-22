

//COntroller containing all operations related to login
angular.module('LoginApp').controller('pwdResetCtrl', function($scope, $window, $rootScope,$timeout, $location, consumeAPIService,$routeParams) {
  var queryString =  window.location.search.substring(1);
  var email = queryString.split('=');

  $scope.pwdReset = false;
  $scope.signUpInfo = {};
  $scope.resetPassword = function(formInput){
    
    if(formInput.$valid)
    {
      if($scope.signUpInfo.password1 != $scope.signUpInfo.password2)
      {
        alert("Passwords do not match!");
      }
      else
      {
      
      var updateData = {
        email : email[1],
        password : $scope.signUpInfo.password1
      };
      consumeAPIService.httpRequestWithPromise(Constants.URLS.resetPassword, Constants.Global.METHOD.PUT, updateData,Constants.Global.DefaultHTTPHeader, null)
      .then(
        function(resp) { 
          $scope.pwdReset = true;
        }, function(resp) { 
          console.log('Error in updating the password!');
        }
          
        );
      }
    }
  }

  $scope.redirectToLogin = function() {

    $window.location.href = Constants.URLS.hostName + "#/signin/login/";
    
  }

});
