 //var sessionApp = angular.module('SessionStoreApp', ['ngStorage']);

  angular.module('CommonApp', ['ngStorage']).service('sessionStoreService', function ($http, $rootScope, $sessionStorage, $location) {
            
            //Store user details in JSON string format soon after the successful login

            this.setUserSession = function(data){
            	$sessionStorage.userSession = data;
            }
            this.getUserSession = function(key){
            	return $sessionStorage.userSession;
            } 
            this.emptyUserSession = function(key){
            	$sessionStorage.userSession="";
            } 
               
    });