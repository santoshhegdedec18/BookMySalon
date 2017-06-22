/*
 * Starlly.
 * 
 * Copyright (c) 2016 ariveguru.com
 * http://ariveguru.com
 *
 * Version 			: 	0.00.01
 * Author			:	Vinay N M
 * Date				:	12-Sept-2016
 */

var authModule = angular.module('Auth',['ConfigHttpReq','SessionStore']);
authModule.service('authentication',function($http, $rootScope, $timeout, $filter, sessionStoreService, configHttpReqService){
	
	this.loginToStarlly = function(userDetails, $mdDialog) {
    	//this.successOutputOfLoginToStarlly(userDetails, $mdDialog);
    	var header = angular.copy(Constants.Global.DefaultHTTPHeader);
    	header.username = userDetails.name.trim();
    	header.password = userDetails.password.trim();
    	configHttpReqService.httpRequest(Constants.URLS.RESTAURENT_SIGNIN, Constants.Global.METHOD.GET, header, null, Constants.HTTP_REQ.SIGNIN, $mdDialog);
 	};
 	this.successOutputOfLoginToStarlly = function(resp, optionalData) {
 		optionalData.hide();
 		//console.log(resp);
 		if(resp.additionalDetails) {
 			//Store the user details in session object
 			if (!sessionStoreService.getOwnerSession(resp.restid))
 			{
 				sessionStoreService.setOwnerSession(resp);
 			}
	    	// Call a function in controller 'Appctrl'
	        $rootScope.$broadcast('loadPageFromAuthModule', {"pageToLoad":"OfferDashboard", "resp":resp});
	    } else {
	    	// Call a function in controller 'Appctrl'
	    	$rootScope.$broadcast('loadPageFromAuthModule', {"pageToLoad":"AdditionalInfo", "resp":resp});
	    }
 	};
 	this.errorOutputOfLoginToStarlly = function(resp, optionalData) {
 		//console.log(resp);
 		if(resp.status) {
 			alert(resp.status);
 		} else {
 			alert("Error In logging in, try again after some time!!!");
 		}
 	};

 	this.loginToStarllyAdmin = function(userDetails, $mdDialog) {
    	//this.successOutputOfLoginToStarlly(userDetails, $mdDialog);
    	var header = angular.copy(Constants.Global.DefaultHTTPHeader);
    	header.email = userDetails.email.trim();
    	header.password = userDetails.password.trim();
    	configHttpReqService.httpRequestWithPromise(Constants.URLS.ADMIN_SIGNIN, Constants.Global.METHOD.GET, header, null, null, null, null)
		.then(
			function(resp) { 
			    $rootScope.$broadcast('loadPageFromAuthModule', {"pageToLoad":"AdminDashboard", "resp":resp});
				$mdDialog.hide();
			}, function(resp) { 
				alert("Error In logging in, try again after some time!!!");
			}
		);
 	};
});