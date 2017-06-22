 //var sessionApp = angular.module('SessionStoreApp', ['ngStorage']);

  angular.module('CommonApp', ['ngStorage']).service('sessionStoreService', function ($htp, ) {
            
       this.showAlert = function(title, message, type){
            $mdDialog.show($mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Congratulations!!!')
                        .textContent('We have sent you an email. Please go to your Inbox for email verification.')
                        .ariaLabel('Alert Dialog')
                        .ok('OK')
                                .targetEvent(optionalData))
            .then(function(answer) {
                $scope.$emit("toChangeCurrentPage", "HomePage");
            }, function() {
                console.log("Error");
            });
       }
               
    });