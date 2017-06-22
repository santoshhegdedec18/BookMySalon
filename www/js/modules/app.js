

//Define all individual models separately



angular.module('CommonApp', []);
angular.module('HomeApp', []);
angular.module('UploadImageApp', []);
angular.module('ErrorsApp', []);
angular.module('ListApp', []);
angular.module('LoginApp', []);
angular.module('ConsumeAPIApp', []);
angular.module('RegisterApp', []);

// "main" module containing all sub modules
//Creating a “MainAppModule” allows us to inject all our other modules which in turn allows each of our other modules to access each other. 
//So if the Reports module needs to access something from the offers module, 
//it will be able to with this method without having to inject the offers module directly into the Reports module.
angular.module('MainApp',
  [
    'ngRoute',
    'ngMaterial',
    'CommonApp',
    'HomeApp',
    'UploadImageApp',
    'ErrorsApp',
    'ListApp',
    'LoginApp',
    'ConsumeAPIApp',
    'RegisterApp',
    'md.data.table'

  ]
);


// angular.module('MainApp').config(function($mdThemingProvider) {
//     $mdThemingProvider.theme('default').primaryPalette('light-blue').accentPalette('light-blue');
//     $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
//     $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
//     $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
//     $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
// });

//Global exception interceptor.. log the exception
angular.module('MainApp').config(function ($provide) {

    $provide.decorator('$exceptionHandler', function ($delegate) {

        return function (exception, cause) {
            $delegate(exception, cause);

            alert('Oops! looks like something has gone wrong. Reaching out to technical support is not a bad idea.');
            console.log("Exception: " +exception + " Cause: "+ cause)
        };
    });
});

//Following is the interceptor to log every request/response. It's logged to browser console currently, can be logged to a permanent store 
angular.module("MainApp").factory("LoggingInterceptor", ['$q', '$log', function($q, $log){
    return {
        request: function(config){
            $log.info("Request made with", config);
            return config;
        },
        requestError: function(rejection){
            $log.error("Request error due to ", rejection);
            return $q.reject(rejection);
        },
        response: function(response){
            $log.info("Response from server ", response);
            return response || $q.when(response);
        },
        responseError: function(rejection){
            $log.error("Error in repsonse ", rejection);
            return $q.reject(rejection);
        }
    };
}])
.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('LoggingInterceptor');
}]);

angular.module('MainApp').config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.headers.common = {"Access-Control-Allow-Origin":"*"};
         delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


