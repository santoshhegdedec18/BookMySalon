angular.module('CommonApp').controller('captchaCtrl',function($scope, $rootScope) {
	$scope.initcaptchaCtrl = function(){
		//initiate captcha keys
       if(HOSTNAME.indexOf('localhost') >= 0){
			$scope.captchaSiteKey = '6Le-LygTAAAAAMw3QFG7-Y3qL3AxxI4TryBlYn1J';
		}else{
			$scope.captchaSiteKey = '6LcL3AcUAAAAABtOuAAzLkp94K3l3eq52uGUumQ4';
		}
	};

	$scope.initcaptchaCtrl();

	
});