
angular.module("MainApp").factory('dataModels', function($rootScope) { 
	   var userModel = {
        userDetails: ''
    };

    return {
        getUserDetails: function () {
            return userModel.userDetails;
        },
        setUserDetails: function (userDetails) {
            userModel.userDetails = userDetails;
        }
    };
});
