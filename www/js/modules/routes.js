

//Define your routes on the MainApp module and pass the corresponding controller objects
angular.module('MainApp')
.config(
	['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/saloons/:category', {
				templateUrl: 'js/modules/contentlist/views/list.html',
				module: 'ListApp',
				controller: 'listCtrl'
			})
			.when('/signin/:registermode', {
				templateUrl: 'js/modules/login/views/login.html',
				module: 'LoginApp',
				controller: 'loginCtrl'
			})
			.when('/signup/:registermode', {
				templateUrl: 'js/modules/login/views/login.html',
				module: 'LoginApp',
				controller: 'loginCtrl'
			})
			.when('/forgot', {
				templateUrl: 'js/modules/login/views/forgotPassword.html',
				module: 'LoginApp',
				controller: 'forgotPwdCtrl'
			})
			.when('/bizowner/', {
				templateUrl: 'js/modules/register/views/business-signup.html',
				module: 'RegisterApp',
				controller: 'registerCtrl'
			})
			.otherwise({
				redirectTo: '/home'
			});

			
}]); 
